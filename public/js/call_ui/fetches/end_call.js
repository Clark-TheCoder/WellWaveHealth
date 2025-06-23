const endCallButton = document.getElementById("end_call_button");
endCallButton.addEventListener("click", endCall);

function endCall() {
  const summaryTextArea = document.getElementById("summary_textarea");
  const planTextArea = document.getElementById("plan_textarea");
  const notesTextArea = document.getElementById("notes_textarea");

  let summary = summaryTextArea.value.trim();
  let plan = planTextArea.value.trim();
  let notes = notesTextArea.value.trim();
  const accessToken = sessionStorage.getItem("accessToken");

  if (!summary) summary = "No summary provided.";
  if (!plan) plan = "No care plan provided.";
  if (!notes) notes = "No additional notes provided.";

  if (!accessToken) {
    console.error("No access token found in sessionStorage.");
    return;
  }

  const formInfo = {
    summary,
    plan,
    notes,
  };
  console.log("form");
}
