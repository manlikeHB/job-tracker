const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const jobsRouter = require("./../routes/jobsRoute");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/forgotpassword", authController.forgotPassword);
router.patch("/resetpassword/:token", authController.resetPassword);

router.use(authController.protect);

router.use("/jobs", jobsRouter);

router.patch("/updatemypassword", authController.updatePassword);
router.get("/me", userController.getMe, userController.getUser);
router.patch("/updateme", userController.updateMe);
router.delete("/deleteme", userController.deleteMe);

router.use(authController.restrictTo("admin"));

router.get("/search", userController.searchUser);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

module.exports = router;
