const Router = require("express");
const router = new Router();
const familyMemberController = require("../controllers/familyMemberController");
const authMiddleware = require("../middleware/authMiddleware");

// Добавление члена семьи
router.post("/add", familyMemberController.addFamilyMember);

// Получение всех членов семьи
router.get("/", familyMemberController.getAllFamilyMembers);

// Получение купленных лекарств по идентификатору члена семьи
router.get("/highest-spent", familyMemberController.getFamilyMemberWithHighestCost);

// Получение члена семьи по ID
router.get("/:id", familyMemberController.getFamilyMemberById);

// Удаление члена семьи по ID
router.delete("/:id", familyMemberController.deleteFamilyMemberById);


module.exports = router;
