const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", viewController.getLandingPage);
router.get("/login", viewController.getLogin);
router.get("/account", viewController.getAccountPage);
router.get("/job/:jobId/add-interview", viewController.addInterviewsPage);
router.get("/add-job", viewController.getAddJobPage);
router.get("/interview", viewController.getInterviewPage);
router.get("/job/:jobId/interview", viewController.getInterview);
router.get("/job/:jobId", authController.protect, viewController.getJob);
router.get("/overview", authController.protect, viewController.getJobsOverview);
router.get("/signup", viewController.getSignUp);

module.exports = router;
