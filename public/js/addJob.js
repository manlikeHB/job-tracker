import axios from "axios";
import { showAlert } from "./alerts";

export default addJob = async () => {
  // Get the values of the respective fields
  const title = document.querySelector("#title").value;
  const position = document.querySelector("#position").value;
  const company = document.querySelector("#company").value;
  const location = document.querySelector("#location").value;
  const status = document.querySelector("#status").value;
  const type = document.querySelector("#type").value;
  const deadline = document.querySelector("#deadline").value;
  const description = document.querySelector("#description").value;
  const requirement = document.querySelector("#requirement").value;

  //   Initialize a new object
  const form = {};

  //   If the respective field values are provided input a key and value pair
  if (title) form.title = title;
  if (company) form.company = company;
  if (location) form.location = location;
  if (description) form.description = description;
  if (requirement) form.requirement = requirement;
  if (type) form.type = type;
  if (status) form.status = status;
  if (position) form.position = position;
  if (deadline) form.deadline = deadline;

  try {
    // Make a post request to create new job
    const response = await axios.post("api/v1/jobs", form);

    // If it was a succes send a success alert
    if (response.data.status === "success") {
      showAlert("success", "Job added successfully!");

      // Redirect to the job overview page
      window.setTimeout(() => {
        window.location.assign(`/overview`);
      }, 1500);
    }
  } catch (err) {
    // Show error
    showAlert("error", err.response.data.message);
  }
};
