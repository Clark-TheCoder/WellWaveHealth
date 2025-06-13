import { createCancelButton } from "./create_cancel_button.js";
import { createChartButton } from "./create_chart_button.js";
import { createJoinButton } from "./create_join_button.js";

export function createCallCard(call) {
  const callDiv = document.createElement("div");
  callDiv.classList.add("call");

  const callLabel = document.createElement("h1");
  callLabel.textContent = call.patient_alias;
  callDiv.appendChild(callLabel);

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("call_buttons_div");

  if (call.status === "generated") {
    callDiv.style.backgroundColor = "#00a9a7";
    buttonDiv.appendChild(createJoinButton(call));
    buttonDiv.appendChild(createChartButton(call));
    buttonDiv.appendChild(createCancelButton(call));
  } else if (call.status === "completed_not_charted") {
    callDiv.style.backgroundColor = "#a4a4a4";
    buttonDiv.appendChild(createChartButton(call));
  }

  callDiv.appendChild(buttonDiv);
  return callDiv;
}
