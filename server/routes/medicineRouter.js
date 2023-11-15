const Router = require("express");
const router = new Router();
const medicineController = require("../controllers/medicineController");
const authMiddleware = require("../middleware/authMiddleware");

// Добавление лекарства
router.post("/add", medicineController.addMedicine);

// Получение просроченных лекарств
router.get("/expired", medicineController.getExpiredMedicines);

// Получение лекарств в остатках
router.get("/inventory", medicineController.getMedicinesInStock);

// Добавление купленных лекарств лекарств в остатках
router.post("/purchase", medicineController.addPurchasedMedicine);

// Получение купленных лекарств по идентификатору члена семьи
router.get("/purchase/:FamilyMemberId", medicineController.getFamilyMemberPurchases);

// Получение лекарств по определенному типу
router.get("/type/:type", medicineController.getMedicinesByType);

// Удаление лекарства по ID
router.delete("/:id", medicineController.deleteMedicineById);

// Получение всех лекарств
router.get("/", medicineController.getAllMedicines);

// Получение лекарства по ID
router.get("/:id", medicineController.getMedicineById);


module.exports = router;
