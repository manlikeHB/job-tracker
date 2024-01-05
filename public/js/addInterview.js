import axios from "axios";
import { showAlert } from "./alerts";

export default addInterview = async (form) => {
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
    const response = await axios.post(
      `${baseUrl}api/v1/jobs/${jobId}/interviews`,
      form
    );

    if (response.data.status === "success") {
      showAlert("success", "Interview added successfully!");
      window.setTimeout(() => {
        location.assign(`/job/${jobId}/interview`);
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data);
    showAlert("error", err.response.data.message);
  }
};
