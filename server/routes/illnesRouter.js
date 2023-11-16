const express = require("express");
const router = express.Router();
const illnessPrescriptionController = require("../controllers/illnessPrescriptionController");

// Добавление одной истории болезни
router.post("/add", illnessPrescriptionController.addIllnessPrescription);
// Получение всех историй болезни
router.get("/", illnessPrescriptionController.getAllIllnessPrescriptions);


module.exports = router;
