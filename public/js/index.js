import "core-js/actual";

import { login } from "./login";
import showPassword from "./showPassword";
import hamburgerMenu from "./hamburgerMenu";

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const showPasswordBox = document.querySelector(".show-password");
const passwordInputs = document.querySelectorAll(".password");
const loginForm = document.querySelector(".form-login");

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
