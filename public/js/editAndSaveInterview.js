import axios from "axios";
import { showAlert } from "./alerts";
import {
  DBDateTimeToReadableString,
  readableDateTimeToMySQlDateTime,
  convertToMySQLDateTime,
} from "./timeFunctions";

// Check if an object is empty
const isEmpty = (obj) => Object.keys(obj).length === 0;

// Initialize previous values of interview the interview input fields
let prevResult;
let prevInterviewDate;
let prevRescheduledDate;
let prevDeadline;
let prevRescheduleReason;
let prevInterviewersName;
let prevInterviewType;
let prevInterviewAddress;
let prevInterviewNote;

// Function to save/update the edited interview to the database
const saveInterviewToDB = async (card) => {
  // Select the respective fields of the particular card being edited
  const result = card.querySelector(".select-interview-result");
  const interviewDate = card.querySelector(".interview-date-input");
  const interviewDeadline = card.querySelector(".interview-deadline");
  const rescheduleDate = card.querySelector(".reschedule-date");
  const rescheduleReason = card.querySelector(".select-reschedule-reason");
  const interviewersName = card.querySelector(".select-interviewers-name");
  const interviewType = card.querySelector(".interview-type");
  const interviewAddress = card.querySelector(".interview-address");
  const interviewNote = card.querySelector(".interview-note");
  const interviewForm = card.querySelector(".form-interview-data");

  // Initailize an empty object (form) where all the updated fields values are stored
  const form = {};

  // Compare the previous values in the fields with the current values before adding them to the form
  if (prevDeadline !== interviewDeadline.value)
    form.deadline = readableDateTimeToMySQlDateTime(interviewDeadline.value);
  if (prevInterviewAddress !== interviewAddress.value)
    form.address = interviewAddress.value;
  if (prevInterviewDate !== interviewDate.value)
    form.interview_date = readableDateTimeToMySQlDateTime(interviewDate.value);
  if (prevInterviewNote !== interviewNote.value)
    form.note = interviewNote.value;
  if (prevInterviewType !== interviewType.value)
    form.type = interviewType.value;
  if (prevInterviewersName !== interviewersName.value)
    form.interviewer_name = interviewersName.value;
  if (prevRescheduleReason !== rescheduleReason.value)
    form.reschedule_reason = rescheduleReason.value;
  if (prevRescheduledDate !== rescheduleDate.value)
    form.rescheduled_date = readableDateTimeToMySQlDateTime(
      rescheduleDate.value
    );
  if (prevResult !== result.value) form.result = result.value;

  // Check if form is empty before submitting to the database
  if (isEmpty(form)) return;

  // Get the full url and construct the url for the patch request
  const fullUrl = window.location.href;

  // Create a URL object
  const url = new URL(fullUrl);

  // Extract the base URL
  const baseUrl = `${url.protocol}//${url.host}/`;

  try {
    // Get the ID of the currently edited interview
    const interviewID = interviewForm.dataset.id;

    // Make a patch request sending the form
    const response = await axios.patch(
      `${baseUrl}api/v1/interviews/${interviewID}`,
      form
    );

    // Show alert if interview was updated successfully
    if (response.data.status === "success") {
      showAlert("success", "Interview updated successfully!");
    }
  } catch (err) {
    // Show alert if there was an error while updating interview
    showAlert("error", err.response.data.message);
    window.setTimeout(() => {
      location.reload();
    }, 1500);
  }
};

