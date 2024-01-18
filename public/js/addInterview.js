import axios from "axios";
import { showAlert } from "./alerts";

export default addInterview = async () => {
  // Get the value of various interview fields
  const type = document.getElementsByName("type")[0].value;
  const interviewerName =
    document.getElementsByName("interviewer_name")[0].value;
  const interviewDate = document.getElementsByName("interview_date")[0].value;
  const address = document.getElementsByName("address")[0].value;
  const note = document.getElementsByName("note")[0].value;
  const deadline = document.getElementsByName("deadline")[0].value;
  const results = document.getElementsByName("result")[0].value;
  const rescheduledDate = document.getElementsByName("rescheduleDate")[0].value;
  const rescheduleReason =
    document.getElementsByName("rescheduleReason")[0].value;

  // Initialize a new object form
  const form = {};

  // Check if a value is provided for the fields before creating a key and value pair
  if (type) form.type = type;
  if (interviewDate) form.interview_date = interviewDate;
  if (address) form.address = address;
  if (note) form.notes = note;
  if (interviewerName) form.interviewer_name = interviewerName;
  if (deadline) form.deadline = deadline;
  if (results) form.results = results;
  if (rescheduledDate) form.rescheduled_date = rescheduledDate;
  if (rescheduleReason) form.rescheduleReason = rescheduleReason;

  // Getting the job ID
  const jobId = window.location.pathname.split("/")[2];

  // Constructing  post ULR for the adding new interview request
  // Get original URL
  const fullUrl = window.location.href;

  // Create a URL object
  const url = new URL(fullUrl);

  // Extract the base URL
  const baseUrl = `${url.protocol}//${url.host}/`;

  try {
    // Make a post request with the form
    const response = await axios.post(
      `${baseUrl}api/v1/jobs/${jobId}/interviews`,
      form
    );

    // If successful send a success alert
    if (response.data.status === "success") {
      showAlert("success", "Interview added successfully!");
      // Redirect to the interviews page of the job
      window.setTimeout(() => {
        location.assign(`/job/${jobId}/interview`);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
