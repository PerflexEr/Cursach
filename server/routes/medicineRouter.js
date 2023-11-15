const Router = require("express");
const router = new Router();
const medicineController = require("../controllers/medicineController");
const authMiddleware = require("../middleware/authMiddleware");

// Добавление лекарства
router.post("/add", medicineController.addMedicine);

// Удаление лекарства по ID
router.delete("/:id", medicineController.deleteMedicineById);

// Получение всех лекарств
router.get("/", medicineController.getAllMedicines);

// Получение лекарства по ID
router.get("/:id", medicineController.getMedicineById);

// Получение просроченных лекарств
router.get("/expires", medicineController.getExpiredMedicines);

// Получение лекарств по определенному типу
router.get("/type/:type", medicineController.getMedicinesByType);

// Получение лекарств в остатках
router.get("/inventory", medicineController.getMedicinesInInventory);

router.post("/purchase", medicineController.addMedicineThroughPurchase);


module.exports = router;
