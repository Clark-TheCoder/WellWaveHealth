import { changeCallStatus } from "../../../change_call_status.js";
import { endCall } from "../../fetches/end_call.js";
import { turnMicOff } from "../media_settings/toggle_audio.js";
import { turnCameraOff } from "../media_settings/toggle_camera.js";

const popup = document.getElementById("popup");
const pageOverlay = document.getElementById("page_overlay");

export async function endCallPopup() {
  popup.style.display = "block";
  pageOverlay.style.display = "flex";

  const returnButton = document
    .getElementById("return_button")
    .addEventListener("click", returnToCall);
  const endAndChartButton = document
    .getElementById("endAndChart_button")
    .addEventListener("click", endAndChart);
  const endNoChartButton = document
    .getElementById("endNoChart_button")
    .addEventListener("click", endNoChart);
}

function returnToCall() {
  popup.style.display = "none";
  pageOverlay.style.display = "none";
}

async function endAndChart() {
  await turnMicOff();
  await turnCameraOff();
  await changeCallStatus();
}

async function endNoChart() {
  await turnMicOff();
  await turnCameraOff();
  await changeCallStatus(
    "completed_not_charted",
    sessionStorage.getItem("access_token")
  );
  sessionStorage.removeItem("access_token");
  window.location.href = "/call/scheduled_calls";
}
