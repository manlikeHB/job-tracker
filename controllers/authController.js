const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const Factory = require("./handlerFactory");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { lastName, firstName, email, password, passwordConfirm } = req.body;

  //   Check if password and confirm password are the same
  if (password !== passwordConfirm) {
    return next(
      new AppError("Password and confirm password are not the same.", 400)
    );
  }

  // Check if email is already in use
  const result = (
    await db.query(`SELECT email FROM users WHERE email = ?`, email)
  )[0];

  if (Array.isArray(result) && result.length) {
    return next(new AppError("Email is already in use!"), 400);
  }

  //   Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  //    Insert new user
  const sql = "INSERT INTO users SET ?";
  const data = { lastName, firstName, email, password: hashedPassword };
  const newUserId = (await db.query(sql, data))[0].insertId;
  console.log(newUserId);

  //   create and send Token
  const token = signToken(newUserId);

  // Get current user
  const newUser = (
    await db.query(
      `SELECT id, lastName, firstName, email, role, active FROM users WHERE id = ${newUserId} `
    )
  )[0];

  res.status(200).json({
    status: "success",
    token,
    user: newUser,
  });
});
