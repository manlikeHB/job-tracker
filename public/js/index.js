import "core-js/actual";

import { login, logout } from "./login";
import signUp from "./signUp";
import showPassword from "./showPassword";
import hamburgerMenu from "./hamburgerMenu";
import performSearch from "./search";
import addInterview from "./addInterview";
import { editJobFunc, saveJobFunc } from "./editAndSaveJob";
import { editInterviewFunc, saveInterviewFunc } from "./editAndSaveInterview";
import { updateUserInfo, updateUserPassword } from "./updateAccount";
import addJob from "./addJob";
import { deleteJobFunc, deleteInterviewFunc } from "./delete";

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const showPasswordBox = document.querySelector(".show-password");
const passwordInputs = document.querySelectorAll(".password");
const loginForm = document.querySelector(".form-login");
const signUpForm = document.querySelector(".form-signup");
const searchGlass = document.querySelector(".search-glass");
const searchInput = document.querySelector("#search");
const interviewForm = document.querySelector(".form-interview-data");
const editJob = document.querySelector(".edit-job");
const saveJob = document.querySelector(".save");
const editInterviewBtns = document.querySelectorAll(".edit-interview");
const saveInterviewBtns = document.querySelectorAll(".save-interview-btn");
const logoutBtns = document.querySelectorAll(".logout");
const userData = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");
const jobForm = document.querySelector(".form-job-data");
const deleteJob = document.querySelector(".delete-job");
const deleteInterview = document.querySelectorAll(".delete-interview");

// login
if (loginForm) {
  document.querySelector(".form-login").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password-login").value;

    login(email, password);
  });
}

// Hamburger menu
if (hamburger && navMenu) hamburgerMenu(hamburger, navMenu);

// Show password
if (showPasswordBox && passwordInputs)
  showPassword(showPasswordBox, passwordInputs);

// perform search when enter key is pressed
if (searchInput) {
  searchInput.addEventListener("keydown", (e) => {
    // Check if key pressed was the enter key
    if (e.key === "Enter") {
      // Perform search
      performSearch();
    }
  });
}

// Perform search when the magnifing glass is clicked
if (searchGlass) {
  // Listen for a click on search glass
  searchGlass.addEventListener("click", () => {
    // Get the value from search input and trim to remove whitesapace
    performSearch();
  });
}

// Add Interview on a job
if (interviewForm) {
  interviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addInterview();
  });
}

// Edit job
if (editJob) {
  editJob.addEventListener("click", editJobFunc);
}

// Save job after edit
if (saveJob) {
  saveJob.addEventListener("click", saveJobFunc);
}

// Edit interview
if (editInterviewBtns) {
  // Get all edit buttons and attach an event listener to all
  editInterviewBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const card = btn.parentElement.parentElement.parentElement;

      // Call the edit interview function and pass the particular card being edited as a parameter
      editInterviewFunc(card);
    });
  });
}

// Save interview after edit
if (saveInterviewBtns) {
  saveInterviewBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const card = btn.parentElement.parentElement.parentElement.parentElement;

      // Call the save interview function and pass the particular card being edited as a parameter
      await saveInterviewFunc(card);
    });
  });
}

// Sign Up
if (signUpForm) {
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const lastName = document.querySelector("#last-name").value;
    const firstName = document.querySelector("#first-name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password-signup").value;
    const passwordConfirm = document.querySelector("#password-confirm").value;

    signUp(lastName, firstName, email, password, passwordConfirm);
  });
}

if (logoutBtns) {
  logoutBtns.forEach((btn) => {
    btn.addEventListener("click", logout);
  });
}

// Update user information
if (userData) {
  userData.addEventListener("submit", (e) => {
    e.preventDefault();

    updateUserInfo();
  });
}

// Update user password
if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    updateUserPassword();
  });
}

// Add new Job
if (jobForm) {
  jobForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addJob();
  });
}

// Delete a job
if (deleteJob) {
  deleteJob.addEventListener("click", deleteJobFunc);
}

// Delete Interview
if (deleteInterview) {
  deleteInterview.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Get current card of interview to be deleted
      const card = btn.parentElement.parentElement.parentElement;

      deleteInterviewFunc(card);
    });
  });
}
