import { audioSettings } from "../../../../utils/media/preCall_toggle_audio.js";
import { cameraSettings } from "../../../../utils/media/preCall_toggle_camera.js";
import { deactivateAudio } from "../../../utils/media/audioSettings.js";
import { deactivateCamera } from "../../../utils/media/cameraSettings.js";
import { showCallUI } from "../functionality/general/incall_ui.js";
import { hidePreCallPopup } from "../functionality/general/pre_call_ui.js";
import { turnMicOn } from "../functionality/media_settings/inCall_toggle_audio.js";
import { turnCameraOn } from "../functionality/media_settings/inCall_toggle_camera.js";

const precallOverlay = document.getElementById("pc_page_overlay");
const precallPopup = document.getElementById("pc_popup");
const callUI = document.getElementById("call_ui");

export async function joinCall() {
  hidePreCallPopup();
  showCallUI();

  const preCallVideo = document.getElementById("video_preview");
  const preCallAudio = document.getElementById("precall_audio");

  await deactivateCamera(preCallVideo);
  await deactivateAudio(preCallAudio);
  preCallAudio?.remove();

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
    console.error("Failed to load button functionality:", error);
  }
}
