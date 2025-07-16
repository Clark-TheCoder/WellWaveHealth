import { getCallStatus } from "../../../../utils/api/get_call_status.js";
import { showPreCallPopup, hidePreCallPopup } from "../general/precall_ui.js";
import { showWaitingRoom, hideWaitingRoom } from "../general/waiting_ui.js";
import { showCallUI, hideCallUI } from "../general/incall_ui.js";
import { patientStatus } from "../../index.js";
import { showEndCall } from "../general/endcall_ui.js";
import { setupPreCallControls } from "../../pre_call/pre_call_controls.js";
import { setupCallControls } from "../general/button_functionality.js";
export function pollCallStatus() {
  const pathParts = window.location.pathname.split("/");
  const access_token = pathParts[pathParts.length - 1];

  setInterval(async () => {
    try {
      const callData = await getCallStatus(access_token);
      if (!callData) return;

      const status = patientStatus.status;

      if (callData.status === "in_progress") {
        if (status === "joined") {
          showCallUI();
          hidePreCallPopup();
          hideWaitingRoom();
          setupCallControls();
        } else {
          showPreCallPopup();
          hideWaitingRoom();

          setupPreCallControls();
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
