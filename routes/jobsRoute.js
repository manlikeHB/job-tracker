const express = require("express");
const jobController = require("../controllers/jobsController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/my-jobs").get(jobController.getMyJobs);

router.route("/my-jobs/:id").get(jobController.getOneJob);

router.use(authController.protect);

router.route("/").get(jobController.getJob).post(jobController.createJob);

router
  .route("/:id")
  .delete(jobController.deleteJob)
  .get(jobController.getJob)
  .patch(jobController.updateJob);

module.exports = router;
