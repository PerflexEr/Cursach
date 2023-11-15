const { Medicine, PurchaseMedicine, MedicineUsage, Purchase } = require("../models/models");
const { Sequelize, Op } = require("sequelize");
const { literal, col } = Sequelize;
const ApiError = require("../error/ApiError");


class MedicineController {
  async addMedicine(req, res, next) {
    const { name, type, expirationDate, cost } = req.body;
    try {
      const medicine = await Medicine.create({
        name,
        type,
        expiration_date: expirationDate,
        cost,
      });
      return res.json(medicine);
    } catch (error) {
      return next(ApiError.internal("Ошибка при добавлении лекарства"));
    }
  }

  async deleteMedicineById(req, res, next) {
    const { id } = req.params;
    try {
      const deletedMedicine = await Medicine.destroy({ where: { id } });
      return res.json(deletedMedicine);
    } catch (error) {
      return next(ApiError.internal("Ошибка при удалении лекарства"));
    }
  }

  async getAllMedicines(req, res, next) {
    try {
      const medicines = await Medicine.findAll();
      return res.json(medicines);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении всех лекарств"));
    }
  }

  async getMedicineById(req, res, next) {
    const { id } = req.params;
    try {
      const medicine = await Medicine.findByPk(id);
      return res.json(medicine);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении лекарства по ID"));
    }
  }

  async getMedicinesByType(req, res, next) {
    const { type } = req.params;
    try {
      const medicines = await Medicine.findAll({
        where: { type },
      });
      return res.json(medicines);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении лекарств по типу"));
    }
  }

  async getExpiredMedicines(req, res, next) {
    try {
      const today = new Date();
      const expiredMedicines = await Medicine.findAll({
        where: {
          expiration_date: {
            [Op.lt]: today,
          },
        },
      });
      return res.json(expiredMedicines);
    } catch (error) {
      return next(
        ApiError.internal("Ошибка при получении просроченных лекарств")
      );
    }
  }

  async getMedicinesInStock(req, res, next) {
    try {
      const medicinesInStock = await Medicine.findAll({
        attributes: [
          "*",
          [
            literal(
              "(purchase_medicines.quantity - COALESCE(SUM(`MedicineUsages`.`quantity`), 0))"
            ),
            "stock",
          ],
        ],
        include: [
          {
            model: PurchaseMedicine,
            attributes: [],
            duplicating: false,
            through: { attributes: [] },
          },
          {
            model: MedicineUsage,
            attributes: [],
            duplicating: false,
          },
        ],
        group: ["Medicine.id"],
        having: col("stock") > 0,
      });
      return res.json(medicinesInStock);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении лекарств в остатке"));
    }
  }

  async addPurchasedMedicine(req, res, next) {
    const { medicines, FamilyMemberId } = req.body;
    try {
      const purchase = await Purchase.create({
        date_of_purchase: new Date(),
        FamilyMemberId: FamilyMemberId,
      });

      const purchaseMedicines = medicines.map((medicine) => ({
        MedicineId: medicine.MedicineId,
        quantity: medicine.quantity,
      }));

      await Promise.all(
        purchaseMedicines.map(async (purchaseMedicine) => {
          const { MedicineId, quantity } = purchaseMedicine;

          const medicine = await Medicine.findByPk(MedicineId);

          if (medicine) {
            await purchase.addMedicine(medicine, {
              through: { quantity },
            });
          }
        })
      );

      return res.json({
        purchase,
        medicines: purchaseMedicines,
      });
    } catch (error) {
      return next(ApiError.internal("Error adding purchased medicines"));
    }
  }
  async getFamilyMemberPurchases(req, res, next) {
    const { FamilyMemberId } = req.params;

    try {
      const purchases = await Purchase.findAll({
        where: {
          FamilyMemberId: FamilyMemberId,
        },
        include: [
          {
            model: Medicine,
            through: { attributes: ["quantity"] },
          },
        ],
      });

      return res.json({ purchases });
    } catch (error) {
      return next(
        ApiError.internal("Error retrieving family member purchases")
      );
    }
  }
}

module.exports = new MedicineController();
