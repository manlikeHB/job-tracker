export default showPassword = (showPasswordBox, passwordInputs) => {
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
  });
};
