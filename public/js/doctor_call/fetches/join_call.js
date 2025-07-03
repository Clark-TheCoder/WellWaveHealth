import { audioSettings } from "../../scheduled_calls/precall_call_ui/preCall_popup/toggle_audio.js";
import { cameraSettings } from "../../scheduled_calls/precall_call_ui/preCall_popup/toggle_camera.js";

export async function joinCall(call) {
  try {
    let response = await fetch("/call/join/doctor", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ access_token: call.access_token }),
    });
    const data = await response.json();
    if (response.ok) {
      sessionStorage.setItem(
        "audioState",
        JSON.stringify(audioSettings.enabled)
      );
      sessionStorage.setItem(
        "cameraState",
        JSON.stringify(cameraSettings.enabled)
      );
      sessionStorage.setItem("access_token", call.access_token);
      window.location.href = "/call/doctor_call_view"; //will add logic once user is in this page to make the connection
    } else {
      /***create custom error message */
      console.log("no");
    }
  } catch (error) {
    console.error("Join call error:", error);
  }
}

// To be kept the same when adding
//
// Triggers backend status updates ✅
// Saves mic/cam preferences ✅
// Redirects to the actual call page ✅

// And in /call/doctor_call_view, you’ll use sessionStorage.getItem("access_token") to:
// Get the call_id (via backend or socket handshake)
// Join the correct WebRTC room
// Start signaling
//Do this in: public/js/doctor_call/index.js
