const { MedicineUsage, Purchase ,FamilyMember,IllnessPrescription } = require("../models/models");
const ApiError = require("../error/ApiError");

class IllnessPrescriptionController {
  async getAllIllnessPrescriptions(req, res, next) {
    try {
      const allIllnessPrescriptions = await IllnessPrescription.findAll();
      return res.json(allIllnessPrescriptions);
    } catch (error) {
      return next(
        ApiError.internal("Error retrieving all illness prescriptions")
      );
    }
  }

  async addIllnessPrescription(req, res, next) {
    try {
      const {
        diagnosis,
        reason_for_medications,
        period_of_illness,
        medications,
        prescribed_by,
        amount_of_prescriptions,
        result,
        note,
        FamilyMemberId,
        MedicineUsageId,
      } = req.body;

      // Валидация данных
      if (!diagnosis || !prescribed_by || !amount_of_prescriptions) {
        return next(ApiError.badRequest("Missing required fields"));
      }

      // Создаем новую запись в таблице IllnessPrescription
      const newIllnessPrescription = await IllnessPrescription.create({
        diagnosis,
        reason_for_medications,
        period_of_illness,
        medications,
        prescribed_by,
        amount_of_prescriptions,
        result,
        note,
        FamilyMemberId,
        MedicineUsageId,
      });

      // Возвращаем созданный объект болезни
      return res.json(newIllnessPrescription);
    } catch (error) {
      console.error("Error adding illness prescription:", error.message);
      return next(ApiError.internal("Error adding illness prescription"));
    }
  }
}

module.exports = new IllnessPrescriptionController();
