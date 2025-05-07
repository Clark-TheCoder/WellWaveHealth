const firstnameInput = document.getElementById("firstname");
const lastnameInput = document.getElementById("lastname");
const positionInput = document.getElementById("position");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm_password");
const submitBtn = document.getElementById("submit_button");

//add eventlistener to each field in the form
const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("input", validateValues);
});
const selects = document.querySelectorAll("select");
selects.forEach((select) => {
  select.addEventListener("change", validateValues);
});

//ensures all fields are filled out and password fields match
function validateValues() {
  const firstname = firstnameInput.value;
  const lastname = lastnameInput.value;
  const position = positionInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (
    confirmPassword === password &&
    password.length > 0 &&
    confirmPassword.length > 0
  ) {
    passwordInput.style.border = "3px solid green";
    confirmPasswordInput.style.border = "3px solid green";
  } else {
    passwordInput.style.border = "none";
    confirmPasswordInput.style.border = "none";
  }

  if (
    firstname &&
    lastname &&
    position &&
    email &&
    password &&
    confirmPassword === password
  ) {
    submitBtn.disabled = false;
    submitBtn.classList.remove("inactive_button");
    submitBtn.classList.add("active_button");
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove("active_button");
    submitBtn.classList.add("inactive_button");
  }
}

const signupForm = document.getElementById("signup_form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstname = firstnameInput.value;
  const lastname = lastnameInput.value;
  const position = positionInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, position, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      console.log("User data to be saved:", data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      //send to home
      window.location.href = "/home";
    } else {
      console.error("Invalid signup response:", data);
    }
  } catch (error) {
    console.log("Error:", error);
  }
});
