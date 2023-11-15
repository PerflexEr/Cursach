const Router = require("express");
const router = new Router();
// const familyMemberRouter = require("./familyMemberRouter");
const userRouter = require("./userRouter");
const medicineRouter = require("./medicineRouter");
// const illnesRouter = require("./illnesRouter");

router.use("/user", userRouter);
// router.use("/illnes", illnesRouter);
router.use("/medicines", medicineRouter);
// router.use("/familymember", familyMemberRouter);

module.exports = router;