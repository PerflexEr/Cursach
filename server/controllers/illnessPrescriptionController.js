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

      // Create a new IllnessPrescription
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

      // Find the associated FamilyMember
      const familyMember = await FamilyMember.findByPk(FamilyMemberId);

      // Associate IllnessPrescription with FamilyMember
      await newIllnessPrescription.setFamilyMember(familyMember);

      // Find the associated MedicineUsage
      const medicineUsage = await MedicineUsage.findByPk(MedicineUsageId);

      // Associate IllnessPrescription with MedicineUsage
      await newIllnessPrescription.setMedicineUsage(medicineUsage);

      return res.status(201).json(newIllnessPrescription);
    } catch (error) {
      return next(ApiError.internal("Error adding illness prescription"));
    }
  }
}

module.exports = new IllnessPrescriptionController();
