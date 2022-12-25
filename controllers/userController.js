const Factory = require("./handlerFactory");

const columns = "id, lastName, firstName, email, role, active";

exports.createUser = (req, res, next) => {
  res.status(200).json({
    status: "error",
    data: "Use sign up route",
  });
};

exports.getAllUsers = Factory.getAll("users", columns);
exports.getUser = Factory.getOne("users", columns);
