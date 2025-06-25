export async function endCall() {
  const response = await fetch();
  if (!access_token) {
    console.error("No access token found in sessionStorage.");
    return;
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
