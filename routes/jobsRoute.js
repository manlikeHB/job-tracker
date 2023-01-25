const express = require("express");
const jobController = require("../controllers/jobsController");
const authController = require("./../controllers/authController");
const interviewRouter = require("./interviewRoute");

const router = express.Router({ mergeParams: true });

router.use("/:jobId/interviews", interviewRouter);
router.use("/interviews", interviewRouter);

router
  .route("/my-jobs")
  .get(jobController.checkAndUpdateJobStatus, jobController.getMyJobs);

router
  .route("/my-jobs/:id")
  .get(jobController.checkAndUpdateJobStatus, jobController.getOneJob)
  .patch(jobController.updateOpenedJobStatusToClosed);

router.get("/search-my-jobs", jobController.searchMyJobs);

router.use(authController.protect);

router.get(
  "/search",
  authController.restrictTo("admin"),
  jobController.searchJobs
);

router
  .route("/")
  .get(
    authController.restrictTo("admin"),
    jobController.checkAndUpdateJobStatus,
    jobController.getAllJobs
  )
  .post(jobController.createJob);

router
  .route("/:id")
  .delete(jobController.deleteJob)
  .get(
    authController.restrictTo("admin"),
    jobController.checkAndUpdateJobStatus,
    jobController.getJob
  )
  .patch(jobController.updateJob);

module.exports = router;
