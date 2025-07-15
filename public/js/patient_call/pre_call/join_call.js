import { audioSettings } from "../../../../utils/media/preCall_toggle_audio.js";
import { cameraSettings } from "../../../../utils/media/preCall_toggle_camera.js";
import { turnMicOn } from "../functionality/media_settings/inCall_toggle_audio.js";
import { turnCameraOn } from "../functionality/media_settings/inCall_toggle_camera.js";

const precallOverlay = document.getElementById("pc_page_overlay");
const precallPopup = document.getElementById("pc_popup");
const callUI = document.querySelector(".call_ui");

// const providerAudio = document.getElementById("provider_audio");
// const audioIcon = document.getElementById("volume_image");

export async function joinCall() {
  precallOverlay.style.display = "none";
  precallPopup.style.display = "none";
  callUI.style.display = "flex";

  if (audioSettings.enabled === true) {
    await turnMicOn();
  }

  if (cameraSettings.enabled === true) {
    await turnCameraOn();
  }

  try {
    const module = await import(
      "../functionality/general/button_functionality.js"
    );
    module.setupCallControls();
  } catch (error) {
    /***custom error message */
    console.error("Failed to load button functionality:", error);
  }

  patientStatus.status = "joined";
}
