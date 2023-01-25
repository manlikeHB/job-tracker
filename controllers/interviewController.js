const Factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");
const db = require("./../db");

const searchSql =
  "SELECT * FROM interviews WHERE type LIKE ? OR interviewerName LIKE ? OR address LIKE ? OR note LIKE ? OR result LIKE ?";

exports.getAllInterviews = Factory.getAll("interviews");
exports.getInterview = Factory.getOne("interviews");
exports.createInterview = Factory.createOne("interviews");
exports.deleteInterview = Factory.deleteOne("interviews");
exports.updateInterview = Factory.updateOne("interviews");
exports.searchInterview = Factory.search("interviews", searchSql, 5);

exports.getAllInterviewsOnJob = catchAsync(async (req, res, next) => {
  const sql =
    "SELECT interviews.* FROM interviews JOIN job_interviews ON interviews.id = job_interviews.interview_id JOIN jobs ON jobs.id = job_interviews.job_id WHERE jobs.id = ?";

  const data = (await db.query(sql, req.params.jobId))[0];

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.getInterviewOnJob = catchAsync(async (req, res, next) => {
  const sql =
    "SELECT interviews.* FROM interviews JOIN job_interviews ON interviews.id = job_interviews.interview_id JOIN jobs ON jobs.id = job_interviews.job_id WHERE jobs.id = ? AND interviews.id = ?";

  const data = (
    await db.query(sql, [req.params.jobId, req.params.interviewId])
  )[0];

  res.status(200).json({
    statusbar: "success",
    data,
  });
});
