const showPasswordBox = document.querySelector(".show-password");
const passwordInputs = document.querySelectorAll(".password");
const password = document.querySelector("#password");

showPasswordBox.addEventListener("click", function () {
  if (passwordInputs) {
    passwordInputs.forEach((n) => {
      if (n.type === "password") {
        n.setAttribute("type", "text");
      } else {
        n.setAttribute("type", "password");
      }
    });
  }

  if (password) {
    if (password.type === "password") {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  }
});
