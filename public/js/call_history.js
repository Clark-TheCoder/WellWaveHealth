const yearInput = document.getElementById("year_input");
const monthInput = document.getElementById("month_input");
const dayInput = document.getElementById("day_input");
const aliasInput = document.getElementById("patientAlias_input");
const statusInput = document.getElementById("status_input");
const submitButton = document.getElementById("submit_button");

yearInput.addEventListener("input", validateForm);
monthInput.addEventListener("input", validateForm);
dayInput.addEventListener("input", validateForm);
function validateDate() {
  const year = yearInput.value.trim();
  const month = monthInput.value.trim();
  const day = dayInput.value.trim();

  if (year && !month && !day) {
    return false;
  } else if (day && !month && !year) {
    return false;
  } else if (day && month && !year) {
    return false;
  } else if (year && month && !day) {
    return true;
  } else if (year && month && day) {
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

  submitButton.disabled = !(validAlias && validStatus && validDate);
}

const searchForm = document.getElementById("search_form");
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const year = yearInput.value.trim();
  const month = Number(monthInput.value.trim());
  const day = Number(dayInput.value.trim());
  const alias = aliasInput.value.trim();
  const status = statusInput.value.trim();

  const searchData = {};
  if (year) searchData.year = year;
  if (month) searchData.month = month;
  if (day) searchData.day = day;
  if (alias) searchData.alias = alias;
  if (status) searchData.status = status;

  try {
    const response = await fetch("/call/call_history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(searchData),
    });

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.log(error);
  }
});
