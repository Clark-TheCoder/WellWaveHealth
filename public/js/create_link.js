const createLinkBtn = document.getElementById("createLinkBtn");

createLinkBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  try {
    const response = await fetch("/call/create_link", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
});
