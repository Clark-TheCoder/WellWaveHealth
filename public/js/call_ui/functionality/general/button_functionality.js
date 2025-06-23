import { toggleAudio } from "../media_settings/toggle_audio.js";
import { toggleCamera } from "../media_settings/toggle_camera.js";

const cameraButton = document.getElementById("camera_button");
const audioButton = document.getElementById("audio_button");

cameraButton.addEventListener("click", async () => {
  await toggleCamera();
});

audioButton.addEventListener("click", async () => {
  await toggleAudio();
});
