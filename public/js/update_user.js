const editUserForm = document.getElementById("editUser_form");

editUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const position = document.getElementById("position").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = {};
  if (firstname) userData.firstname = firstname;
  if (lastname) userData.lastname = lastname;
  if (position) userData.position = position;
  if (email) userData.email = email;
  if (password) userData.password = password;

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("/user/edit_user_details", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = response.json();
    if (response.ok) {
      console.log("hello");
    } else {
      console.log("bad");
    }
  } catch (error) {
    console.log("Error:", error);
  }
});
