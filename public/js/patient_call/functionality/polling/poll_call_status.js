// import { getCallStatus } from "../../../../utils/api/get_call_status.js";

// import { showPreCallPopup, hidePreCallPopup } from "../general/pre_call_ui.js";
// import { showWaitingRoom, hideWaitingRoom } from "../general/waiting_ui.js";

// export function pollCallStatus() {
//   const pathParts = window.location.pathname.split("/");
//   const access_token = pathParts[pathParts.length - 1];
//   setInterval(async () => {
//     try {
//       const callData = await getCallStatus(access_token);
//       const preCallOverlay = document.getElementById("pc_page_overlay");
//       const preCallPopup = document.getElementById("pc_popup");

//       if (callData) {
//         if (callData.status === "in_progress") {
//           hideWaitingRoom();
//           showPreCallPopup();
//         } else if (callData.status === "generated") {
//           showWaitingRoom();
//           hidePreCallPopup();
//         } else {
//           //show the post call popup
//           console.log("done");
//         }
//       } else {
//         /***custom error message */
//         console.warn("No status received or error occurred.");
//       }

//       if (data.status === "in_progress") {
//       } else if (data.status === "generated") {
//       } else {
//         console.log("hi");
//       }
//     } catch (error) {
//       /***customer error message */
//     }
//   }, 5000);
// }

import { getCallStatus } from "../../../../utils/api/get_call_status.js";
import { showPreCallPopup, hidePreCallPopup } from "../general/pre_call_ui.js";
import { showWaitingRoom, hideWaitingRoom } from "../general/waiting_ui.js";
import { showCallUI, hideCallUI } from "../general/incall_ui.js"; // make this if needed

export function pollCallStatus() {
  const pathParts = window.location.pathname.split("/");
  const access_token = pathParts[pathParts.length - 1];

  // Optional: handle initial state
  const initial = window.initialCallStatus;
  if (initial === "generated") {
    showWaitingRoom();
  } else if (initial === "in_progress") {
    showPreCallPopup();
  }

  setInterval(async () => {
    try {
      const callData = await getCallStatus(access_token);
      if (!callData) return;

      if (callData.status === "in_progress") {
        hideWaitingRoom();
        showPreCallPopup();
      } else if (callData.status === "generated") {
        showWaitingRoom();
        hidePreCallPopup();
      } else {
        // Optionally show a post-call UI
        hideWaitingRoom();
        hidePreCallPopup();
        hideCallUI();
        console.log("Call ended or canceled");
      }
    } catch (error) {
      console.error("Polling error:", error);
    }
  }, 5000);
}
