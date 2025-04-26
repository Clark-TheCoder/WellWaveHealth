const contactForm = document.getElementById("contact_form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phoneNumber = document.getElementById("patientPhoneNum").value;
  const email = document.getElementById("patientEmail").value;
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("/call/contact_patient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ phoneNumber, email }),
    });

    const body = await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
});
