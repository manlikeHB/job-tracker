const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });
console.log(process.env.NODE_ENV);

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection sucessful!!"));

const port = process.env.PORT || 5000;

const server = app.listen(port, (req, res) => {
  console.log(`Server is running on port: ${port}`);
});
