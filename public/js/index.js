import "core-js/actual";

import { login } from "./login";
import showPassword from "./showPassword";
import hamburgerMenu from "./hamburgerMenu";
import performSearch from "./search";

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const showPasswordBox = document.querySelector(".show-password");
const passwordInputs = document.querySelectorAll(".password");
const loginForm = document.querySelector(".form-login");
const searchGlass = document.querySelector(".search-glass");
const searchInput = document.querySelector("#search");

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
