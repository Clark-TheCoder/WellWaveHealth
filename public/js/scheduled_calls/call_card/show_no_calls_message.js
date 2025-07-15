export function showNoCallsMessage(container) {
  const noCallsDiv = document.createElement("div");
  noCallsDiv.classList.add("empty_calls_div");

  const noCallsMessage = document.createElement("h3");
  noCallsMessage.textContent =
    "No calls scheduled currently. To create a call select:";
  noCallsMessage.style.color = "rgb(196, 36, 36)";

  // Create the <a> tag and style it like a button
  // const scheduleCallLink = document.createElement("a");
  // scheduleCallLink.textContent = "Create Call";
  // scheduleCallLink.href = "/call/create_link";
  // scheduleCallLink.classList.add("button_link"); // Custom CSS class

  // Append everything
  noCallsDiv.appendChild(noCallsMessage);
  // noCallsDiv.appendChild(scheduleCallLink);
  container.appendChild(noCallsDiv);
}
