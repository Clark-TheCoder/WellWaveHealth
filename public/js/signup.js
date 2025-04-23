const signupForm = document.getElementById("signup_form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const position = document.getElementById("position").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

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
