import { changeCallStatus } from "../../../../utils/api/change_call_status.js";
export async function endCall() {
  let changedStatus = await changeCallStatus(
    "completed_not_charted",
    sessionStorage.getItem("access_token")
  );

  if (changedStatus) {
    sessionStorage.removeItem("access_token");
  } else {
    //***Tailor alert */
    alert("Failed to change call status.");
  }
}

// const summaryTextArea = document.getElementById("summary_textarea");
// const planTextArea = document.getElementById("plan_textarea");
// const notesTextArea = document.getElementById("notes_textarea");

// let summary = summaryTextArea.value.trim();
// let plan = planTextArea.value.trim();
// let notes = notesTextArea.value.trim();
// const access_token = sessionStorage.getItem("access_token");

// const formInfo = {
//   summary,
//   plan,
//   notes,
// };
// console.log("form");

//change the call status
//check if there is value in the summary, if there is, save a draft
//if there isn't then just change status
