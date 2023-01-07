const express = require("express");
const jobController = require("../controllers/jobsController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

// router.use(jobController.checkAndUpdateJobStatus);

router
  .route("/my-jobs")
  .get(jobController.checkAndUpdateJobStatus, jobController.getMyJobs);

router
  .route("/my-jobs/:id")
  .get(jobController.checkAndUpdateJobStatus, jobController.getOneJob);

router.use(authController.protect);

router
  .route("/")
  .get(jobController.checkAndUpdateJobStatus, jobController.getAllJobs)
  .post(jobController.createJob);

router
  .route("/:id")
  .delete(jobController.deleteJob)
  .get(jobController.checkAndUpdateJobStatus, jobController.getJob)
  .patch(jobController.updateJob);

module.exports = router;
