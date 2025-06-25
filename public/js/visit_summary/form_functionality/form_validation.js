const submitButton = document.getElementById("submit_button");

export function validateForm() {
  submitButton.disabled = false;
  submitButton.classList.add("active_button");
  submitButton.classList.remove("inactive_button");
}
