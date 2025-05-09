const firstnameInput = document.getElementById("firstname");
const lastnameInput = document.getElementById("lastname");
const positionInput = document.getElementById("position");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm_password");
const submitButton = document.getElementById("submit_button");

//add eventlistener to each field in the form
const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("input", validateValues);
});
const selects = document.querySelectorAll("select");
selects.forEach((select) => {
  select.addEventListener("change", validateValues);
});

function validateValues() {
  const firstname = firstnameInput.value;
  const lastname = lastnameInput.value;
  const position = positionInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (firstname || lastname || position || email) {
    if (password && password != confirmPassword) {
      submitButton.disabled = true;
      submitButton.classList.remove("active_button");
      submitButton.classList.add("inactive_button");
    }
    if (password && password === confirmPassword) {
      submitButton.disabled = false;
      submitButton.classList.remove("inactive_button");
      submitButton.classList.add("active_button");
    }
    if (!password) {
      submitButton.disabled = false;
      submitButton.classList.remove("inactive_button");
      submitButton.classList.add("active_button");
    }
  }
}

const editUserForm = document.getElementById("editUser_form");

editUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstname = firstnameInput.value;
  const lastname = lastnameInput.value;
  const position = positionInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  const body = {};
  if (firstname) body.firstname = firstname;
  if (lastname) body.lastname = lastname;
  if (email) body.email = email;
  if (position) body.position = position;
  if (password) body.password = password;

  const token = localStorage.getItem("token");

  try {
    const response = fetch("/user/edit_user_details", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ body }),
    });

    const data = await json.response();
    if (response.ok) {
      console.log("good");
    } else {
      console.log("bad");
    }
  } catch (error) {
    console.log("Cannot make this request to the backend at this time.");
  }
});
