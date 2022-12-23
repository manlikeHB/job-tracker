const express = require("express");
const jobController = require("../controllers/jobsController");

const router = express.Router();

router.route("/").get(jobController.getJob).post(jobController.createJob);

router
  .route("/:id")
  .delete(jobController.deleteJob)
  .get(jobController.getOneJob)
  .patch(jobController.updateJob);

module.exports = router;
