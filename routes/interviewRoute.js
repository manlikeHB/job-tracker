const express = require("express");
const intervieController = require("./../controllers/interviewController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router.get("/job-interviews", intervieController.getAllInterviewsOnJob);
router.get(
  "/job-interviews/:interviewId",
  intervieController.getInterviewOnJob
);

router.get("/search-my-interviews", intervieController.searchMyInterviews);

router.use(authController.protect);

router.get(
  "/search",
  authController.restrictTo("admin"),
  intervieController.searchInterview
);

router
  .route("/")
  .get(authController.restrictTo("admin"), intervieController.getAllInterviews)
  .post(intervieController.createInterview);

router
  .route("/:id")
  .get(intervieController.getInterview)
  .delete(intervieController.deleteInterview)
  .patch(intervieController.updateInterview);

module.exports = router;
