const Router = require("express");
const router = new Router();
const medicineUsageController = require("../controllers/medicineUsageController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", medicineUsageController.addMedicineUsage);

router.get("/", medicineUsageController.getAllMedicineUsages);

router.get("/remaining", medicineUsageController.getRemainingMedicines);

module.exports = router;