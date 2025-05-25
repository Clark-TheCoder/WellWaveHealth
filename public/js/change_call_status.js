const changeStatusButton = document
  .querySelectorAll(".changeStatus_button")
  .forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const value = button.dataset.callStatus;
      console.log("Sending value:", value);
      try {
        const response = await fetch("/call/change_call_status", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ value }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("hi");
        } else {
          console.log("bad");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    });
  });
