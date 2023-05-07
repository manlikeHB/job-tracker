const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cron = require("./utils/cronjob");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const jobRouter = require("./routes/jobsRoute");
const userRouter = require("./routes/userRoute");
const interviewRouter = require("./routes/interviewRoute");
const notificationRouter = require("./routes/notificationRoute");

const app = express();

// Body parser
app.use(express.json());
// Cookie parser
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/interviews", interviewRouter);
app.use("/api/v1/notifications", notificationRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
