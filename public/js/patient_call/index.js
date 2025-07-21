import { setupCallControls } from "./functionality/general/button_functionality.js";
import { showEndCall } from "./functionality/general/endcall_ui.js";
import { showCallUI, hideCallUI } from "./functionality/general/incall_ui.js";
import { setupPreCallControls } from "./pre_call/pre_call_controls.js";
import { showPreCallPopup } from "./functionality/general/precall_ui.js";
import {
  hideWaitingRoom,
  showWaitingRoom,
} from "./functionality/general/waiting_ui.js";
import { pollCallStatus } from "./functionality/polling/poll_call_status.js";
import {
  hideLoadingScreen,
  showLoadingScreen,
} from "./functionality/general/loading_screen_ui.js";

let precallControlsInitiated = false;
let incallControlsInitiated = false;

export function setPatientStatus(status) {
  sessionStorage.setItem("patientStatus", status);
}

export function getPatientStatus() {
  return sessionStorage.getItem("patientStatus");
}

document.addEventListener("DOMContentLoaded", async () => {
  setPatientStatus(null);
  showLoadingScreen();

  pollCallStatus((status) => {
    const patientStatus = getPatientStatus();
    hideLoadingScreen();

    if (status === "generated") {
      showWaitingRoom();
    } else if (status === "in_progress" && patientStatus !== "joined") {
      hideWaitingRoom();
      showPreCallPopup();
      if (!precallControlsInitiated) {
        setupPreCallControls();
        precallControlsInitiated = true;
      }
    } else if (status === "in_progress" && patientStatus === "joined") {
      hideWaitingRoom();
      showCallUI();
      if (!incallControlsInitiated) {
        setupCallControls();
        incallControlsInitiated = true;
      }
    } else {
      hideCallUI();
      showEndCall();
    }
  });
});
