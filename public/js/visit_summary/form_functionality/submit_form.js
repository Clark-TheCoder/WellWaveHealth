import { getCurrentVisitStatus } from "./status_handlers.js";

export function setupFormSubmission() {
  const summaryTextArea = document.getElementById("summary_textarea");
  const planTextArea = document.getElementById("plan_textarea");
  const notesTextArea = document.getElementById("notes_textarea");
  const visitSummaryform = document.getElementById("visitSummary_form");

  visitSummaryform.addEventListener("submit", async (e) => {
    e.preventDefault();

    const visitStatus = getCurrentVisitStatus();
    let summary = summaryTextArea.value.trim();
    let plan = planTextArea.value.trim();
    let notes = notesTextArea.value.trim();
    const access_token = sessionStorage.getItem("access_token");

    if (!summary) summary = "No summary provided.";
    if (!plan) plan = "No care plan provided.";
    if (!notes) notes = "No additional notes provided.";

    if (!access_token) {
      console.error("No access token found in sessionStorage.");
      return;
    }

    const formInfo = {
      summary,
      plan,
      notes,
    };

    try {
      const response = await fetch("/call/visit_summary", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ access_token, ...formInfo, visitStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Visit summary submitted successfully.");
        sessionStorage.removeItem("access_token");
        window.location.href = "/call/scheduled_calls";
      } else {
        console.error(
          "Server responded with error:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  });
}
