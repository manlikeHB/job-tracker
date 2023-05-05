const dotenv = require("dotenv");
const cron = require("./utils/cronjob");

dotenv.config({ path: "./config.env" });
console.log(process.env.NODE_ENV);

const app = require("./app");

const port = process.env.PORT || 5000;

const server = app.listen(port, (req, res) => {
  console.log(`Server is running on port: ${port}`);
});
