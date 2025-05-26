//expand form sections
const inputSectionLabels = document.querySelectorAll(".section_label_div");
inputSectionLabels.forEach((section) => {
  section.addEventListener("click", () => {
    const content = section.nextElementSibling;
    if (content && content.classList.contains("section_inputs_div")) {
      content.classList.toggle("flex");
    }
  });
});

//undither form
const visitStatusInputs = document.querySelectorAll(".visit_status_input");
const planInput = document.getElementById("plan");
const summaryInput = document.getElementById("call_summary");
const notesInput = document.getElementById("notes");
const summaryTextArea = document.getElementById("summary_textarea");
const notesTextArea = document.getElementById("notes_textarea");
const planTextArea = document.getElementById("plan_textarea");
const submitButton = document.getElementById("submit_button");

let currentVisitStatus = null;

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
    notesInput.classList.remove("hidden_input_div");
    notesInput.classList.add("input_div");

    planInput.classList.remove("hidden_input_div");
    planInput.classList.add("input_div");
    validateForm();
  } else if (status === "completed") {
    summaryInput.classList.remove("hidden_input_div");
    summaryInput.classList.add("input_div");

    notesInput.classList.remove("hidden_input_div");
    notesInput.classList.add("input_div");

    planInput.classList.remove("hidden_input_div");
    planInput.classList.add("input_div");
    validateForm();
  }
}

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
        document.querySelector(`input[value="${currentVisitStatus}"]`).checked =
          true;
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

function validateForm() {
  submitButton.disabled = false;
  submitButton.classList.add("active_button");
  submitButton.classList.remove("inactive_button");
}

const cancelButton = document
  .getElementById("cancel_button")
  .addEventListener("click", () => {
    summaryTextArea.value = "";
    planTextArea.value = "";
    notesTextArea.value = "";
  });

const visitSummaryform = document.getElementById("visitSummary_form");

visitSummaryform.addEventListener("submit", async (e) => {
  e.preventDefault();

  const visitStatus = currentVisitStatus;
  const summary = summaryTextArea.value.trim();
  const plan = planTextArea.value.trim();
  const notes = notesTextArea.value.trim();
  const accessToken = sessionStorage.getItem("accessToken");

  if (!accessToken) {
    console.error("No access token found in sessionStorage.");
    return;
  }

  const formInfo = {
    visitStatus,
    summary,
    plan,
    notes,
  };

  console.log(formInfo);

  try {
    const response = await fetch("/call/visit_summary", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ accessToken, ...formInfo }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Visit summary submitted successfully.");
      // Optionally redirect or show a confirmation message
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
