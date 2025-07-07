const firstNameInput = document.getElementById("firstname");
const dayOfBirthInput = document.getElementById("dayOfBirth");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const submitButton = document.getElementById("submit_button");

export function validateForm() {
  const firstName = firstNameInput.value.trim();
  const dayOfBirth = dayOfBirthInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  const nameIsValid = /^[a-zA-Z\s'-]+$/.test(firstName);

  let dayIsValid = false;
  if (dayOfBirth === "") {
    dayOfBirthInput.style.border = "";
  } else if (!/^\d+$/.test(dayOfBirth)) {
    dayOfBirthInput.style.border = "3px solid rgb(196, 36, 36)";
  } else {
    const day = parseInt(dayOfBirth, 10);
    if (day < 1 || day > 31) {
      dayOfBirthInput.style.border = "3px solid rgb(196, 36, 36)";
    } else {
      dayIsValid = true;
      dayOfBirthInput.style.border = "";
    }
  }

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneIsValid = /^\+?[0-9]{10,15}$/.test(phone);

  emailInput.style.border =
    email && !emailIsValid ? "3px solid rgb(196, 36, 36)" : "";
  phoneInput.style.border =
    phone && !phoneIsValid ? "3px solid rgb(196, 36, 36)" : "";

  const contactInfo = (email && emailIsValid) || (phone && phoneIsValid);

  const isValid = nameIsValid && dayIsValid && contactInfo;

  submitButton.disabled = !isValid;
  submitButton.classList.toggle("active_button", isValid);
  submitButton.classList.toggle("inactive_button", !isValid);
}
