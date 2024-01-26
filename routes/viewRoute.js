const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

const router = express.Router();

// Landing page route
router.get("/", viewController.getLandingPage);
// Login page route
router.get("/login", viewController.getLogin);
// User account route
router.get("/account", authController.protect, viewController.getAccountPage);
// Add an interview on a job route
router.get(
  "/job/:jobId/add-interview",
  authController.protect,
  viewController.addInterviewsPage
);
// Add new job route
router.get("/add-job", authController.protect, viewController.getAddJobPage);
//  All interviews on a user route
router.get(
  "/interview",
  authController.protect,
  viewController.getInterviewPage
);
// All interview on job route
router.get(
  "/job/:jobId/interview",
  authController.protect,
  viewController.getInterview
);
// Get on job by id route
router.get("/job/:jobId", authController.protect, viewController.getJob);
// Get all Jobs on a user route
router.get("/overview", authController.protect, viewController.getJobsOverview);
// Sign up route
router.get("/signup", viewController.getSignUp);

module.exports = router;
