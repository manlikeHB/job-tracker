const db = require("../db");
const factory = require("../controllers/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const convertDateTimeToString = require("../utils/convertDateTimeToString");

exports.getLandingPage = (req, res, next) => {
  res.status(200).render("landingPage", {
    title: "JobTracker",
  });
};

exports.getAccountPage = (req, res, next) => {
  res.status(200).render("account", {
    title: "account",
  });
};

exports.addInterviewsPage = (req, res, next) => {
  res.status(200).render("addInterview", {
    title: "Add Interview",
  });
};

exports.getAddJobPage = (req, res, next) => {
  res.status(200).render("addJob", {
    title: "Add Job",
  });
};

exports.getInterviewPage = (req, res, next) => {
  res.status(200).render("interview", {
    title: "Interview",
  });
};

exports.getJob = catchAsync(async (req, res, next) => {
  // Get Jobs from Database
  const sql = "SELECT * FROM jobs";

  const jobs = (await db.query(sql))[0];

  //
  res.status(200).render("job", {
    title: "Job",
    job: jobs[4],
    convertDateTimeToString,
  });
});

exports.getLogin = (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
};

exports.getJobsOverview = (req, res, next) => {
  res.status(200).render("jobsOverview", {
    title: "Jobs Overview",
  });
};

exports.getSignUp = (req, res, next) => {
  res.status(200).render("signUp", {
    title: "Sign Up",
  });
};
