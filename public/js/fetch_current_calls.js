document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/call/scheduled_calls/loadCalls", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      const scheduledCallsDiv = document.getElementById("calls");
      scheduledCallsDiv.innerHTML = ""; // Clear previous content
      const calls = data.calls;

      if (calls.length === 0) {
        const noCallsDiv = document.createElement("div");
        noCallsDiv.classList.add("empty_calls_div");

        const noCallsMessage = document.createElement("h3");
        noCallsMessage.textContent =
          "No calls scheduled currently. To create a call select:";
        noCallsMessage.style.color = "rgb(196, 36, 36)";

        const scheduleCallButton = document.createElement("button");
        scheduleCallButton.textContent = "Create Call";
        scheduleCallButton.classList.add("button");
        scheduleCallButton.style.border = "3px solid #2184a3";

        noCallsDiv.appendChild(noCallsMessage);
        noCallsDiv.appendChild(scheduleCallButton);
        scheduledCallsDiv.appendChild(noCallsDiv);
      } else {
        calls.forEach((call) => {
          const callDiv = document.createElement("div"); // Move inside loop
          callDiv.classList.add("call");

          if (call.status === "generated") {
            callDiv.style.backgroundColor = "#00a9a7";
          } else if (call.status === "completed-not-charted") {
            callDiv.style.backgroundColor = "#a4a4a4";
          }

          const callLabel = document.createElement("h1");
          callLabel.textContent = call.patient_alias;
          callDiv.appendChild(callLabel);

          const buttonDiv = document.createElement("div");
          buttonDiv.classList.add("call_buttons_div");

          const joinButton = document.createElement("button");
          joinButton.classList.add("button");
          joinButton.textContent = "Join Call";

          const chartButton = document.createElement("button");
          chartButton.classList.add("button");
          chartButton.textContent = "Chart";

          const cancelButton = document.createElement("button");
          cancelButton.classList.add("button");
          cancelButton.textContent = "Cancel Call";

          buttonDiv.appendChild(joinButton);
          buttonDiv.appendChild(chartButton);
          buttonDiv.appendChild(cancelButton);

          callDiv.appendChild(buttonDiv);
          scheduledCallsDiv.appendChild(callDiv);
        });
      }
    } else {
      console.log("I am not okay");
    }
  } catch (error) {
    console.error("Failed to fetch scheduled calls:", error);
  }
});
