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
      window.location.href = "/call/doctor_call_view";
    } else {
      console.log("no");
    }
  } catch (error) {
    console.error("Join call error:", error);
  }
}
