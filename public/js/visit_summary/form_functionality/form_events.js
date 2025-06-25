const summaryTextArea = document.getElementById("summary_textarea");
const planTextArea = document.getElementById("plan_textarea");
const notesTextArea = document.getElementById("notes_textarea");

export function setupFormEvents() {
  document.getElementById("cancel_button").addEventListener("click", () => {
    summaryTextArea.value = "";
    planTextArea.value = "";
    notesTextArea.value = "";
  });

  const popup = document.getElementById("popup");
  const pageOverlay = document.getElementById("page_overlay");
  const submitButton = document.getElementById("submit_button");
  const continueButton = document.getElementById("continue_button");

  submitButton.addEventListener("click", () => {
    popup.style.display = "block";
    popup.querySelector("h1").textContent =
      "Once you submit this form, you will not be able to edit this call's information again.";
    pageOverlay.style.display = "block";
  });

  document.getElementById("undo_button").addEventListener("click", () => {
    popup.style.display = "none";
    pageOverlay.style.display = "none";
  });

  continueButton.addEventListener("click", () => {
    document.getElementById("visitSummary_form").requestSubmit();
    popup.style.display = "none";
    pageOverlay.style.display = "none";
  });
}
