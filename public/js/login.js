const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit_button");
const errorMessage = document.getElementById("error_message_div");
const errorMesageText = document.getElementById("error_message");

//activate submit button
emailInput.addEventListener("input", checkInputs);
passwordInput.addEventListener("input", checkInputs);
function checkInputs() {
  const email = emailInput.value;
  const password = passwordInput.value;
  if (email && password) {
    submitButton.disabled = false;
    submitButton.classList.remove("inactive_button");
    submitButton.classList.add("active_button");
  } else {
    submitButton.disabled = true;
    submitButton.classList.remove("active_button");
    submitButton.classList.add("inactive_button");
  }
}

//log in user
const loginForm = document.getElementById("login_form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/home";
    } else {
      errorMessage.style.display = "flex";
      errorMesageText.textContent =
        data.message || "Login failure. Please try again.";
    }
  } catch (error) {
    console.log("Error:", error);
    //create a 404 page
  }
});
