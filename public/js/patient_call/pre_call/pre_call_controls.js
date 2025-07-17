import { toggleAudioSettings } from "../../../utils/media/preCall_toggle_audio.js";
import { toggleCameraSettings } from "../../../utils/media/preCall_toggle_camera.js";
import { joinCall } from "./join_call.js";

export function setupPreCallControls() {
  // Camera controls (unchanged)
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
  }

  // Audio controls — NO hidden audio element anymore
  const audioImage = document.getElementById("audio_image");
  const audioButton = document.getElementById("audio_button");

  if (audioButton) {
    audioButton.addEventListener("click", () =>
      toggleAudioSettings(audioButton, audioImage)
    );
  }

  // Join call button
  const joinButton = document.getElementById("join_call_button");
  if (joinButton) {
    joinButton.addEventListener("click", joinCall);
  }
}
