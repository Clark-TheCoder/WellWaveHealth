import { validateForm } from "./formValidator.js";
import { handleFormSubmit } from "./formSubmitHandler.js";

const firstNameInput = document.getElementById("firstname");
const dayOfBirthInput = document.getElementById("dayOfBirth");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const createLinkForm = document.getElementById("createLink_form");

[firstNameInput, dayOfBirthInput, emailInput, phoneInput].forEach((input) => {
  input.addEventListener("input", validateForm);
});

createLinkForm.addEventListener("submit", handleFormSubmit);
