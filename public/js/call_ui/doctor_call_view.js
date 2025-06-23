import {
  toggleAudio,
  turnMicOn,
  turnMicOff,
} from "./functionality/media_settings/toggle_audio.js";
import {
  toggleCamera,
  turnCameraOff,
  turnCameraOn,
} from "./functionality/media_settings/toggle_camera.js";

window.onload = async function () {
  console.log(sessionStorage);
  const cameraSettings = sessionStorage.getItem("cameraState");
  //camera settings
  if (cameraSettings === "true") {
    await turnCameraOn();
  } else {
    await turnCameraOff();
  }
  const audioSettings = sessionStorage.getItem("audioState");
  if (audioSettings === "true") {
    await turnMicOn();
  } else {
    await turnMicOff();
  }
};
