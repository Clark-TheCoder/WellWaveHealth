import { changeCallStatus } from "../../../utils/api/change_call_status.js";

export function showCancelPopup(call) {
  const popup = document.getElementById("popup");
  const pageOverlay = document.getElementById("page_overlay");

  // Clear old popup content
  popup.innerHTML = "";

  // Show overlay and popup
  pageOverlay.style.display = "block";
  popup.style.display = "block";

  // Title
  const title = document.createElement("h1");
  title.textContent = "Are you sure you want to cancel this call?";
  popup.appendChild(title);

  // Button container
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("popup-button-container");

  // Undo button
  const undoButton = document.createElement("button");
  undoButton.textContent = "Undo";
  undoButton.id = "undo_button";
  undoButton.addEventListener("click", () => {
    popup.style.display = "none";
    pageOverlay.style.display = "none";
  });

  // Continue button
  const continueButton = document.createElement("button");
  continueButton.textContent = "Continue";
  continueButton.id = "continue_button";
  continueButton.addEventListener("click", async () => {
    //this should be changed to remove the call from the backend
    await changeCallStatus("cancelled_by_patient", call.access_token);
    window.location.reload();
  });

  // Add buttons to container
  buttonContainer.appendChild(undoButton);
  buttonContainer.appendChild(continueButton);

  // Add button container to popup
  popup.appendChild(buttonContainer);
}
