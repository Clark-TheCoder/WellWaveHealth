import { getCallStatus } from "../../utils/api/get_call_status.js";
import { setupCallControls } from "./functionality/general/button_functionality.js";
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
    const initalStatus = await getCallStatus(access_token);

    if (initalStatus.status === "in_progress") {
      showPreCallPopup();
      setupPreCallControls();
    } else if (initalStatus.status === "generated") {
      showWaitingRoom();
    } else {
      //end call ui
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});

// import { setupCallControls } from "./functionality/general/button_functionality.js";
// import { pollCallStatus } from "./functionality/polling/poll_call_status.js";
// import { setupPreCallControls } from "./pre_call/pre_call_controls.js";

// document.addEventListener("DOMContentLoaded", () => {
//   if (document.getElementById("join_call_button")) {
//     setupPreCallControls();
//   }
//   if (document.getElementById("call_ui")) {
//     setupCallControls;
//   }
//   pollCallStatus();
// });

// document.addEventListener("DOMContentLoaded", () => {
//   if (document.getElementById("join_call_button")) {
//     setupPreCallControls();
//   }
//   if (document.getElementById("call_ui")) {
//     setupCallControls();
//   }

//   pollCallStatus();
// });
