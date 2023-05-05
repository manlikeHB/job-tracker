const handlerFactory = require("./handlerFactory");

exports.getOneNotification = handlerFactory.getOne("notifications");
exports.getAllNotifications = handlerFactory.getAll("notifications");
exports.createNotification = handlerFactory.createOne("notifications");
exports.updateNotification = handlerFactory.updateOne("notifications");
exports.deleteNotification = handlerFactory.deleteOne("notifications");
