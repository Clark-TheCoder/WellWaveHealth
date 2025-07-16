import { audioSettings } from "../../../../utils/media/preCall_toggle_audio.js";
import { cameraSettings } from "../../../../utils/media/preCall_toggle_camera.js";
import { deactivateAudio } from "../../../utils/media/audioSettings.js";
import { deactivateCamera } from "../../../utils/media/cameraSettings.js";
import { setupCallControls } from "../functionality/general/button_functionality.js";
import { turnMicOn } from "../functionality/media_settings/inCall_toggle_audio.js";
import { turnCameraOn } from "../functionality/media_settings/inCall_toggle_camera.js";
import { patientStatus } from "../index.js";

const precallOverlay = document.getElementById("pc_page_overlay");
const precallPopup = document.getElementById("pc_popup");
const callUI = document.getElementById("call_ui");
const videoPreview = document.getElementById("video_preview");
const patientAudio = document.getElementById("patient_audio");

export async function joinCall() {
  precallOverlay.style.display = "none";
  precallPopup.style.display = "none";
  callUI.style.display = "flex";

  //change this to add the deactivation of the pre call audio before the patient enters the call
  await deactivateCamera(videoPreview);

  if (audioSettings.enabled === true) {
    await turnMicOn();
  } else {
    sessionStorage.setItem("audioState", "false");
  }

  if (cameraSettings.enabled === true) {
    await turnCameraOn();
  } else {
    sessionStorage.setItem("cameraState", "false");
  }

  setupCallControls();
  patientStatus.status = "joined";
}
