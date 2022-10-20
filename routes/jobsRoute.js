const express = require("express");
const jobsController = require("../controllers/jobsController");

const router = express.Router();

router.route("/").get(jobsController.getJobs).post(jobsController.createJob);

router.route("/:id").delete(jobsController.deleteJob);

module.exports = router;
