import { validateValues } from "./formValidator.js";
import { handleSignupSubmit } from "./formSubmitHandler.js";

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("input", validateValues);
});

const selects = document.querySelectorAll("select");
selects.forEach((select) => {
  select.addEventListener("change", validateValues);
});

const signupForm = document.getElementById("signup_form");
signupForm.addEventListener("submit", handleSignupSubmit);
