const db = require("../db");
const catchAsync = require("./catchAsync");
const AppError = require("./appError");

exports.getAll = (table) => {
  return catchAsync(async (req, res, next) => {
    const sql = `SELECT * FROM ${table}`;

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

    const [row, fields] = await db.query(sql, data);

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
      return next(new AppError("Invalid ID", 404));
    }

    const [row, fields] = await db.query(sql, id);

    // Throw error if row is an empty array
    if (!(Array.isArray(row) && row.length)) {
      return next(new AppError("No job found with that ID", 404));
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

    const [row, fields] = await db.query(sql, [update, id]);

    res.status(200).json({
      status: "success",
      data: row,
    });
  });
};
