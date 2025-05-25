const firstNameInput = document.getElementById("firstname");
const dayOfBirthInput = document.getElementById("dayOfBirth");
const submitButton = document.getElementById("submit_button");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const errorMessage = document.getElementById("error_message_div");
const errorMesageText = document.getElementById("error_message");

firstNameInput.addEventListener("input", validateForm);
dayOfBirthInput.addEventListener("input", validateForm);
emailInput.addEventListener("input", validateForm);
phoneInput.addEventListener("input", validateForm);

function validateForm() {
  const firstName = firstNameInput.value.trim();
  const dayOfBirth = dayOfBirthInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  // First name should only have letters, spaces, apostrophes, or hyphens
  const nameIsValid = /^[a-zA-Z\s'-]+$/.test(firstName);

  // Day of birth must be a number between 1 and 31
  const day = parseInt(dayOfBirth, 10);
  const dayIsValid =
    /^\d+$/.test(dayOfBirth) && !isNaN(day) && day >= 1 && day <= 31;

  // Email and phone validation
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneIsValid = /^\+?[0-9]{10,15}$/.test(phone);

  const emailInvalid = email && !emailIsValid;
  const phoneInvalid = phone && !phoneIsValid;
  const anyInvalid = emailInvalid || phoneInvalid;

  // At least one valid contact method
  const contactInfo = (email && emailIsValid) || (phone && phoneIsValid);

  const isValid = nameIsValid && dayIsValid && contactInfo && !anyInvalid;

  if (isValid) {
    submitButton.disabled = false;
    submitButton.classList.remove("inactive_button");
    submitButton.classList.add("active_button");
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove("active_button");
    submitButton.classList.add("inactive_button");
  }
}

const createLinkForm = document.getElementById("createLink_form");
createLinkForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstname = firstNameInput.value;
  const dayOfBirth = dayOfBirthInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;

  try {
    const response = await fetch("/call/create_link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ firstname, dayOfBirth, email, phone }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.link);
      submitButton.disabled = true;
      const popup = document.getElementById("popup");
      const pageOverlay = document.getElementById("page_overlay");
      popup.style.display = "block";
      popup.querySelector("h1").textContent = data.message;
      pageOverlay.style.display = "block";
    } else {
      errorMessage.style.display = "flex";
      errorMesageText.textContent =
        data.message ||
        "Cannot generate link at this time. Sign back in and try again.";
    }
  } catch (error) {
    console.log("Cannot get to backend");
  }
});
