const mysql = require("mysql2/promise");

let db;

if (process.env.DB_HOST === "localhost") {
  // DB Local Host
  db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  console.log("Connecting to local machine database...");
} else {
  // DB Cloud hosted
  db = mysql.createPool({
    host: process.env.DB_CLOUD_HOST,
    user: process.env.DB_CLOUD_USER,
    password: process.env.DB_CLOUD_PASSWORD,
    database: process.env.DB_CLOUD_DATABASE,
  });

  console.log("Connecting to Cloud hosted database...");
}

db.getConnection()
  .then(() => console.log("CONNECTION TO DATABASE ESTABLISHED SUCCESSFULLY!!!"))
  .catch((err) => console.log(err));

module.exports = db;
