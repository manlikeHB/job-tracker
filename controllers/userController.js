const AppError = require("../utils/appError");
const Factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");
const db = require("../db");
const setProfilePhotoUrlExpTime = require("../utils/setProfilePhotoUrlExpTime");
const s3 = require("../utils/s3");

const columns = "id, lastName, firstName, email, role";

const searchSql = `SELECT ${columns} FROM users WHERE lastName LIKE ? OR firstName LIKE ? OR email LIKE ? OR role LIKE ? `;

const filterObj = (obj, ...options) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (options.includes(el)) {
      newObj[el] = obj[el];
    }
  });

  return newObj;
};

exports.createUser = (req, res, next) => {
  res.status(200).json({
    status: "error",
    data: "Route is undefined, Use sign up route instead!",
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;

  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user send password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password update, use /updatemypassword instead.",
        400
      )
    );
  }

  // Filter out fileds that are not allowed to be updated
  const filteredBody = filterObj(req.body, "lastName", "firstName", "email");

  // Check if profile photo is being updated and add to filterdBody
  if (req.imageName) {
    // Delete previous profile photo
    req.user.profilePhotoName &&
      (await s3.deleteFile(req.user.profilePhotoName));

    // Set the profile photo expiration time
    const profilePhotoUrlExp = setProfilePhotoUrlExpTime.setProfilePhotoExp();

    // Add image name, profile photo url and progile photo expiration time to filterdBody
    filteredBody.profilePhotoName = req.imageName;
    filteredBody.profilePhotoUrl = req.imageUrl;
    filteredBody.profilePhotoUrlExp = profilePhotoUrlExp;
  }

  // Update user
  const sql = "UPDATE users SET ? WHERE id = ?";
  await db.query(sql, [filteredBody, req.user.id]);

  // Get updated user
  const user = (
    await db.query(`SELECT ${columns} FROM users WHERE id = ?`, [req.user.id])
  )[0][0];

  // send response
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const sql = "UPDATE users SET active = 'false' WHERE id = ?";
  await db.query(sql, req.user.id);

  res.status(204).json({
    status: "success",
  });
});

exports.deleteAllJobsOnUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id || req.user.id;

  const sql =
    "DELETE jobs FROM jobs JOIN users_jobs ON users_jobs.job_id = jobs.id JOIN users ON users_jobs.user_id = users.id WHERE users.id = ?";

  await db.query(sql, userId);

  next();
});

exports.deleteAllInterviewsOnUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id || req.user.id;

  const sql =
    "DELETE interviews FROM jobs JOIN users_jobs ON users_jobs.job_id = jobs.id JOIN job_interviews ON job_interviews.job_id = jobs.id JOIN interviews ON job_interviews.interview_id = interviews.id JOIN users ON users_jobs.user_id = users.id WHERE users.id = ? ";

  await db.query(sql, userId);

  next();
});

exports.getAllUsers = Factory.getAll("users", columns);
exports.getUser = Factory.getOne("users", columns);
exports.deleteUser = Factory.deleteOne("users");
exports.updateUser = Factory.updateOne("users", columns);
exports.searchUser = Factory.search("users", searchSql, 4);
