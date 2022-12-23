const AppError = require("./../utils/appError");

const handleBadFieldErrorDB = (err) => {
  return new AppError(err.message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // isOperatonal error: Trusted error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //Unknown error
  } else {
    // 1) log error
    console.error("ERROR!!!", err);

    // 2)send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (error.code === "ER_BAD_FIELD_ERROR")
      error = handleBadFieldErrorDB(error);

    sendErrorProd(error, res);
  }
};
