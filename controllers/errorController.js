const AppError = require("./../utils/appError");

const handleBadFieldErrorDB = (err) => {
  return new AppError(err.message, 400);
};

const handleRequiredFieldErrorDB = (err) => {
  const column = err.message.match(/'[^']*'/)[0].slice(1, -1);
  const table = err.sql.split(" ")[2].slice(0, -1);
  return new AppError(`A ${table} must have a ${column}`, 400);
};

const handleDuplicateEntryDB = (err) => {
  let [value, column] = [...err.message.matchAll(/'[^']*'/g)];
  column = column[0].slice(1, -1).split(".")[1];
  const table = err.sql.split(" ")[2].slice(0, -1);

  if (column === "email") {
    return new AppError(`Please use another email, ${value} is taken!`, 400);
  } else {
    return new AppError(`A ${table}'s ${column} must be unique`, 400);
  }
};

handleJobStatusAndDeadlineDB = (err) => {
  const arr = err.sql.split(",");
  let status = "";

  for (const i of arr) {
    if (i.includes("status")) status = i.split("=")[1].slice(2, -1);
  }

  if (status === "forthcoming") {
    return new AppError(
      "A forthcoming job must have a deadline in the future",
      400
    );
  } else if (status === "closed") {
    return new AppError("A closed job application cannot have a deadline", 400);
  }
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
    error.message = err.message;

    if (error.code === "ER_BAD_FIELD_ERROR")
      error = handleBadFieldErrorDB(error);

    if (error.code === "ER_BAD_NULL_ERROR")
      error = handleRequiredFieldErrorDB(error);

    if (error.code === "ER_DUP_ENTRY") error = handleDuplicateEntryDB(error);

    if (
      error.message.match(/'[^']*'/)?.[0].slice(1, -1) ===
      "CHK_JOB_STATUS_AND_DEADLINE"
    )
      error = handleJobStatusAndDeadlineDB(error);

    sendErrorProd(error, res);
  }
};
