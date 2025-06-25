import { validateForm } from "./form_validation.js";

let currentVisitStatus = null;
const visitStatusInputs = document.querySelectorAll(".visit_status_input");
const summaryInput = document.getElementById("call_summary");
const notesInput = document.getElementById("notes");
const planInput = document.getElementById("plan");
const summaryTextArea = document.getElementById("summary_textarea");

function hideAllSections() {
  [planInput, summaryInput, notesInput].forEach((section) => {
    section.classList.add("hidden_input_div");
    section.classList.remove("input_div");
  });
}

function showSections(status) {
  if (
    status === "no_show" ||
    status === "cancelled_by_patient" ||
    status === "cancelled_by_provider"
  ) {
    notesInput.classList.replace("hidden_input_div", "input_div");
    planInput.classList.replace("hidden_input_div", "input_div");
    validateForm();
  } else if (status === "completed") {
    summaryInput.classList.replace("hidden_input_div", "input_div");
    notesInput.classList.replace("hidden_input_div", "input_div");
    planInput.classList.replace("hidden_input_div", "input_div");
    validateForm();
  }
}

export function setupVisitStatusHandler() {
  visitStatusInputs.forEach((input) => {
    input.addEventListener("click", () => {
      const selectedStatus = input.value;
      if (
        currentVisitStatus === "completed" &&
        selectedStatus !== "completed" &&
        summaryTextArea.value.trim().length > 0
      ) {
        const confirmChange = confirm(
          "Changing the visit status will erase the Call Summary. Do you want to proceed?"
        );
        if (!confirmChange) {
          input.checked = false;
          document.querySelector(
            `input[value="${currentVisitStatus}"]`
          ).checked = true;
          return;
        } else {
          summaryInput.querySelector("textarea").value = "";
        }
      }

      currentVisitStatus = selectedStatus;
      hideAllSections();
      showSections(selectedStatus);
    });
  });
}

export function getCurrentVisitStatus() {
  return currentVisitStatus;
}
