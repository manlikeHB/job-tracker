const Factory = require("./handlerFactory");

exports.getAllInterviews = Factory.getAll("interviews");
exports.getInterview = Factory.getOne("interviews");
