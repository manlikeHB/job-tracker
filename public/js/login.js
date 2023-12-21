import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    const response = await axios.post("api/v1/users/login", {
      email,
      password,
    });

    if (response.data.status === "success") {
      showAlert("success", "Logged in successfully!!");
      window.setTimeout(() => {
        location.assign("/overview");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
