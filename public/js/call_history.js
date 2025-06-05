const yearInput = document.getElementById("year_input");
const monthInput = document.getElementById("month_input");
const dayInput = document.getElementById("day_input");
const aliasInput = document.getElementById("patientAlias_input");
const statusInput = document.getElementById("status_input");
const submitButton = document.getElementById("submit_button");
const callsContainer = document.getElementById("calls");
const errorMessage = document.getElementById("error_message_div");
const errorMessageText = document.getElementById("error_message");

yearInput.addEventListener("input", validateForm);
monthInput.addEventListener("input", validateForm);
dayInput.addEventListener("input", validateForm);
function validateDate() {
  const year = yearInput.value.trim();
  const month = monthInput.value.trim();
  const day = dayInput.value.trim();

  const isValidYear = /^\d{4}$/.test(year); // only 4 digits, no letters, no spaces

  if (year && !isValidYear) {
    return false;
  }

  if (isValidYear && !month && !day) {
    return false;
  } else if (day && !month && !isValidYear) {
    return false;
  } else if (day && month && !isValidYear) {
    return false;
  } else if (isValidYear && month && !day) {
    return true;
  } else if (isValidYear && month && day) {
    return true;
  }
  return false;
}

aliasInput.addEventListener("input", validateForm);
function validateAlias() {
  const alias = aliasInput.value.trim();
  const match = alias.match(/^([A-Za-z]{2})(\d{1,2})$/);

  if (match) {
    const numberPart = parseInt(match[2], 10);
    if (numberPart >= 1 && numberPart <= 31) {
      return true;
    }
  }
  return false;
}

statusInput.addEventListener("input", validateForm);
function validateStatus() {
  const status = statusInput.value;
  if (
    status !== "completed" &&
    status !== "no_show" &&
    status !== "cancelled_by_provider" &&
    status !== "cancelled_by_patient"
  ) {
    return false;
  } else {
    return true;
  }
}

function validateForm() {
  const validAlias = validateAlias();
  const validStatus = validateStatus();
  const validDate = validateDate();

  const conditionOne = validDate && validAlias && validStatus;
  const conditionTwo = validAlias && validStatus;
  const conditionThree = validDate;

  if (conditionOne || conditionTwo || conditionThree) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }

  if (submitButton.disabled === true) {
    submitButton.classList.add("inactive_button");
    submitButton.classList.remove("active_button");
  } else if (submitButton.disabled === false) {
    submitButton.classList.remove("inactive_button");
    submitButton.classList.add("active_button");
  }
}

const searchForm = document.getElementById("search_form");
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  callsContainer.innerHTML = "";

  const searchData = {};
  const year = yearInput.value.trim();
  const month = monthInput.value.trim();
  const day = dayInput.value.trim();
  const alias = aliasInput.value.trim();
  const status = statusInput.value.trim();

  if (year) searchData.year = year;
  if (month !== "") searchData.month = Number(month);
  if (day !== "") searchData.day = Number(day);
  if (alias) searchData.alias = alias;
  if (status) searchData.status = status;

  try {
    let response = await fetch("/call/call_history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(searchData),
    });

    const data = await response.json();
    if (response.ok) {
      if (data.calls && data.calls.length > 0) {
        console.log(data.calls);
        renderCalls(data.calls);
        errorMessage.style.display = "none";
      } else {
        errorMessage.style.display = "flex";
        errorMessageText.textContent =
          "Could not find calls matching this criteria. ";
      }
    } else {
      errorMessage.style.display = "flex";
      errorMessageText.textContent = data.message || "Unknown error";
    }
  } catch (error) {
    errorMessage.style.display = "flex";
    errorMessageText.textContent =
      "We could not retrieve your search results. Check your internet connection or try again later.";
  }
});

function renderCalls(calls) {
  calls.forEach((call) => {
    //create call and cover
    const callContainer = document.createElement("div");
    callContainer.classList.add("call");
    const callCover = document.createElement("div");
    callCover.classList.add("call_cover");
    callContainer.appendChild(callCover);

    //create top of the cover
    const topOfCover = document.createElement("div");
    topOfCover.classList.add("top_info_container");
    callCover.appendChild(topOfCover);
    const patientAlias = document.createElement("h1");
    patientAlias.textContent = call.patient_alias;
    const date = document.createElement("h4");
    date.textContent = call.date_created.split("T")[0];
    topOfCover.appendChild(patientAlias);
    topOfCover.appendChild(date);

    //create bottom of the cover
    const bottomOfCover = document.createElement("div");
    bottomOfCover.classList.add("bottom_info_container");
    callCover.appendChild(bottomOfCover);
    const bottomInfoContainer = document.createElement("div");
    bottomInfoContainer.classList.add("info_container");
    const status = document.createElement("h3");
    status.textContent = formatCallStatus(call.status);
    const duration = document.createElement("h4");
    duration.textContent = call.duration_minutes || "00:00:00";
    bottomInfoContainer.appendChild(status);
    bottomInfoContainer.appendChild(duration);

    // Create and append button to bottom of cover
    const button = document.createElement("button");
    const img = document.createElement("img");
    img.id = "menu_icon";
    img.src = "/media/images/down-arrow.png";
    img.alt = ">";
    img.width = 35;
    img.height = 35;
    button.appendChild(img);
    bottomOfCover.appendChild(bottomInfoContainer);
    bottomOfCover.appendChild(button);

    //create the call notes container
    const callNotesContainer = document.createElement("div");
    callNotesContainer.classList.add("call_notes", "content", "hidden");
    callContainer.appendChild(callNotesContainer);

    //adding eventlistener to button to expand and hide notes container
    button.addEventListener("click", () => {
      callNotesContainer.classList.toggle("hidden");
    });

    //call summary
    const callSummaryContainer = document.createElement("div");
    callNotesContainer.appendChild(callSummaryContainer);
    //call summary content
    const callSummaryTitle = document.createElement("h3");
    callSummaryTitle.textContent = "Call Summary";
    const callSummaryText = document.createElement("p");
    callSummaryText.textContent = call.call_notes.summary;
    callSummaryContainer.appendChild(callSummaryTitle);
    callSummaryContainer.appendChild(callSummaryText);

    //plan
    const planContainer = document.createElement("div");
    callNotesContainer.appendChild(planContainer);
    //plan content
    const planTitle = document.createElement("h3");
    planTitle.textContent = "Plan";
    const planText = document.createElement("p");
    planText.textContent = call.call_notes.plan;
    planContainer.appendChild(planTitle);
    planContainer.appendChild(planText);

    //additional notes
    const notesContainer = document.createElement("div");
    callNotesContainer.appendChild(notesContainer);
    //additional notes content
    const notesTitle = document.createElement("h3");
    notesTitle.textContent = "Additional Notes";
    const notesText = document.createElement("p");
    notesText.textContent = call.call_notes.notes;
    notesContainer.appendChild(notesTitle);
    notesContainer.appendChild(notesText);

    //append to calls container
    callsContainer.appendChild(callContainer);
  });
}

function formatCallStatus(callStatus) {
  if (callStatus === "completed") {
    return "Completed";
  } else if (callStatus === "no_show") {
    return "No Show";
  } else if (callStatus === "cancelled_by_patient") {
    return "Cancelled By Patient";
  } else if (callStatus === "cancelled_by_provider") {
    return "Cancelled By Provider";
  } else {
    return "Unknown Status";
  }
}
