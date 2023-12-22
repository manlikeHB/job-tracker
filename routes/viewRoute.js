const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", viewController.getLandingPage);
router.get("/account", viewController.getAccountPage);
router.get("/add-interview", viewController.addInterviewsPage);
router.get("/add-job", viewController.getAddJobPage);
router.get("/interview", viewController.getInterviewPage);
router.get("/job", viewController.getJob);
router.get("/login", viewController.getLogin);
router.get("/overview", authController.protect, viewController.getJobsOverview);
router.get("/signup", viewController.getSignUp);

module.exports = router;
