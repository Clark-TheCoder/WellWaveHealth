// import { getCallStatus } from "../../../../utils/api/get_call_status.js";
// import { showPreCallPopup, hidePreCallPopup } from "../general/precall_ui.js";
// import { showWaitingRoom, hideWaitingRoom } from "../general/waiting_ui.js";
// import { showCallUI, hideCallUI } from "../general/incall_ui.js";
// import { patientStatus } from "../../index.js";

// export function pollCallStatus() {
//   // export function pollCallStatus() {
//   const pathParts = window.location.pathname.split("/");
//   const access_token = pathParts[pathParts.length - 1];

//   setInterval(async () => {
//     try {
//       const callData = await getCallStatus(access_token);
//       if (!callData) return;

//       if (callData.status === "in_progress") {
//         hideWaitingRoom();
//         showPreCallPopup();
//       } else if (callData.status === "generated") {
//         showWaitingRoom();
//         hidePreCallPopup();
//       } else {
//         // Optionally show a post-call UI
//         hideWaitingRoom();
//         hidePreCallPopup();
//         hideCallUI();
//         console.log("Call ended or canceled");
//       }
//     } catch (error) {
//       console.error("Polling error:", error);
//     }
//   }, 5000);
// }

import { getCallStatus } from "../../../../utils/api/get_call_status.js";
import { showPreCallPopup, hidePreCallPopup } from "../general/precall_ui.js";
import { showWaitingRoom, hideWaitingRoom } from "../general/waiting_ui.js";
import { showCallUI, hideCallUI } from "../general/incall_ui.js";
import { patientStatus } from "../../index.js";

export function pollCallStatus() {
  const pathParts = window.location.pathname.split("/");
  const access_token = pathParts[pathParts.length - 1];

  setInterval(async () => {
    console.log(patientStatus.status);
    try {
      const callData = await getCallStatus(access_token);
      if (!callData) return;

      if (
        callData.status === "in_progress" &&
        patientStatus.status === "joined"
      ) {
        hideWaitingRoom();
        showPreCallPopup();
      } else if (
        callData.status === "in_progress" &&
        patientStatus.status === null
      ) {
        hideWaitingRoom();
        showPreCallPopup();
        showCallUI();
      } else if (callData.status === "generated") {
        showWaitingRoom();
        hidePreCallPopup();
      } else {
        // Optionally show a post-call UI
        hideWaitingRoom();
        hidePreCallPopup();
        hideCallUI();
        console.log("Call ended or canceled");
        patientStatus.status = null;
      }
    } catch (error) {
      console.error("Polling error:", error);
    }
  }, 5000);
}
