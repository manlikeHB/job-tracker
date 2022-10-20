const express = require("express");
const jobsController = require("../Controllers/jobsController");

const router = express.Router();

router.route("/").get(jobsController.getJobs);

module.exports = router;
