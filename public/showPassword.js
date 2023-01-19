const showPasswordBox = document.querySelector(".show-password");
const passwordInputs = document.querySelectorAll(".password");

showPasswordBox.addEventListener("click", function () {
  passwordInputs.forEach((n) => {
    if (n.type === "password") {
      n.setAttribute("type", "text");
    } else {
      n.setAttribute("type", "password");
    }
  });
});
