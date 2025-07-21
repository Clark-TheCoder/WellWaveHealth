import { toggleAudioSettings } from "../../../utils/media/preCall_toggle_audio.js";
import {
  cameraSettings,
  toggleCameraSettings,
} from "../../../utils/media/preCall_toggle_camera.js";
import { joinCall } from "./join_call.js";

export function setupPreCallControls() {
  const cameraImage = document.getElementById("camera_image");
  const cameraButton = document.getElementById("camera_button");
  const videoPreview = document.getElementById("video_preview");
  const cameraPlaceholder = document.getElementById("camera_icon");

  if (cameraButton) {
    cameraButton.addEventListener("click", () =>
      toggleCameraSettings(
        cameraButton,
        cameraImage,
        videoPreview,
        cameraPlaceholder
      )
    );
    cameraButton.dataset.listenerAdded = "true";
  }

  const audioImage = document.getElementById("audio_image");
  const audioButton = document.getElementById("audio_button");

  if (audioButton) {
    audioButton.addEventListener("click", () =>
      toggleAudioSettings(audioButton, audioImage)
    );
    audioButton.dataset.listenerAdded = "true";
  }

  const joinButton = document.getElementById("join_call_button");
  if (joinButton) {
    joinButton.addEventListener("click", joinCall);
    joinButton.dataset.listenerAdded = "true";
  }
}
