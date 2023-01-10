const express = require("express");
const intervieController = require("./../controllers/interviewController");

const router = express.Router({ mergeParams: true });

router.get("/job-interviews", intervieController.getAllInterviewsOnJob);

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
