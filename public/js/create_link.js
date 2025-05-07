const createLinkForm = document.getElementById("createLink_form");

createLinkForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const patientFirstname = document.getElementById("patientFirstname").value;
  const patientDayOfBirth = document.getElementById("patientDayOfBirth").value;

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("/call/create_link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ patientFirstname, patientDayOfBirth }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data);
    } else {
      console.log("bad");
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
});
