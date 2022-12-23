const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.getConnection((err) => {
  if (err) throw err;

  console.log("DATABASE CONNECTION SUCCESSFUL!!!");
});

module.exports = db;
