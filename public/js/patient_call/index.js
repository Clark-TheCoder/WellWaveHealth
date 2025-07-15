import { getCallStatus } from "../../utils/api/get_call_status.js";
import { setupCallControls } from "./functionality/general/button_functionality.js";
import { showEndCall } from "./functionality/general/endcall_ui.js";
import { showPreCallPopup } from "./functionality/general/precall_ui.js";
import {
  hideWaitingRoom,
  showWaitingRoom,
} from "./functionality/general/waiting_ui.js";
import { pollCallStatus } from "./functionality/polling/poll_call_status.js";
import { setupPreCallControls } from "./pre_call/pre_call_controls.js";

export const patientStatus = { status: null };

document.addEventListener("DOMContentLoaded", async () => {
  const pathParts = window.location.pathname.split("/");
  const access_token = pathParts[pathParts.length - 1];
  try {
    //set up initial UI
    const initalStatus = await getCallStatus(access_token);
    if (initalStatus.status === "in_progress") {
      showPreCallPopup();
      setupPreCallControls();
    } else if (initalStatus.status === "generated") {
      showWaitingRoom();
    } else {
      showEndCall();
    }

    //polling
    pollCallStatus();
  } catch (error) {
    console.log("Error: ", error);
  }
});
