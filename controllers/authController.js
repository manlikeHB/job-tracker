const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const validator = require("validator");

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

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { lastName, firstName, email, password, passwordConfirm } = req.body;

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
    await db.query(
      `SELECT id, lastName, firstName, email, role, active FROM users WHERE id = ${newUserId} `
    )
  )[0][0];

  //   create and send Token
  createSendToken(newUser, 201, res, req);
});
