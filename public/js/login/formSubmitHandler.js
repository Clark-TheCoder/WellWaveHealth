const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit_button");
const errorMessage = document.getElementById("error_message_div");
const errorMessageText = document.getElementById("error_message");

export async function handleLoginSubmit(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/home";
    } else {
      errorMessage.style.display = "flex";
      errorMessageText.textContent =
        data.message || "Login failure. Please try again.";
    }
  } catch (error) {
    console.error("Login request failed:", error);
    // You can optionally redirect to a 404 or error page
  }
}
