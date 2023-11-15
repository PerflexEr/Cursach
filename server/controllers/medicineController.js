const ApiError = require("../error/ApiError");
const {
  Medicine,
  PurchaseMedicine,
  MedicineUsage,
} = require("../models/models");

const { Sequelize, Op } = require("sequelize");
const { literal, col } = Sequelize;

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

  async getExpiredMedicines(req, res, next) {
    try {
      const medicines = await Medicine.findAll();
      return res.json(medicines);
    } catch (error) {
      return next(ApiError.internal("Ошибка при получении всех лекарств"));
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

  async getMedicinesInInventory(req, res, next) {
    try {
      const medicinesInInventory = await Medicine.findAll({
        attributes: [
          "id",
          "name",
          "type",
          "expiration_date",
          "cost",
          [
            literal(
              "(PurchaseMedicines.quantity - COALESCE(MedicineUsages.pills_used, 0))"
            ),
            "inventory",
          ],
        ],
        include: [
          {
            model: PurchaseMedicine,
            attributes: ["quantity"],
            required: false,
          },
          {
            model: MedicineUsage,
            attributes: [
              [literal("SUM(MedicineUsages.pills_used)"), "pills_used"],
            ],
            required: false,
            group: ["MedicineId"],
          },
        ],
        group: ["Medicine.id", "PurchaseMedicines.id", "MedicineUsages.id"],
      });

      return res.json(medicinesInInventory);
    } catch (error) {
      return next(
        ApiError.internal("Ошибка при получении лекарств в остатках")
      );
    }
  }

  async addMedicineThroughPurchase(req, res, next) {
    const { medicineId, quantity, date_of_purchase } = req.body;
    const { userId } = req.user; // Предположим, что у вас есть userId в объекте пользователя

    try {
      // Создаем запись в таблице Purchase
      const purchase = await Purchase.create({
        date_of_purchase: date_of_purchase || new Date(),
        userId: userId, // Предположим, что у вас есть внешний ключ userId в таблице Purchase
      });

      // Создаем запись в таблице PurchaseMedicine
      const purchaseMedicine = await PurchaseMedicine.create({
        quantity,
        medicineId,
        purchaseId: purchase.id,
      });

      return res.json(purchaseMedicine);
    } catch (error) {
      return next(
        ApiError.internal("Ошибка при добавлении лекарства через покупку")
      );
    }
  }

}

module.exports = new MedicineController();
