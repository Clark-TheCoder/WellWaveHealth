import { toggleAudio } from "../media_settings/toggle_audio.js";
import { toggleCamera } from "../media_settings/toggle_camera.js";
import { endCallPopup } from "./endCall_functionality.js";

export function setupCallControls() {
  const cameraButton = document.getElementById("camera_button");
  const audioButton = document.getElementById("audio_button");
  const endCallButton = document.getElementById("end_call_button");

  if (cameraButton) {
    cameraButton.addEventListener("click", async () => {
      await toggleCamera();
    });
  }

  if (audioButton) {
    audioButton.addEventListener("click", async () => {
      await toggleAudio();
    });
  }

  if (endCallButton) {
    endCallButton.addEventListener("click", async () => {
      await endCallPopup();
    });
  }
}
