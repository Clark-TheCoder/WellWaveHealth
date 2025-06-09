import { changeCallStatus } from "./change_call_status.js";
import { joinCall } from "./join_call.js";

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
  scheduleCallButton.classList.add("button");
  scheduleCallButton.style.border = "3px solid #2184a3";

  const scheduleCallLink = document.createElement("a");
  scheduleCallLink.textContent = "Create Call";
  scheduleCallLink.href = "/call/create_link";
  scheduleCallLink.style.textDecoration = "none";
  scheduleCallLink.style.color = "#2184a3";
  scheduleCallButton.appendChild(scheduleCallLink);

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
  } else if (call.status === "completed_not_charted") {
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
  console.log(call);
  joinButton.addEventListener("click", () => {
    showPreCallPopup(call.patient_alias);
    if (showCancelPopup) {
      joinCall(call);
    }
  });
  return joinButton;
}

function createChartButton(call) {
  const chartButton = document.createElement("button");
  chartButton.classList.add("button");
  chartButton.textContent = "Chart";
  chartButton.addEventListener("click", () => {
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

  // Clear old popup content
  popup.innerHTML = "";

  // Show overlay and popup
  pageOverlay.style.display = "block";
  popup.style.display = "block";

  // Title
  const title = document.createElement("h1");
  title.textContent = "Are you sure you want to cancel this call?";
  popup.appendChild(title);

  // Button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("popup-button-container");

  // Undo button
  const undoButton = document.createElement("button");
  undoButton.textContent = "Undo";
  undoButton.id = "undo_button";
  undoButton.addEventListener("click", () => {
    popup.style.display = "none";
    pageOverlay.style.display = "none";
  });

  // Continue button
  const continueButton = document.createElement("button");
  continueButton.textContent = "Continue";
  continueButton.id = "continue_button";
  continueButton.addEventListener("click", async () => {
    await changeCallStatus("cancelled_by_patient", call.access_token);
    window.location.reload();
  });

  // Add buttons to container
  buttonContainer.appendChild(undoButton);
  buttonContainer.appendChild(continueButton);

  // Add button container to popup
  popup.appendChild(buttonContainer);
}

//pre call popup functionality
const preCallPopup = document.getElementById("pc_popup");
const preCallOverlay = document.getElementById("pc_page_overlay");
const cancelCallButton = document.getElementById("cancel_call_button");
const joinCallButton = document.getElementById("join_call_button");
const cameraButton = document.getElementById("camera_button");
const audioButton = document.getElementById("audio_button");
const videoPreview = document.getElementById("video_preview");
const cameraPlaceholder = document.getElementById("camera_icon");

function showPreCallPopup(patientAlias) {
  preCallPopup.style.display = "flex";
  const callLabel = preCallPopup.querySelector("#pc_popup h2");
  callLabel.innerHTML =
    "Would you like to join this call with " + patientAlias + "?";
  preCallOverlay.style.display = "block";
}

cancelCallButton.addEventListener("click", cancelJoinCallAction);
function cancelJoinCallAction() {
  preCallPopup.style.display = "none";
  preCallOverlay.style.display = "none";
  deactivateCamera();
}

cameraButton.addEventListener("click", toggleCameraSettings);
function toggleCameraSettings() {
  if (cameraButton.classList.contains("selected")) {
    deactivateCamera();
  } else {
    activateCamera();
  }
}
function activateCamera() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      cameraButton.classList.add("selected");
      cameraPlaceholder.style.display = "none";
      videoPreview.srcObject = stream;
      videoPreview.style.display = "block";
    })
    .catch((err) => {
      console.error("Error accessing camera:", err);
    });
}
function deactivateCamera() {
  cameraButton.classList.remove("selected");
  cameraPlaceholder.style.display = "flex";
  let stream = videoPreview.srcObject;
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
  videoPreview.srcObject = null;
  videoPreview.style.display = "none";
}
