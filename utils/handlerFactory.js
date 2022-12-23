const db = require("../db");
const catchAsync = require("./catchAsync");
const AppError = require("./appError");

const isIdaNumberMsg = "Invalid ID! (ID must be a number)";

exports.getAll = (table) => {
  return catchAsync(async (req, res, next) => {
    const sql = `SELECT * FROM ${table}`;

    // Get all rows in table
    const [result, fields] = await db.query(sql);

    res.status(200).json({
      status: "success",
      results: result.length,
      data: result,
    });
  });
};

exports.createOne = (table) => {
  return catchAsync(async (req, res, next) => {
    const sql = `INSERT INTO ${table} SET ?`;
    const data = req.body;

    // Insert data into table
    const [row, fields] = await db.query(sql, data);

    // Get newly inserted row
    const result = await db.query(
      `SELECT * FROM ${table} WHERE id = ?`,
      row.insertId
    );

    res.status(200).json({
      status: "success",
      data: result[0],
    });
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
    const [row, fields] = await db.query(sql, id);

    res.status(204).json({
      status: "success",
      data: row,
    });
  });
};

exports.getOne = (table) => {
  return catchAsync(async (req, res, next) => {
    const sql = `SELECT * FROM ${table} WHERE id = ?`;
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
        new AppError(`No ${table.slice(0, -1)} found with the ID: ${id}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: row,
    });
  });
};

exports.updateOne = (table) => {
  return catchAsync(async (req, res, next) => {
    const sql = `UPDATE ${table} SET ? WHERE id = ?`;
    const update = req.body;
    const id = req.params.id;

    // Check if id is a number
    if (!Number(id)) {
      return next(new AppError(isIdaNumberMsg, 404));
    }

    // update row
    await db.query(sql, [update, id]);

    // Get updated row
    const [result, ...others] = await db.query(
      `SELECT * FROM ${table} WHERE id = ?`,
      id
    );

    // Throw error if result is an empty array
    if (!(Array.isArray(result) && result.length)) {
      return next(
        new AppError(`No ${table.slice(0, -1)} found with the ID: ${id}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: result,
    });
  });
};
