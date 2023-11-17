const { Medicine, PurchaseMedicine, MedicineUsage, Purchase ,IllnessPrescription } = require("../models/models");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const { literal, col } = sequelize;
const ApiError = require("../error/ApiError");

class MedicineUsageController {
  async addMedicineUsage(req, res, next) {
    try {
      const { pills_used, result, comments, PurchaseId } = req.body;

      const purchase = await Purchase.findByPk(PurchaseId);
      if (!purchase) {
        return next(ApiError.notFound("Purchase not found"));
      }

      const medicineUsage = await MedicineUsage.create({
        pills_used,
        result,
        comments,
        PurchaseId,
      });

      return res.json(medicineUsage);
    } catch (error) {
      return next(ApiError.internal("Error adding medicine usage"));
    }
  }

  async getAllMedicineUsages(req, res, next) {
    try {
      const medicineUsages = await MedicineUsage.findAll();

      return res.json(medicineUsages);
    } catch (error) {
      return next(ApiError.internal("Error retrieving all medicine usages"));
    }
  }

  async getRemainingMedicines(req, res, next) {
    try {
      const remainingMedicines = await IllnessPrescription.findAll({
        
      });

      return res.json(remainingMedicines);
    } catch (error) {
      return next(ApiError.internal("Error retrieving remaining medicines"));
    }
  }
}

module.exports = new MedicineUsageController();