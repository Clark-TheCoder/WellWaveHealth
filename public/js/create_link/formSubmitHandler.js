const firstNameInput = document.getElementById("firstname");
const dayOfBirthInput = document.getElementById("dayOfBirth");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const submitButton = document.getElementById("submit_button");
const errorMessage = document.getElementById("error_message_div");
const errorMessageText = document.getElementById("error_message");
const popup = document.getElementById("popup");
const pageOverlay = document.getElementById("page_overlay");

export async function handleFormSubmit(event) {
  event.preventDefault();

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

      popup.style.display = "block";
      popup.querySelector("h1").textContent = data.message;
      pageOverlay.style.display = "block";

      const closeButton = document.getElementById("close_button");
      closeButton.addEventListener("click", () => {
        popup.style.display = "none";
        pageOverlay.style.display = "none";

        firstNameInput.value = "";
        dayOfBirthInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
      });
    } else {
      errorMessage.style.display = "flex";
      errorMessageText.textContent =
        data.message ||
        "Cannot generate link at this time. Sign back in and try again.";
    }
  } catch (error) {
    console.error("Cannot reach backend:", error);
  }
}
