import { validateValues } from "./formValidator.js";
import { handleEditUserSubmit } from "./formSubmitHandler.js";

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("input", validateValues);
});

const selects = document.querySelectorAll("select");
selects.forEach((select) => {
  select.addEventListener("change", validateValues);
});

const editUserForm = document.getElementById("editUser_form");
editUserForm.addEventListener("submit", handleEditUserSubmit);
