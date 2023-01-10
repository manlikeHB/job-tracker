const express = require("express");
const intervieController = require("./../controllers/interviewController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router.get("/job-interviews", intervieController.getAllInterviewsOnJob);
router.get(
  "/job-interviews/:interviewId",
  intervieController.getInterviewOnJob
);

router.use(authController.protect);

router
  .route("/")
  .get(intervieController.getAllInterviews)
  .post(intervieController.createInterview);

router
  .route("/:id")
  .get(intervieController.getInterview)
  .delete(intervieController.deleteInterview)
  .patch(intervieController.updateInterview);

module.exports = router;
