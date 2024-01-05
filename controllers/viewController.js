const db = require("../db");
const catchAsync = require("../utils/catchAsync");
const convertDateTimeToString = require("../utils/convertDateTimeToString");

exports.getLandingPage = (req, res, next) => {
  res.status(200).render("landingPage", {
    title: "JobTracker",
  });
};

exports.getAccountPage = catchAsync(async (req, res, next) => {
  const sql = "SELECT * FROM users WHERE id = ?";

  const user = (await db.query(sql, "2"))[0];

  res.status(200).render("account", {
    title: "account",
    user: user[0],
  });
});

exports.addInterviewsPage = catchAsync(async (req, res, next) => {
  res.status(200).render("addInterview", {
    title: "Add Interview",
  });
});

exports.getAddJobPage = catchAsync(async (req, res, next) => {
  const sql = "SELECT * FROM users WHERE id = ?";

  const user = (await db.query(sql, "2"))[0];
  res.status(200).render("addJob", {
    title: "Add Job",
    user: user[0],
  });
});

exports.getInterviewPage = catchAsync(async (req, res, next) => {
  const sql = "SELECT * FROM interviews";

  const interviews = (await db.query(sql))[0];

  res.status(200).render("interview", {
    title: "Interview",
    interviews,
  });
});

exports.getInterview = catchAsync(async (req, res, next) => {
  const sql =
    "SELECT interviews.* FROM interviews JOIN job_interviews ON interviews.id = job_interviews.interview_id JOIN jobs ON jobs.id = job_interviews.job_id WHERE jobs.id = ?";

  const interviews = (await db.query(sql, req.params.jobId))[0];

  res.status(200).render("interview", {
    interviews,
  });
});

exports.getJob = catchAsync(async (req, res, next) => {
  // Get Jobs from Database
  const sql = `SELECT jobs.* FROM jobs JOIN users_Jobs ON users_Jobs.job_id = jobs.id JOIN users ON users.id = users_Jobs.user_id WHERE jobs.id = ? AND users.id = ?;`;

  const data = (await db.query(sql, [req.params.jobId, req.user.id]))[0][0];

  res.status(200).render("job", {
    title: "Job",
    data,
    convertDateTimeToString,
  });
});

exports.getLogin = (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
};

exports.getJobsOverview = catchAsync(async (req, res, next) => {
  const sql =
    "SELECT jobs.* FROM jobs JOIN users_Jobs ON users_Jobs.job_id = jobs.id JOIN users ON users.id = users_Jobs.user_id WHERE users.id = ?;";

  const data = (await db.query(sql, req.user.id))[0];

  res.status(200).render("jobsOverview", {
    title: "Jobs Overview",
    data,
  });
});

exports.getSignUp = (req, res, next) => {
  res.status(200).render("signUp", {
    title: "Sign Up",
  });
};
