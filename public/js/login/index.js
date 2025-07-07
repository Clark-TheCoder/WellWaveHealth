import { checkInputs } from "./formValidator.js";
import { handleLoginSubmit } from "./formSubmitHandler.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginForm = document.getElementById("login_form");

emailInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);

loginForm.addEventListener("submit", handleLoginSubmit);
