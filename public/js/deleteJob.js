import axios from "axios";
import { showAlert } from "./alerts";

export const deleteJobFunc = async () => {
  // Getting the job ID
  const jobId = window.location.pathname.split("/")[2];

  // Constructing delete ULR for deleting a job
  // Get original URL
  const fullUrl = window.location.href;

  // Create a URL object
  const url = new URL(fullUrl);

  // Extract the base URL
  const baseUrl = `${url.protocol}//${url.host}/`;

  // Confirm if user wants to delete job
  if (!window.confirm("Are you sure you want to delete job?")) return;

  try {
    const response = await axios.delete(`${baseUrl}api/v1/jobs/${jobId}`);

    // If successful send a success alert
    if (response.status === 204) {
      showAlert("success", "Job Deleted successfully!");
      // Redirect to the jobs overview page
      window.setTimeout(() => {
        location.assign(`/overview`);
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
