const db = require("../db");
const catchAsync = require("../utils/catchAsync");
const Factory = require("./handlerFactory");
const AppError = require("./../utils/appError");

// Sql query for job search
const searchSql =
  "SELECT * FROM jobs WHERE title LIKE ? OR company LIKE ? OR location LIKE ? OR status LIKE ? OR position LIKE ?";

// Sql query for searching jobs of currently logged in user
const searchMyJobsSql =
  "SELECT jobs.* FROM jobs JOIN users_jobs ON users_jobs.job_id = jobs.id JOIN users ON users_jobs.user_id = users.id WHERE (jobs.title LIKE ? OR jobs.company LIKE ? OR jobs.location LIKE ? OR jobs.status LIKE ? OR jobs.position LIKE ?) AND users.id = ? ";

exports.getAllJobs = Factory.getAll("jobs");
exports.createJob = Factory.createOne("jobs");
exports.deleteJob = Factory.deleteOne("jobs");
exports.getJob = Factory.getOne("jobs");
exports.updateJob = Factory.updateOne("jobs");
exports.searchJobs = Factory.search("jobs", searchSql, 5);
exports.searchMyJobs = Factory.search("jobs", searchMyJobsSql, 5);

exports.getMyJobs = catchAsync(async (req, res, next) => {
  const sql = `SELECT jobs.* FROM jobs JOIN users_jobs ON users_jobs.job_id = jobs.id JOIN users ON users_jobs.user_id = users.id WHERE users.id = ?`;

  const data = (await db.query(sql, req.user.id))[0];

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.getOneJob = catchAsync(async (req, res, next) => {
  const sql = `SELECT jobs.* FROM jobs JOIN users_jobs ON users_jobs.job_id = jobs.id JOIN users ON users_jobs.user_id = users.id WHERE users.id = ? AND jobs.id = ?`;

  const data = (await db.query(sql, [req.user.id, req.params.id]))[0];

  // Throw error if data is an empty array
  if (!(Array.isArray(data) && data.length)) {
    return next(new AppError(`No job found with that id`, 404));
  }

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.checkAndUpdateJobStatus = catchAsync(async (req, res, next) => {
  // Get all jobs that are forthcoming and open
  const sql =
    "SELECT jobs.id, jobs.deadline FROM jobs JOIN users_jobs ON users_jobs.job_id = jobs.id JOIN users ON users_jobs.user_id = users.id WHERE users.id = ? AND status IN ('forthcoming', 'open')";

  const data = (await db.query(sql, req.user.id))[0];

  // update status and deadline if deadline has been elapsed
  if (data) {
    data.forEach(
      catchAsync(async (job) => {
        if (job.deadline) {
          const date = new Date(job.deadline);

          if (date < new Date(Date.now())) {

            const sql = `UPDATE jobs SET status = 'closed', deadline = ${null} WHERE id = ?`;

            await db.query(sql, job.id);
          }
        }
      })
    );
  }

  next();
});

exports.updateOpenedJobStatusToClosed = Factory.updateOne("jobs", undefined, {
  status: "closed",
  deadline: null,
});

exports.getAllJobsWithDeadline = async () => {
  const sql =
    "SELECT user_id, deadline, job_id FROM jobs JOIN users_Jobs ON job_id = jobs.id JOIN users ON user_id = users.id WHERE deadline IS NOT NULL AND notification_created = 'false' AND DATE(deadline) = DATE(NOW()) AND TIME(deadline) > TIME(NOW());";

  const result = (await db.query(sql))[0];

  return result;
};

exports.updateNotificationCreatedStatus = async (jobId) => {
  const sql = "UPDATE jobs SET notification_created = 'true' WHERE id = ?";

  await db.query(sql, jobId);
};
