const Factory = require("./handlerFactory");

exports.getJob = Factory.getAll("jobs");
exports.createJob = Factory.createOne("jobs");
exports.deleteJob = Factory.deleteOne("jobs");
exports.getOneJob = Factory.getOne("jobs");
exports.updateJob = Factory.updateOne("jobs");
