const express = require("express");
const morgan = require("morgan");
const jobsRoute = require("./routes/jobsRoute");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1/jobs", jobsRoute);

module.exports = app;
