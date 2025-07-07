import { setupCallControls } from "./functionality/general/button_functionality.js";
import { setupSidebarToggle } from "./functionality/general/sidebar_functionality.js";
import {
  toggleAudio,
  turnMicOn,
  turnMicOff,
} from "./functionality/media_settings/inCall_toggle_audio.js";
import {
  toggleCamera,
  turnCameraOff,
  turnCameraOn,
} from "./functionality/media_settings/inCall_toggle_camera.js";

document.addEventListener("DOMContentLoaded", async () => {
  // UI functionality
  setupSidebarToggle();
  setupCallControls();

  // Restore media settings
  const cameraSettings = sessionStorage.getItem("cameraState");
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
});
