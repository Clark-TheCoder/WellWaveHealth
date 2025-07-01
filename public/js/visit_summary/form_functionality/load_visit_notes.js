export function loadVisitNotesToForm(call_notes) {
  const { plan, notes, summary } = call_notes;
  const summaryTextArea = document.getElementById("summary_textarea");
  const planTextArea = document.getElementById("plan_textarea");
  const notesTextArea = document.getElementById("notes_textarea");
  planTextArea.value = plan || "";
  notesTextArea.value = notes || "";
  summaryTextArea.value = summary || "";
}
