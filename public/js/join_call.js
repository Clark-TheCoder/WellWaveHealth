// const preCallPopup = document.getElementById("pc_popup");
// const preCallOverlay = document.getElementById("pc_page_overlay");
// const cancelCallButton = document.getElementById("cancel_call_button");
// const joinCallButton = document.getElementById("join_call_button");
// const cameraButton = document.getElementById("camera_button");
// const audioButton = document.getElementById("audio_button");
// const videoPreview = document.getElementById("video_preview");
// const cameraPlaceholder = document.getElementById("camera_icon");

// function showPreCallPopup(patientAlias) {
//   preCallPopup.style.display = "flex";
//   const callLabel = preCallPopup.querySelector("#pc_popup h2");
//   callLabel.innerHTML =
//     "Would you like to join this call with " + patientAlias + "?";
//   preCallOverlay.style.display = "block";
// }

// cancelCallButton.addEventListener("click", cancelJoinCallAction);
// function cancelJoinCallAction() {
//   preCallPopup.style.display = "none";
//   preCallOverlay.style.display = "none";
//   deactivateCamera();
// }

// cameraButton.addEventListener("click", toggleCameraSettings);
// function toggleCameraSettings() {
//   if (cameraButton.classList.contains("selected")) {
//     deactivateCamera();
//   } else {
//     activateCamera();
//   }
// }
// function activateCamera() {
//   cameraButton.classList.add("selected");
//   cameraPlaceholder.style.display = "none";
// }
// function deactivateCamera() {
//   cameraButton.classList.remove("selected");
//   cameraPlaceholder.style.display = "flex";
// }

// function enterCall() {}

export async function joinCall(call) {
  try {
    let response = await fetch("/call/join/doctor", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ accessToken: call.access_token }),
    });
    const data = await response.json();
    if (response.ok) {
      showPreCallPopup(call.patient_alias);
      //should show this popup first then call the fetch, otherwise the call will
      //be changed to in-progress, and even when you cancel on the pre call popup
      //if will remain in-progress
    } else {
      console.log("no");
    }
  } catch (error) {
    console.error("Join call error:", error);
  }
}
