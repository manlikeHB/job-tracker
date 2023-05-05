const cron = require("node-cron");

cron.schedule("* */1 * * *", () => {
  console.log("cron running every hour");
});

// cron.schedule("*/1 * * * * *", () => {
//   console.log("cron running every second");
// });

module.exports = cron;
