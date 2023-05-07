const cron = require("node-cron");
const axios = require("axios");
const jobController = require("./../controllers/jobsController");
const convertToMysqlDateTime = require("./convertToMysqlDateTime");

// cronjob set to run at midnight everyday
cron.schedule(" 0 0 * * *", async (time) => {
  try {
    console.log(`Jobs Notification cronJob running at ${time}`);

    //   Get all jobs with a deadline and notification not yet created
    const jobs = await jobController.getAllJobsWithDeadline();

    // Check if jobs is empty and exit
    if (!(Array.isArray(jobs) && jobs.length)) return;

    for (const job of jobs) {
      const { user_id, deadline, job_id } = job;

      //   Create notifications
      await axios.post("http://127.0.0.1:5000/api/v1/notifications", {
        user_id,
        notification_time: convertToMysqlDateTime(deadline),
        type: "job",
      });

      // Update notification_created status
      await jobController.updateNotificationCreatedStatus(job_id);
    }
  } catch (error) {
    console.log("Error from Jobs Notification cronJob");
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
  }
});

module.exports = cron;
