const inputs = document.querySelectorAll(".form-input");

// Interview
const editInterview = document.querySelector(".edit-interview");
const result = document.querySelector(".select-interview-result");
const interviewDate = document.querySelector(".interview-date-input");
const interviewDeadline = document.querySelector(".interview-deadline");
const rescheduleDate = document.querySelector(".reschedule-date");
const saveInterview = document.querySelector(".save-interview");
const saveInterviewBtn = document.querySelector(".save-interview-btn");

if (editInterview) {
  editInterview.addEventListener("click", editInterviewFunc);
}

if (saveInterviewBtn) {
  saveInterviewBtn.addEventListener("click", saveInterviewFunc);
}

// Initialize previous values of interview result, date, rescheduled date and deadline
let prevResult;
let prevInterviewDate = interviewDate;
let prevRescheduledDate;
let prevDeadline = interviewDeadline;

function editInterviewFunc() {
  // collect values of interview result, date, rescheduled date and deadline
  prevResult = result.value;
  prevInterviewDate = interviewDate.value;
  prevRescheduledDate = rescheduleDate.value;
  prevDeadline = interviewDeadline.value;

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
}

function saveInterviewFunc() {
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
}
