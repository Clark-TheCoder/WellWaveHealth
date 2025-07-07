const firstnameInput = document.getElementById("firstname");
const lastnameInput = document.getElementById("lastname");
const positionInput = document.getElementById("position");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error_message_div");
const errorMesageText = document.getElementById("error_message");

export async function handleSignupSubmit(e) {
  e.preventDefault();

  const firstname = firstnameInput.value.trim();
  const lastname = lastnameInput.value.trim();
  const position = positionInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    const response = await fetch("/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname, lastname, position, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/home";
    } else {
      errorMessage.style.display = "flex";
      errorMesageText.textContent = data.message;
    }
  } catch (error) {
    console.error("Signup error:", error);
    // Optional: redirect to 404 or show a dedicated error UI
  }
}
