import { toggleAudio } from "./functionality/media_settings/toggle_audio.js";
import { toggleCamera } from "./functionality/media_settings/toggle_camera.js";

window.onload = async function () {
  const cameraSettings = sessionStorage.getItem("cameraState");
  if (cameraSettings === "true") {
    await toggleCamera();
  }
  const audioSettings = sessionStorage.getItem("audioState");
  if (audioSettings === "true") {
    console.log("turn audio on");
  }
};
