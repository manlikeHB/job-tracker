const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const jobRouter = require("./routes/jobsRoute");
const userRouter = require("./routes/userRoute");

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

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
