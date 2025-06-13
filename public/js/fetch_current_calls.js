import { createCallCard, showNoCallsMessage } from "./call_ui/index.js";

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

//pre call popup functionality
// const preCallPopup = document.getElementById("pc_popup");
// const preCallOverlay = document.getElementById("pc_page_overlay");
// const cancelCallButton = document.getElementById("cancel_call_button");
// const joinCallButton = document.getElementById("join_call_button");
// const cameraButton = document.getElementById("camera_button");
// const audioButton = document.getElementById("audio_button");
// const videoPreview = document.getElementById("video_preview");
// const cameraPlaceholder = document.getElementById("camera_icon");

// function showPreCallPopup(call) {
//   preCallPopup.style.display = "flex";
//   const callLabel = preCallPopup.querySelector("#pc_popup h2");
//   callLabel.innerHTML =
//     "Would you like to join this call with " + call.patient_alias + "?";
//   preCallOverlay.style.display = "block";
//   const videoStream = videoPreview.srcObject;
//   const newJoinButton = joinCallButton.cloneNode(true);
//   joinCallButton.parentNode.replaceChild(newJoinButton, joinCallButton);
//   newJoinButton.addEventListener("click", () => joinCall(call, videoStream));
// }

// cameraButton.addEventListener("click", toggleCameraSettings);
// async function toggleCameraSettings() {
//   if (cameraButton.classList.contains("selected")) {
//     await deactivateCamera(videoPreview);
//     cameraButton.classList.remove("selected");
//     cameraPlaceholder.style.display = "flex";
//     videoPreview.srcObject = null;
//     videoPreview.style.display = "none";
//   } else {
//     videoPreview.srcObject = await activateCamera();
//     videoPreview.style.display = "block";
//     cameraButton.classList.add("selected");
//     cameraPlaceholder.style.display = "none";
//   }
// }

// audioButton.addEventListener("click", toggleAudioSettings);
// async function toggleAudioSettings() {
//   if (audioButton.classList.contains("selected")) {
//     await deactivateAudio(audio);
//     audioButton.classList.remove("selected");
//     audioImage.src = "/media/images/mute.png";
//   } else {
//     audio.srcObject = await activateAudio();
//     audioButton.classList.add("selected");
//     audioImage.src = "/media/images/audio.png";
//   }
// }

// cancelCallButton.addEventListener("click", cancelJoinCallAction);
// function cancelJoinCallAction() {
//   preCallPopup.style.display = "none";
//   preCallOverlay.style.display = "none";
//   deactivateCamera(videoPreview);
//   cameraButton.classList.remove("selected");
//   cameraPlaceholder.style.display = "flex";
//   videoPreview.srcObject = null;
//   videoPreview.style.display = "none";
//   deactivateAudio(audio);
//   audioButton.classList.remove("selected");
//   audioImage.src = "/media/images/mute.png";
// }

// joinCallButton.addEventListener("click", joinCall(call));

// cameraButton.addEventListener("click", toggleCameraSettings);
// function toggleCameraSettings() {
//   if (cameraButton.classList.contains("selected")) {
//     deactivateCamera();
//   } else {
//     activateCamera();
//   }
// }

// async function activateCamera() {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoPreview.srcObject = stream;
//     videoPreview.style.display = "block";
//     //disable off camera display
//     cameraButton.classList.add("selected");
//     cameraPlaceholder.style.display = "none";
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }
// function deactivateCamera() {
//   cameraButton.classList.remove("selected");
//   cameraPlaceholder.style.display = "flex";
//   let stream = videoPreview.srcObject;
//   if (stream) {
//     stream.getTracks().forEach((track) => track.stop());
//   }
//   videoPreview.srcObject = null;
//   videoPreview.style.display = "none";
// }

// async function activateAudio() {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     audio.srcObject = stream;
//     audioButton.classList.add("selected");
//     audioImage.src = "/media/images/audio.png";
//   } catch (error) {
//     console.log("Mic access error:", error);
//   }
// }

// function deactivateAudio() {
//   const stream = audio.srcObject;
//   if (stream) {
//     stream.getTracks().forEach((track) => track.stop());
//     audio.srcObject = null;
//   }
//   audioButton.classList.remove("selected");
//   audioImage.src = "/media/images/mute.png";
// }
