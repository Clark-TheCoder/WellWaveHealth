const firstNameInput = document.getElementById("firstname");
const dayOfBirthInput = document.getElementById("dayOfBirth");
const submitButton = document.getElementById("submit_button");

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
      console.log(data.message);
    }
  } catch (error) {
    console.log("Cannot get to backend");
  }
});
