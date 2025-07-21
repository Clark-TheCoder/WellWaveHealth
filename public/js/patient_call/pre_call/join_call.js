import { audioSettings } from "../../../../utils/media/preCall_toggle_audio.js";
import { cameraSettings } from "../../../../utils/media/preCall_toggle_camera.js";
import { deactivateAudio } from "../../../utils/media/audioSettings.js";
import { deactivateCamera } from "../../../utils/media/cameraSettings.js";
import { setupCallControls } from "../functionality/general/button_functionality.js";
import { turnMicOn } from "../functionality/media_settings/inCall_toggle_audio.js";
import { turnCameraOn } from "../functionality/media_settings/inCall_toggle_camera.js";
import { setPatientStatus } from "../index.js";

const precallOverlay = document.getElementById("pc_page_overlay");
const precallPopup = document.getElementById("pc_popup");
const callUI = document.getElementById("call_ui");

export async function joinCall() {
  precallOverlay.style.display = "none";
  precallPopup.style.display = "none";

  callUI.style.display = "flex";

  await deactivateAudio();
  await deactivateCamera(document.getElementById("video_preview"));

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

  setPatientStatus("joined");
}
