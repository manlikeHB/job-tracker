const express = require("express");
const intervieController = require("./../controllers/interviewController");

const router = express.Router();

router
  .route("/")
  .get(intervieController.getAllInterviews)
  .post(intervieController.createInterview);

router
  .route("/:id")
  .get(intervieController.getInterview)
  .delete(intervieController.deleteInterview);

module.exports = router;
