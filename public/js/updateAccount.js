import axios from "axios";
import { showAlert } from "./alerts";

// Target the input fields for email, first name and last name
const email = document.querySelector("#email");
const firstName = document.querySelector("#first-Name");
const lastName = document.querySelector("#lastName");
const avatar = document.querySelector("#avatar");
const SaveInfoBtn = document.querySelector(".save-user-info-btn");

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

// Check if a FormData is empty
const formIsEmpty = (formData) => {
  // Use the FormData API's entries() method to get an iterator for key-value pairs
  const entries = formData.entries();

  // Use the iterator's .next() method to check if there is at least one entry
  const firstEntry = entries.next().value;

  // If the first entry is undefined, the FormData is empty
  return firstEntry === undefined;
};

// Update user information
export const updateUserInfo = async () => {
  // Intialize a form to collect data to be passed to the database
  const form = new FormData();

  // If values are present add the respective fields and values to the form
  if (email.value !== prevEmail) form.append("email", email.value);
  if (firstName.value !== prevFirstName)
    form.append("firstName", firstName.value);
  if (lastName.value !== prevLastName) form.append("lastName", lastName.value);
  if (avatar.files[0]) form.append("photo", avatar.files[0]);

  // If form is empty return
  if (formIsEmpty(form)) return;

  // Change button text content while saving
  SaveInfoBtn.textContent = "Saving info...";

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
      avatar.value = "";

      // If profile photo is updated, reload page
      form.has("photo") &&
        window.setTimeout(() => {
          location.reload();
        }, 1500);
    }
  } catch (err) {
    // Show alert if there is an error
    showAlert("error", err.response.data.message);
  }

  // Change button text content when done saving
  SaveInfoBtn.textContent = "Save settings";
};

// Update user password
export const updateUserPassword = async () => {
  // Target the password, new password, confirm password fields
  const currentPassword = document.querySelector("#password-current");
  const newPassword = document.querySelector("#new-password");
  const confirmPassword = document.querySelector("#password-confirm");
  const SavePassswordBtn = document.querySelector(".save-user-password-btn");

  // Change button text content while saving
  SavePassswordBtn.textContent = "Saving Password...";

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

  // Change button text content when done saving
  SavePassswordBtn.textContent = "Save password";
};
