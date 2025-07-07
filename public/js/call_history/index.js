import { setupInputValidation } from "./validate_form.js";
import { handleSearchSubmit } from "./search_handler.js";

document.addEventListener("DOMContentLoaded", () => {
  setupInputValidation();
  handleSearchSubmit();
});
