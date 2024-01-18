import axios from "axios";
import { showAlert } from "./alerts";

// Target the input fields for email, first name and last name
const email = document.querySelector("#email");
const firstName = document.querySelector("#first-Name");
const lastName = document.querySelector("#lastName");

// Initialize th previous values of email, first name and last name
let prevEmail;
let prevFirstName;
let prevLastName;

// If email, first name and last name are present collect initial values
if ((email, firstName, lastName)) {
  prevEmail = email.value;
  prevFirstName = firstName.value;
  prevLastName = lastName.value;
}

// Check if an object is empty
const isEmpty = (obj) => Object.keys(obj).length === 0;

// Update user information
export const updateUserInfo = async () => {
  // Intialize a form to collect data to be passed to the database
  const form = {};

  // If values are present add the respective fields and values to the form
  if (email.value !== prevEmail) form.email = email.value;
  if (firstName.value !== prevFirstName) form.firstName = firstName.value;
  if (lastName.value !== prevLastName) form.lastName = lastName.value;

  // If form is empty return
  if (isEmpty(form)) return;

  try {
    // Make an axios patch request
    const response = await axios.patch("api/v1/users/updateme", form);

    // If successful show alert
    if (response.data.status === "success") {
      showAlert("success", "Account updated successfully!");

      // Reset prev of email, first name and last name to the updated values
      prevEmail = email.value;
      prevFirstName = firstName.value;
      prevLastName = lastName.value;
    }
  } catch (err) {
    // Show alert if there is an error
    showAlert("error", err.response.data.message);
  }
};

// Update user password
export const updateUserPassword = async () => {
  // Target the password, new password, confirm password fields
  const currentPassword = document.querySelector("#password-current");
  const newPassword = document.querySelector("#new-password");
  const confirmPassword = document.querySelector("#password-confirm");

  // Initialize the form object
  const form = {};

  // Get values from the password fields
  form.passwordCurrent = currentPassword.value;
  form.password = newPassword.value;
  form.passwordConfirm = confirmPassword.value;

  try {
    // Make an axios patch request
    const response = await axios.patch("api/v1/users/updatemypassword", form);

    // If successful show alert
    if (response.data.status === "success") {
      showAlert("success", "Password updated successfully!");
    }
  } catch (err) {
    // If error show alert for error
    showAlert("error", err.response.data.message);
  }
  // Empty the password fields
  currentPassword.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
};
