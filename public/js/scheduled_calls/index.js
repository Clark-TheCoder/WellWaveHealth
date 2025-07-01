import { createCallCard } from "./call_card/create_call_card.js";
import { showNoCallsMessage } from "./call_card/show_no_calls_message.js";

// Load calls when page loads
document.addEventListener("DOMContentLoaded", loadScheduledCalls);

async function loadScheduledCalls() {
  try {
    const response = await fetch("/call/scheduled_calls/loadCalls", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();
    const scheduledCallsDiv = document.getElementById("calls");
    scheduledCallsDiv.innerHTML = "";

    if (!response.ok || !data.calls?.length) {
      showNoCallsMessage(scheduledCallsDiv);
    } else {
      data.calls.forEach((call) => {
        const callElement = createCallCard(call);
        scheduledCallsDiv.appendChild(callElement);
      });
    }
  } catch (error) {
    console.error("Failed to fetch scheduled calls:", error);
  }
}
