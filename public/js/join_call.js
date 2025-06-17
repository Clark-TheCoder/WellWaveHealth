import { activateAudio } from "../utils/audioSettings.js";
import { activateCamera } from "../utils/cameraSettings.js";

export async function joinCall(call, cameraSettings, audioSettings) {
  try {
    let response = await fetch("/call/join/doctor", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ accessToken: call.access_token }),
    });
    const data = await response.json();
    if (response.ok) {
      if (cameraSettings === true) {
        await activateCamera();
      }
      if (audioSettings) {
        await activateAudio();
      }
      window.location.href = "/call/doctor_call_view";
    } else {
      console.log("no");
    }
  } catch (error) {
    console.error("Join call error:", error);
  }
}
