import { showPreCallPopup } from "./preCall_popup/create_precall_popup.js";

export function createJoinButton(call) {
  const joinButton = document.createElement("button");
  joinButton.classList.add("button");
  joinButton.textContent = "Join Call";
  joinButton.addEventListener("click", () => {
    showPreCallPopup(call);
  });
  return joinButton;
}
