const inputs = document.querySelectorAll(".form-input");

// Jobs
const editJob = document.querySelector(".edit-job");
const jobStatus = document.querySelector(".select-job-status");
const jobType = document.querySelector(".select-job-type");
const addAndViewButton = document.querySelector(".add-view-interview");
const saveDiv = document.querySelector(".save-job");
const save = document.querySelector(".save");
const jobDeadline = document.querySelector(".job-deadline");

if (editJob) {
  editJob.addEventListener("click", editJobFunc);
}

if (save) {
  save.addEventListener("click", saveJob);
}

// Interview
const editInterview = document.querySelector(".edit-interview");
const result = document.querySelector(".select-interview-result");
const interviewDate = document.querySelector(".interview-date-input");
const interviewDeadline = document.querySelector(".interview-deadline");
const saveInterview = document.querySelector(".save-interview");
const saveInterviewBtn = document.querySelector(".save-interview-btn");

if (editInterview) {
  editInterview.addEventListener("click", editInterviewFunc);
}

if (saveInterviewBtn) {
  saveInterviewBtn.addEventListener("click", saveInterviewFunc);
}

const generateAmPmTime = (time) => {
  const [hr, min, sec] = time.split(":");

  const ampm = hr > 12 ? "pm" : "am";

  let timeString = "";
  if (hr > "12" && hr !== "24") {
    const hrDiff = hr - 12;
    timeString = `${hrDiff}:${min} ${ampm}`;
  } else if (hr === "12") {
    timeString = `12:${min} pm`;
  } else if (hr === "24" || hr === "00") {
    timeString = `12:${min} am`;
  } else {
    timeString = `${hr}:${min} ${ampm}`;
  }

  return timeString;
};

const convertDateTime = (dateTime) => {
  let [dayOfWeek, month, day, year, by, time, ampm] = dateTime.value.split(" ");

  let [h, m, s] = time.split(":");

  if (ampm === "pm") {
    h = h * 1 + 12;
  }

  h = h * 1 + 1;

  time = [h, m, s].join(":");

  const convertedDateTime = new Date([month, day, year, time])
    .toISOString()
    .slice(0, -1)
    .replace("T", " ");

  return convertedDateTime;
};

const convertDateTimeToString = (dateTime) => {
  const [dayW, M, dayN, year, time] = new Date(dateTime.value)
    .toString()
    .split(" ");

  const timeString = generateAmPmTime(time);

  const dateString = [dayW, M, dayN, year].join(" ");
  const dateTimeString = `${dateString} by ${timeString}`;

  return dateTimeString;
};

// Collect initial values for job status and job type
let prevJobStatus;
let prevJobType;

function editJobFunc() {
  prevJobStatus = jobStatus.value;
  prevJobType = jobType.value;

  // Get all input fields and remove the readonly and disabled attribute
  inputs.forEach((n) => {
    if (n.hasAttribute("readonly")) {
      n.removeAttribute("readonly");
    } else if (n.hasAttribute("disabled")) {
      n.removeAttribute("disabled");
    }
  });

  // Change the deadline input type to datetime-local and set the value
  // 1) convert deadline to datetime-local acceptable format

  const deadlineValue = convertDateTime(jobDeadline);

  // 2) set deadline attribute to datetime-local
  jobDeadline.setAttribute("type", "datetime-local");
  // 3) set the value
  jobDeadline.value = deadlineValue;

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
}

function saveJob() {
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

  // Convert job deadline to readable time string
  const deadlineValue = convertDateTimeToString(jobDeadline);

  jobDeadline.setAttribute("type", "text");
  jobDeadline.value = deadlineValue;

  // Assign job status value and job type value if unprovided
  const jobStatusValue = jobStatus.value ? jobStatus.value : prevJobStatus;
  const jobTypeValue = jobType.value ? jobType.value : prevJobType;

  jobStatus.innerHTML = `<option value="${jobStatusValue}">${jobStatusValue}</option>`;
  jobType.innerHTML = `<option value="${jobTypeValue}">${jobTypeValue}</option>`;

  //   Show the save button and remove add interview and view interview button
  addAndViewButton.classList.toggle("display-none");
  saveDiv.classList.toggle("display-none");
}

// collect initial values of interview result
let prevResult;
function editInterviewFunc() {
  prevResult = result.value;

  // Get all input fields and remove the readonly and disabled attribute
  inputs.forEach((n) => {
    if (n.hasAttribute("readonly")) {
      n.removeAttribute("readonly");
    } else if (n.hasAttribute("disabled")) {
      n.removeAttribute("disabled");
    }
  });

  // convert date and time to datetime-local acceptable format
  const interviewDateValue = convertDateTime(interviewDate);
  const interviewDeadlineValue = convertDateTime(interviewDeadline);

  // Set attribute to type datetime-local
  interviewDate.setAttribute("type", "datetime-local");
  interviewDeadline.setAttribute("type", "datetime-local");

  // set value
  interviewDate.value = interviewDateValue;
  interviewDeadline.value = interviewDeadlineValue;

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

  // Convert interview date and deadline to readable time string
  const interviewDateValue = convertDateTimeToString(interviewDate);
  const interviewDeadlineValue = convertDateTimeToString(interviewDeadline);

  // Set interview date and deadline attributes to type text
  interviewDate.setAttribute("type", "text");
  interviewDeadline.setAttribute("type", "text");

  // Set interview date and deadline values
  interviewDate.value = interviewDateValue;
  interviewDeadline.value = interviewDeadlineValue;

  // Assign result value if unprovided
  const resultValue = result.value ? result.value : prevResult;
  result.innerHTML = `<option value="${resultValue}">${resultValue}</option>`;

  // Hide save button
  saveInterview.classList.toggle("display-none");
}
