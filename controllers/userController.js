const Factory = require("./handlerFactory");
const db = require("../db");

const columns = "id, lastName, firstName, email, role";

exports.createUser = (req, res, next) => {
  res.status(200).json({
    status: "error",
    data: "Route is undefined, Use sign up route instead!",
  });
};

exports.updateMe = (req, res, next) => {};

exports.deleteMe = (req, res, next) => {};

exports.getAllUsers = Factory.getAll("users", columns);
exports.getUser = Factory.getOne("users", columns);
exports.deleteUser = Factory.deleteOne("users");
exports.updateUser = Factory.updateOne("users", columns);
