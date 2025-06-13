export function showNoCallsMessage(container) {
  const noCallsDiv = document.createElement("div");
  noCallsDiv.classList.add("empty_calls_div");

  const noCallsMessage = document.createElement("h3");
  noCallsMessage.textContent =
    "No calls scheduled currently. To create a call select:";
  noCallsMessage.style.color = "rgb(196, 36, 36)";

  const scheduleCallButton = document.createElement("button");
  scheduleCallButton.classList.add("button");
  scheduleCallButton.style.border = "3px solid #2184a3";

  const scheduleCallLink = document.createElement("a");
  scheduleCallLink.textContent = "Create Call";
  scheduleCallLink.href = "/call/create_link";
  scheduleCallLink.style.textDecoration = "none";
  scheduleCallLink.style.color = "#2184a3";
  scheduleCallButton.appendChild(scheduleCallLink);

  noCallsDiv.appendChild(noCallsMessage);
  noCallsDiv.appendChild(scheduleCallButton);
  container.appendChild(noCallsDiv);
}
