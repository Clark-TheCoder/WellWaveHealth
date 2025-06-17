import { cameraSettings, toggleCameraSettings } from "./toggle_camera.js";
import { audioSettings, toggleAudioSettings } from "./toggle_audio.js";
import { deactivateCamera } from "../../../utils/cameraSettings.js";
import { deactivateAudio } from "../../../utils/audioSettings.js";
import { joinCall } from "../../join_call.js";

const preCallPopup = document.getElementById("pc_popup");
const preCallOverlay = document.getElementById("pc_page_overlay");

export function showPreCallPopup(call) {
  preCallPopup.style.display = "flex";
  const callLabel = preCallPopup.querySelector("#pc_popup h2");
  callLabel.innerHTML =
    "Would you like to join this call with " + call.patient_alias + "?";
  preCallOverlay.style.display = "block";
  // Replace the old event listener with a fresh one to avoid multiple bindings
  const joinCallButton = document.getElementById("join_call_button");
  const newJoinCallButton = joinCallButton.cloneNode(true);
  joinCallButton.parentNode.replaceChild(newJoinCallButton, joinCallButton);

  // Now attach the call-specific function
  newJoinCallButton.addEventListener("click", () =>
    joinCall(call, cameraSettings, audioSettings)
  );
}
//add functionality to the buttons on the pre call popup
//doing it here because it makes sense in my head and it
//avoids race conditions
const cameraImage = document.getElementById("camera_image");
const cameraButton = document.getElementById("camera_button");
const videoPreview = document.getElementById("video_preview");
const cameraPlaceholder = document.getElementById("camera_icon");
cameraButton.addEventListener("click", () =>
  toggleCameraSettings(
    cameraButton,
    cameraImage,
    videoPreview,
    cameraPlaceholder
  )
);

//create audio html element (can add this to the ejs file later to avoid making elements in here)
const audioImage = document.getElementById("audio_image");
const audio = document.createElement("audio");
audio.autoplay = true;
audio.style.display = "none";
document.body.appendChild(audio);

const audioButton = document.getElementById("audio_button");
audioButton.addEventListener("click", () =>
  toggleAudioSettings(audioButton, audioImage, audio)
);

//cancel the call
const cancelCallButton = document.getElementById("cancel_call_button");
cancelCallButton.addEventListener("click", cancelJoinCallAction);
export async function cancelJoinCallAction() {
  preCallPopup.style.display = "none";
  preCallOverlay.style.display = "none";
  await deactivateCamera(videoPreview);
  cameraButton.classList.remove("selected");
  cameraPlaceholder.style.display = "flex";
  videoPreview.srcObject = null;
  videoPreview.style.display = "none";
  await deactivateAudio(audio);
  audioButton.classList.remove("selected");
  audioImage.src = "/media/images/mute.png";
}