// Edit interview function with the currently selected card passed as a parameter
export const editInterviewFunc = (card) => {
  // Select all the input fields and edit and save button of the selected card
  const inputs = card.querySelectorAll(".form-input");
  const editInterview = card.querySelector(".edit-interview");
  const saveInterview = card.querySelector(".save-interview");

  // Select the respective fields of the selected interview card
  const result = card.querySelector(".select-interview-result");
  const interviewDate = card.querySelector(".interview-date-input");
  const interviewDeadline = card.querySelector(".interview-deadline");
  const rescheduleDate = card.querySelector(".reschedule-date");
  const rescheduleReason = card.querySelector(".select-reschedule-reason");
  const interviewersName = card.querySelector(".select-interviewers-name");
  const interviewType = card.querySelector(".interview-type");
  const interviewAddress = card.querySelector(".interview-address");
  const interviewNote = card.querySelector(".interview-note");

  // collect the previous values of the interview fields
  prevResult = result.value;
  prevInterviewDate = interviewDate.value;
  prevRescheduledDate = rescheduleDate.value;
  prevDeadline = interviewDeadline.value;
  prevRescheduleReason = rescheduleReason.value;
  prevInterviewersName = interviewersName.value;
  prevInterviewType = interviewType.value;
  prevInterviewAddress = interviewAddress.value;
  prevInterviewNote = interviewNote.value;

  // Toggle the edit button
  editInterview.classList.toggle("disabled-icon");

  // Get all input fields and remove the readonly and disabled attribute
  inputs.forEach((n) => {
    if (n.hasAttribute("readonly")) {
      n.removeAttribute("readonly");
    } else if (n.hasAttribute("disabled")) {
      n.removeAttribute("disabled");
    }
  });

  // Empty the interview date, deadline and rescheduled date value
  interviewDate.value = "";
  interviewDeadline.value = "";
  rescheduleDate.value = "";

  // set thier type attributes to datetime local
  interviewDate.setAttribute("type", "datetime-local");
  interviewDeadline.setAttribute("type", "datetime-local");
  rescheduleDate.setAttribute("type", "datetime-local");

  // Add options tag to the result select element
  result.innerHTML = `<option value="">Select Interview Result*</option> <option value="passed">Passed</option> <option value="failed">Failed</option>`;

  // Show save button
  saveInterview.classList.toggle("display-none");
};

export const saveInterviewFunc = async (card) => {
  // Select all the inputs, edit and save buttons of the selected interview card
  const inputs = card.querySelectorAll(".form-input");
  const editInterview = card.querySelector(".edit-interview");
  const saveInterview = card.querySelector(".save-interview");

  // Select the result, interview date, interview deadline and rescheduled date
  const result = card.querySelector(".select-interview-result");
  const interviewDate = card.querySelector(".interview-date-input");
  const interviewDeadline = card.querySelector(".interview-deadline");
  const rescheduleDate = card.querySelector(".reschedule-date");

  // Get all input fields and add the readonly and disabled attribute
  inputs.forEach((n) => {
    if (n.classList.contains("select-interview-result")) {
      n.setAttribute("disabled", "");
    } else {
      n.setAttribute("readonly", "");
    }
  });

  // Interview date
  if (!interviewDate.value) {
    interviewDate.setAttribute("type", "text");
    interviewDate.value = prevInterviewDate;
  } else {
    // If new value is provided for interviewDate then set value to new value
    interviewDate.setAttribute("type", "text");
    // convert to readable string
    interviewDate.value = DBDateTimeToReadableString(
      convertToMySQLDateTime(interviewDate.value)
    );
  }

  // Interview deadline
  if (!interviewDeadline.value) {
    interviewDeadline.setAttribute("type", "text");
    interviewDeadline.value = prevDeadline;
  } else {
    // If new value is provided for interviewDeadline then set value to new value
    interviewDeadline.setAttribute("type", "text");
    // convert to readable string
    interviewDeadline.value = DBDateTimeToReadableString(
      convertToMySQLDateTime(interviewDeadline.value)
    );
  }

  //  Interview rescheduled Date
  if (!rescheduleDate.value) {
    rescheduleDate.setAttribute("type", "text");
    rescheduleDate.value = prevRescheduledDate;
  } else {
    // If new value is provided for rescheduleDate then set value to new value
    rescheduleDate.setAttribute("type", "text");
    // convert to readable string
    rescheduleDate.value = DBDateTimeToReadableString(
      convertToMySQLDateTime(rescheduleDate.value)
    );
  }

  // Assign result value if unprovided
  const resultValue = result.value ? result.value : prevResult;
  result.innerHTML = `<option value="${resultValue}">${resultValue}</option>`;

  // Hide save button
  saveInterview.classList.toggle("display-none");
  editInterview.classList.toggle("disabled-icon");

  await saveInterviewToDB(card);
};
