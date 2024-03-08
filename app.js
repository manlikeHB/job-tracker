const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");
const compression = require("compression");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const jobRouter = require("./routes/jobsRoute");
const userRouter = require("./routes/userRoute");
const interviewRouter = require("./routes/interviewRoute");
const notificationRouter = require("./routes/notificationRoute");
const viewsRouter = require("./routes/viewRoute");

const app = express();

app.enable("trust proxy");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Set CORS
app.use(cors());

// Allow complex request like (Delete, Patch and Put) when the browser sends a preflight request
app.options("*", cors());

// Set security http header
app.use(helmet.crossOriginResourcePolicy("cross - origin"));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
// Cookie parser
app.use(cookieParser());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

// Routes
app.use("/", viewsRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/interviews", interviewRouter);
app.use("/api/v1/notifications", notificationRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
