const inputs = document.querySelectorAll(".form-input");
const edit = document.querySelector(".edit-job");
const jobStatus = document.querySelector(".select-job-status");
const jobType = document.querySelector(".select-job-type");
const addAndViewButton = document.querySelector(".add-view-interview");
const saveDiv = document.querySelector(".save-job");
const save = document.querySelector(".save");
const jobDeadline = document.querySelector(".job-deadline");

edit.addEventListener("click", editAndSave);
save.addEventListener("click", saveJob);

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

// Collect initial values for job status and job type
let prevJobStatus;
let prevJobType;

function editAndSave() {
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

  let [dayOfWeek, month, day, year, by, time, ampm] =
    jobDeadline.value.split(" ");

  let [h, m, s] = time.split(":");
  h = h * 1 + 1;

  time = [h, m, s].join(":");

  const deadlineValue = new Date([month, day, year, time])
    .toISOString()
    .slice(0, -1)
    .replace("T", " ");

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
    console.log(n.value);
    if (
      n.classList.contains("select-job-status") ||
      n.classList.contains("select-job-type")
    ) {
      n.setAttribute("disabled", "");
    } else {
      n.setAttribute("readonly", "");
    }
  });

  //
  const [dayW, M, dayN, year, time] = new Date(jobDeadline.value)
    .toString()
    .split(" ");

  const timeString = generateAmPmTime(time);

  const dateString = [dayW, M, dayN, year].join(" ");
  const deadlineValue = `${dateString} by ${timeString}`;

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
