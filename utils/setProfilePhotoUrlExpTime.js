const convertToMySQLDateTime = require("./convertToMysqlDateTime");

// This file is so that it will be easy to track the time passed across to the s3 getSignedUrl function, profile photo expiration time passed when a user is updating profile photo and when the url expires and it has to be regenerated in the authController protect function.

// Set the time 24 hours (86400 seconds)
const time = 86400;

exports.setProfilePhotoExp = () =>
  // Multiply time by 1000 to get time in milliseconds
  convertToMySQLDateTime(Date.now() + time * 1000);

exports.s3SignedUrlExp = () => time;
