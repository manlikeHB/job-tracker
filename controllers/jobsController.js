const db = require("../db");
const catchAsync = require("../utils/catchAsync");
const Factory = require("./handlerFactory");
const AppError = require("./../utils/appError");

exports.getJob = Factory.getAll("jobs");
exports.createJob = Factory.createOne("jobs");
exports.deleteJob = Factory.deleteOne("jobs");
exports.getJob = Factory.getOne("jobs");
exports.updateJob = Factory.updateOne("jobs");

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
