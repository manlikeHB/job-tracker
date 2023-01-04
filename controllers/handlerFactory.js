const db = require("../db");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { response } = require("express");

const isIdaNumberMsg = "Invalid ID! (ID must be a number)";

const sendResponse = (res, table, response, statusCode) => {
  const results = response.length > 1 ? response.length : undefined;

  let tableName = results ? table : table.slice(0, -1);

  res.status(statusCode).json({
    status: "success",
    results,
    [tableName]: response,
  });
};

exports.getAll = (table, filteredColumns) => {
  return catchAsync(async (req, res, next) => {
    const columns = filteredColumns ? filteredColumns : "*";
    const forUsers = `SELECT ${columns} FROM ${table} WHERE active <> 'false'`;
    const sql =
      table === "users" ? forUsers : `SELECT ${columns} FROM ${table}`;

    // Get all rows in table
    const result = (await db.query(sql))[0];

    sendResponse(res, table, result, 200);
  });
};

exports.createOne = (table) => {
  return catchAsync(async (req, res, next) => {
    const sql = `INSERT INTO ${table} SET ?`;
    const data = req.body;

    // Insert data into table
    const [row, fields] = await db.query(sql, data);

    // Get newly inserted row
    const result = (
      await db.query(`SELECT * FROM ${table} WHERE id = ?`, row.insertId)
    )[0];

    if (table === "jobs" && req.user) {
      const q = "INSERT INTO users_jobs SET ?";

      await db.query(q, { user_id: req.user.id, job_id: row.insertId });
    }

    sendResponse(res, table, result, 201);
  });
};

exports.deleteOne = (table) => {
  return catchAsync(async (req, res, next) => {
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    const id = req.params.id;

    // Check if id is a number
    if (!Number(id)) {
      return next(new AppError(isIdaNumberMsg, 404));
    }

    // Delete row
    const row = (await db.query(sql, id))[0];

    sendResponse(res, table, row, 204);
  });
};

exports.getOne = (table, filteredColumns) => {
  return catchAsync(async (req, res, next) => {
    const columns = filteredColumns ? filteredColumns : "*";
    const forUsers = `SELECT ${columns} FROM ${table} WHERE active <> 'false' AND id = ?`;
    const sql =
      table === "users"
        ? forUsers
        : `SELECT ${columns} FROM ${table} WHERE id = ?`;
    const id = req.params.id;

    // Check if id is a number
    if (!Number(id)) {
      return next(new AppError(isIdaNumberMsg, 404));
    }

    // select row
    const [row, fields] = await db.query(sql, id);

    // Throw error if row is an empty array
    if (!(Array.isArray(row) && row.length)) {
      return next(
        new AppError(`No ${table.slice(0, -1)} found with that id`, 404)
      );
    }

    sendResponse(res, table, row, 200);
  });
};

exports.updateOne = (table, filteredColumns) => {
  return catchAsync(async (req, res, next) => {
    const sql = `UPDATE ${table} SET ? WHERE id = ?`;
    const update = req.body;
    const id = req.params.id;
    const columns = filteredColumns ? filteredColumns : "*";

    // Check if id is a number
    if (!Number(id)) {
      return next(new AppError(isIdaNumberMsg, 404));
    }

    // update row
    await db.query(sql, [update, id]);

    // Get updated row
    const [result, ...others] = await db.query(
      `SELECT ${columns} FROM ${table} WHERE id = ?`,
      id
    );

    // Throw error if result is an empty array
    if (!(Array.isArray(result) && result.length)) {
      return next(
        new AppError(`No ${table.slice(0, -1)} found with that id`, 404)
      );
    }

    sendResponse(res, table, result, 200);
  });
};
