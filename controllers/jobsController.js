const Job = require("../models/jobModel");

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    res.status(201).json({
      status: "success",
      results: jobs.length,
      data: {
        jobs,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: {
        err,
      },
    });
  }
};

exports.createJob = async (req, res) => {
  try {
    const newJob = await Job.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        newJob,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        err,
      },
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: {
        job,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      data: {
        err,
      },
    });
  }
};
