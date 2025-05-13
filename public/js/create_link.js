const firstNameInput = document.getElementById("firstname");
const dayOfBirthInput = document.getElementById("dayOfBirth");
const submitButton = document.getElementById("submit_button");
const linkInput = document.getElementById("link");
const errorMessage = document.getElementById("error_message_div");
const errorMesageText = document.getElementById("error_message");
const sendLinkTitle = document.getElementById("sub_title_container");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const sendButton = document.getElementById("send_button");

firstNameInput.addEventListener("input", validateForm);
dayOfBirthInput.addEventListener("input", validateForm);

function validateForm() {
  const firstName = firstNameInput.value;
  const dayOfBirth = dayOfBirthInput.value;

  if (!firstName || !dayOfBirth) {
    submitButton.disabled = true;
    submitButton.classList.remove("active_button");
    submitButton.classList.add("inactive_button");
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove("inactive_button");
    submitButton.classList.add("active_button");
  }
}

const createLinkForm = document.getElementById("createLink_form");
createLinkForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstname = firstNameInput.value;
  const dayOfBirth = dayOfBirthInput.value;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("/call/create_link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstname, dayOfBirth }),
    });

    const data = await response.json();
    if (response.ok) {
      linkInput.value = data.link;
      sendLinkTitle.style.backgroundColor = "#2184a3";
      email.disabled = false;
      phone.disabled = false;
      sendButton.classList.remove("inactive_button");
      sendButton.classList.add("active_button");
      sendButton.addEventListener("submit", sendPatientLink);
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


sendPatientLink(){
  
}
