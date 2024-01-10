import axios from "axios";
import {
  DBDateTimeToReadableString,
  readableDateTimeToMySQlDateTime,
  convertToMySQLDateTime,
} from "./timeFunctions";
import { showAlert } from "./alerts";

// All input field
const inputs = document.querySelectorAll(".form-input");

// Jobs edit, save and add/view buttons
const editJob = document.querySelector(".edit-job");
const addAndViewButton = document.querySelector(".add-view-interview");
const saveDiv = document.querySelector(".save-job");

// Job feilds
const jobStatus = document.querySelector(".select-job-status");
const jobRequirement = document.querySelector(".job-requirement");
const jobDescription = document.querySelector(".job-description");
const jobType = document.querySelector(".select-job-type");
const jobDeadline = document.querySelector(".job-deadline");
const jobLocation = document.querySelector(".job-location");
const jobCompany = document.querySelector(".job-company");
const jobPosition = document.querySelector(".job-position");
const jobTitle = document.querySelector(".job-title");

// Initialize the previous values
let prevJobStatus;
let prevJobType;
let prevJobDeadline;
let prevJobRequirement;
let prevJobDescription;
let prevJobLocation;
let prevJobCompany;
let prevJobPosition;
let prevJobTitle;

// Save edited job to database
const saveJobToDB = async () => {
  // Initialize the form where fields and values to be updated are saved
  const form = {};

  // Check if the previous value are changed before adding to the form
  if (prevJobStatus !== jobStatus.value) form.status = jobStatus.value;
  if (prevJobRequirement !== jobRequirement.value)
    form.requirement = jobRequirement.value;
  if (prevJobDescription !== jobDescription.value)
    form.description = jobDescription.value;
  if (prevJobType !== jobType.value) form.type = jobType.value;
  if (prevJobDeadline !== jobDeadline.value)
    form.deadline = readableDateTimeToMySQlDateTime(jobDeadline.value);
  if (prevJobLocation !== jobLocation.value) form.location = jobLocation.value;
  if (prevJobCompany !== jobCompany.value) form.company = jobCompany.value;
  if (prevJobPosition !== jobPosition.value) form.position = jobPosition.value;
  if (prevJobTitle !== jobTitle.value) form.title = jobTitle.value;

  // Check if form empty before submitting to the database
  if (isEmpty(form)) return;

  const fullUrl = window.location.href;

  // Create a URL object
  const url = new URL(fullUrl);

  // Extract the base URL
  const baseUrl = `${url.protocol}//${url.host}/`;

  try {
    const jobId = window.location.pathname.split("/")[2];

    const response = await axios.patch(`${baseUrl}api/v1/jobs/${jobId}`, form);

    if (response.data.status === "success") {
      showAlert("success", "Job updated successfully!");
    }
  } catch (err) {
    console.log(err.response.data);
    showAlert("error", err.response.data.message);
    window.setTimeout(() => {
      location.reload();
    }, 1500);
  }
};

// Edit job
export const editJobFunc = () => {
  // Collect initial values
  prevJobStatus = jobStatus.value;
  prevJobType = jobType.value;
  prevJobDeadline = jobDeadline.value;
  prevJobRequirement = jobRequirement.value;
  prevJobDescription = jobDescription.value;
  prevJobLocation = jobLocation.value;
  prevJobCompany = jobCompany.value;
  prevJobPosition = jobPosition.value;
  prevJobTitle = jobTitle.value;

  // Disable edit button when editing job
  editJob.classList.toggle("disabled-icon");

  // Get all input fields and remove the readonly and disabled attribute
  inputs.forEach((n) => {
    if (n.hasAttribute("readonly")) {
      n.removeAttribute("readonly");
    } else if (n.hasAttribute("disabled")) {
      n.removeAttribute("disabled");
    }
  });

  // Remove job deadline value when editing
  jobDeadline.value = "";

  // 2) set deadline attribute to datetime-local
  jobDeadline.setAttribute("type", "datetime-local");

  //   Add options tag to the select element
  jobStatus.innerHTML = `  <option value="">Select Job Status*</option>
                            <option value="open">Open</option>
                             <option value="closed">Closed</option>
  <option value="forthcoming">Forthcoming</option>`;
  jobType.innerHTML = `<option value="">Select Job Type*</option> 
                        <option value="onsite">On-site</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>`;

  //   Show the save button and remove add interview and view interview button
  addAndViewButton.classList.toggle("display-none");
  saveDiv.classList.toggle("display-none");
};

// Check if an object is empty
const isEmpty = (obj) => Object.keys(obj).length === 0;

// Save job
export const saveJobFunc = async () => {
  // Get all input fields and add the readonly and disabled attribute
  inputs.forEach((n) => {
    if (
      n.classList.contains("select-job-status") ||
      n.classList.contains("select-job-type")
    ) {
      n.setAttribute("disabled", "");
    } else {
      n.setAttribute("readonly", "");
    }
  });

  // If no new value for job deadline then set value to preveious value
  if (!jobDeadline.value) {
    jobDeadline.setAttribute("type", "text");
    jobDeadline.value = prevJobDeadline;
  } else {
    // If new value is provided for jobdeadline then set value to new value
    jobDeadline.setAttribute("type", "text");
    // convert to readable string
    jobDeadline.value = DBDateTimeToReadableString(
      convertToMySQLDateTime(jobDeadline.value)
    );
  }

  // Assign job status value and job type value if unprovided
  const jobStatusValue = jobStatus.value ? jobStatus.value : prevJobStatus;
  const jobTypeValue = jobType.value ? jobType.value : prevJobType;

  jobStatus.innerHTML = `<option value="${jobStatusValue}">${jobStatusValue}</option>`;
  jobType.innerHTML = `<option value="${jobTypeValue}">${jobTypeValue}</option>`;

  //   Show the save button and remove add interview and view interview button
  addAndViewButton.classList.toggle("display-none");
  saveDiv.classList.toggle("display-none");

  editJob.classList.toggle("disabled-icon");

  await saveJobToDB();
};
