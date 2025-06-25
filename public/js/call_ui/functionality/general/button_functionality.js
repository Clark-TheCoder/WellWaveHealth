import { toggleAudio } from "../media_settings/toggle_audio.js";
import { toggleCamera } from "../media_settings/toggle_camera.js";
import { endCallPopup } from "./endCallPopup.js";

const cameraButton = document.getElementById("camera_button");
const audioButton = document.getElementById("audio_button");
const endCallButton = document.getElementById("end_call_button");

cameraButton.addEventListener("click", async () => {
  await toggleCamera();
});

audioButton.addEventListener("click", async () => {
  await toggleAudio();
});

endCallButton.addEventListener("click", async () => {
  await endCallPopup();
});
