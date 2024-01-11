import axios from "axios";
import { showAlert } from "./alerts";

export default signUp = async (
  lastName,
  firstName,
  email,
  password,
  passwordConfirm
) => {
  console.log(lastName, firstName, email, password, passwordConfirm);

  try {
    const response = await axios.post("api/v1/users/signup", {
      lastName,
      firstName,
      email,
      password,
      passwordConfirm,
    });

    if (response.data.status === "success") {
      showAlert("success", "SignUp successful!!");
      window.setTimeout(() => {
        location.assign("/overview");
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data);
    showAlert("error", err.response.data.message);
  }
};
