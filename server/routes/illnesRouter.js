const express = require("express");
const router = express.Router();
const illnessPrescriptionController = require("../controllers/illnessPrescriptionController");

// Получение всех историй болезни
router.get("/", illnessPrescriptionController.getAllIllnessPrescriptions);

// Добавление одной истории болезни
router.post("/add", illnessPrescriptionController.addIllnessPrescription);

module.exports = router;
