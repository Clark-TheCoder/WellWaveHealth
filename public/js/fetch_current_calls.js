import { changeCallStatus } from "./change_call_status.js";

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

function showNoCallsMessage(container) {
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
  container.appendChild(noCallsDiv);
}

function createCallCard(call) {
  const callDiv = document.createElement("div");
  callDiv.classList.add("call");

  const callLabel = document.createElement("h1");
  callLabel.textContent = call.patient_alias;
  callDiv.appendChild(callLabel);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("call_buttons_div");

  if (call.status === "generated") {
    callDiv.style.backgroundColor = "#00a9a7";
    buttonDiv.appendChild(createJoinButton(call));
    buttonDiv.appendChild(createChartButton(call));
    buttonDiv.appendChild(createCancelButton(call));
  } else if (call.status === "completed-not-charted") {
    callDiv.style.backgroundColor = "#a4a4a4";
    buttonDiv.appendChild(createChartButton(call));
  }

  callDiv.appendChild(buttonDiv);
  return callDiv;
}

function createJoinButton(call) {
  const joinButton = document.createElement("button");
  joinButton.classList.add("button");
  joinButton.textContent = "Join Call";
  // Add logic as needed
  return joinButton;
}

function createChartButton(call) {
  const chartButton = document.createElement("button");
  chartButton.classList.add("button");
  chartButton.textContent = "Chart";
  chartButton.addEventListener("click", () => {
    console.log("Send to visitSummary page.");
    if (!call.access_token) {
      console.log("No access token, need to put something here for this.");
    } else {
      sessionStorage.setItem("accessToken", call.access_token);
      window.location.href = "/call/visit_summary";
    }
  });
  return chartButton;
}

function createCancelButton(call) {
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("button");
  cancelButton.textContent = "Cancel Call";
  cancelButton.addEventListener("click", () => {
    showCancelPopup(call);
  });
  return cancelButton;
}

function showCancelPopup(call) {
  const popup = document.getElementById("popup");
  const pageOverlay = document.getElementById("page_overlay");
  popup.style.display = "block";
  popup.querySelector("h1").textContent = "Are you sure you want to cancel?";
  pageOverlay.style.display = "block";

  const undoButton = document.getElementById("undo_button");
  const continueButton = document.getElementById("continue_button");

  const newUndo = undoButton.cloneNode(true);
  undoButton.parentNode.replaceChild(newUndo, undoButton);
  newUndo.addEventListener("click", () => {
    popup.style.display = "none";
    pageOverlay.style.display = "none";
  });

  const newContinue = continueButton.cloneNode(true);
  continueButton.parentNode.replaceChild(newContinue, continueButton);
  newContinue.addEventListener("click", async () => {
    await changeCallStatus("cancelled_by_patient", call.access_token);
    window.location.reload();
  });
}
