const Router = require("express");
const router = new Router();
const familyMemberController = require("../controllers/familyMemberController");
const authMiddleware = require("../middleware/authMiddleware");

// Удаление члена семьи по ID
router.delete("/:id", familyMemberController.deleteFamilyMemberById);

// Получение члена семьи по ID
router.get("/:id", familyMemberController.getFamilyMemberById);

// Добавление члена семьи
router.post("/add", familyMemberController.addFamilyMember);

// Получение всех членов семьи
router.get("/", familyMemberController.getAllFamilyMembers);





module.exports = router;
