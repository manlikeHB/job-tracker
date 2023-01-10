const express = require("express");
const intervieController = require("./../controllers/interviewController");

const router = express.Router();

router.route("/").get(intervieController.getAllInterviews);

router.route("/:id");

module.exports = router;
