import { changeCallStatus } from "../../../../utils/api/change_call_status.js";
import { submitVisitSummary } from "../../../../utils/api/submit_call_info.js";
import { turnMicOff } from "../media_settings/inCall_toggle_audio.js";
import { turnCameraOff } from "../media_settings/inCall_toggle_camera.js";
import { getSidebarNotes } from "./sidebar_functionality.js";

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

  //change the call status
  let changedStatus = await changeCallStatus(
    "completed_not_charted",
    sessionStorage.getItem("access_token")
  );
  if (!changedStatus) {
    //***Tailor alert */
    alert("Failed to end call.");
    return;
  }

  const { summary, plan, notes } = getSidebarNotes();
  let submitCallInfo = await submitVisitSummary({
    access_token: sessionStorage.getItem("access_token"),
    summary,
    plan,
    notes,
    visitStatus: "completed_not_charted",
  });
  if (!submitCallInfo) {
    //***Tailor alert */
    alert("Unable to save call notes. Call will still be ended.");
  }

  window.location.href = "/call/visit_summary";
}

async function endNoChart() {
  await turnMicOff();
  await turnCameraOff();

  //change the call status
  let changedStatus = await changeCallStatus(
    "completed_not_charted",
    sessionStorage.getItem("access_token")
  );
  if (!changedStatus) {
    //***Tailor alert */
    alert("Failed to end call.");
    return;
  }

  const { summary, plan, notes } = getSidebarNotes();
  let submitCallInfo = await submitVisitSummary({
    access_token: sessionStorage.getItem("access_token"),
    summary,
    plan,
    notes,
    visitStatus: "completed_not_charted",
  });
  if (!submitCallInfo) {
    //***Tailor alert */
    alert("Unable to save call notes. Call will still be ended.");
  }

  sessionStorage.removeItem("access_token");
  window.location.href = "/call/scheduled_calls";
}
