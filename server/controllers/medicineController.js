const { Medicine, PurchaseMedicine, MedicineUsage, Purchase ,FamilyMember } = require("../models/models");
const { Sequelize, Op } = require("sequelize");
const { literal, col } = Sequelize;
const ApiError = require("../error/ApiError");


class MedicineController {
  async addMedicine(req, res, next) {
    const { name, type, expirationDate, cost, FamilyMemberId } = req.body;
    try {
      const medicine = await Medicine.create({
        name,
        type,
        expiration_date: expirationDate,
        cost,
        FamilyMemberId,
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

  async getRemainingMedicines(req, res, next) {
    const { FamilyMemberId } = req.params;

    try {
      // Найти все покупки для указанного члена семьи
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

      // Обработка данных о лекарствах в остатке
      const remainingMedicines = [];
      purchases.forEach((purchase) => {
        purchase.Medicines.forEach((medicine) => {
          const purchasedQuantity =
            purchase.MedicinePurchases.find((p) => p.MedicineId === medicine.id)
              ?.quantity || 0;
          const usedQuantity = medicine.MedicinePurchases.reduce(
            (total, p) => total + p.quantity,
            0
          );
          const remainingQuantity = purchasedQuantity - usedQuantity;

          if (
            remainingQuantity !== 0 &&
            remainingQuantity !== purchasedQuantity
          ) {
            remainingMedicines.push({
              medicine,
              purchasedQuantity,
              usedQuantity,
              remainingQuantity,
            });
          }
        });
      });

      return res.json({ remainingMedicines });
    } catch (error) {
      return next(ApiError.internal("Error retrieving remaining medicines"));
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

}

module.exports = new MedicineController();
