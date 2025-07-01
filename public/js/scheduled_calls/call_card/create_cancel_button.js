import { showCancelPopup } from "./cancel_call_popup.js ";
export function createCancelButton(call) {
  const cancelButton = document.createElement("button");
  cancelButton.classList.add("button");
  cancelButton.textContent = "Mark as Unneeded";
  cancelButton.addEventListener("click", () => {
    showCancelPopup(call);
  });
  return cancelButton;
}
