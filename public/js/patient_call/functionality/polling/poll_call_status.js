import { getCallStatus } from "../../../../utils/api/get_call_status.js";
import { showPreCallPopup, hidePreCallPopup } from "../general/precall_ui.js";
import { showWaitingRoom, hideWaitingRoom } from "../general/waiting_ui.js";
import { showCallUI, hideCallUI } from "../general/incall_ui.js";
import { patientStatus } from "../../index.js";
import { showEndCall } from "../general/endcall_ui.js";
export function pollCallStatus() {
  const pathParts = window.location.pathname.split("/");
  const access_token = pathParts[pathParts.length - 1];

  setInterval(async () => {
    try {
      const callData = await getCallStatus(access_token);
      if (!callData) return;

      const status = patientStatus.status;
      console.log("Call status:", callData.status);
      console.log("Patient status:", status);

      if (callData.status === "in_progress") {
        if (status === "joined") {
          showCallUI();
          hidePreCallPopup();
          hideWaitingRoom();
        } else {
          showPreCallPopup();
          hideWaitingRoom();
        }
      } else if (callData.status === "generated") {
        showWaitingRoom();
        hidePreCallPopup();
        hideCallUI();
      } else {
        // Handles ended or invalid calls
        hideCallUI();
        hidePreCallPopup();
        hideWaitingRoom();
        showEndCall();
      }
    } catch (error) {
      console.error("Polling error:", error);
    }
  }, 5000);
}

// export function pollCallStatus() {
//   const pathParts = window.location.pathname.split("/");
//   const access_token = pathParts[pathParts.length - 1];

//   setInterval(async () => {
//     try {
//       const callData = await getCallStatus(access_token);
//       if (!callData) return;

//       let status = patientStatus.status;
//       console.log(status);

//       if (callData.status === "in_progress" && status === "joined") {
//         showCallUI();
//         hidePreCallPopup();
//         hideWaitingRoom();
//       } else if (callData.status === "in_progress" && status === null) {
//         showPreCallPopup();
//         hideWaitingRoom();
//       } else if (callData.status === "generated") {
//         showWaitingRoom();
//       } else {
//         hideCallUI();
//         showEndCall();
//       }
//     } catch (error) {
//       console.error("Polling error:", error);
//     }
//   }, 5000);
// }
