const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const validator = require("validator");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res, req) => {
  const token = signToken(user.id.toString());

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  // Remove password
  user.password = undefined;
  user.passwordChangedAt = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

const changedPasswordAfter = (JWTTimestamp, user) => {
  if (user.passwordChangedAt) {
    const changedPasswordTimestamp =
      new Date(user.passwordChangedAt).getTime() / 1000;

    return JWTTimestamp < changedPasswordTimestamp;
  }

  return false;
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { lastName, firstName, email, password, passwordConfirm } = req.body;

  // check if first name and last name are empty strings
  if (lastName.trim() === "")
    return next(new AppError("Last name is required", 400));
  if (firstName.trim() === "")
    return next(new AppError("First name is required", 400));

  // Check if email is valid
  if (!email || !validator.isEmail(email)) {
    return next(new AppError("Please enter a valid email!"));
  }

  // Check if email is already in use
  const result = (
    await db.query(`SELECT email FROM users WHERE email = ?`, email)
  )[0];

  if (Array.isArray(result) && result.length) {
    return next(new AppError("Email is already in use!"), 400);
  }

  // Check if password is equal to confirm password
  if (password !== passwordConfirm) {
    //   Check if password and confirm password are the same
    return next(
      new AppError("Password and confirm password are not the same.", 400)
    );
  }

  // Check if password is up to 8 characters
  if (!password || password.length < 8) {
    return next(
      new AppError("Please enter a password with at least 8 characters")
    );
  }

  //   Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  //    Insert new user
  const sql = "INSERT INTO users SET ?";
  const data = { lastName, firstName, email, password: hashedPassword };
  const newUserId = (await db.query(sql, data))[0].insertId;

  // Get current user
  const newUser = (
    await db.query(`SELECT * FROM users WHERE id = ${newUserId} `)
  )[0][0];

  //   create and send Token
  createSendToken(newUser, 201, res, req);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(
      new AppError("Please provide a valid email and password!"),
      400
    );
  }

  // Check if user exist and password is correct
  const user = (
    await db.query("SELECT * FROM users WHERE email = ?", email)
  )[0][0];

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Invalid email or password!", 401));
  }

  createSendToken(user, 200, res, req);
});

exports.protect = catchAsync(async (req, res, next) => {
  // Get token
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in, please log in to get access!"),
      401
    );
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exist
  const user = (
    await db.query("SELECT * FROM users WHERE id = ?", decoded.id)
  )[0][0];

  if (!user) {
    return next(
      new AppError("This user belonging to this token no longer exist", 401)
    );
  }

  // Check if user changed password after token was issued
  if (changedPasswordAfter(decoded.iat, user)) {
    return next(new AppError("Password changed recently, Login again", 401));
  }

  user.password = undefined;
  user.passwordChangedAt = undefined;

  req.user = user;

  next();
});
