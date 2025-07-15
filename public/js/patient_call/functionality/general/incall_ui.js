export function showCallUI() {
  const callUI = document.getElementById("call_ui");
  if (callUI) {
    callUI.style.display = "flex";
  }
}

export function hideCallUI() {
  const callUI = document.getElementById("call_ui");
  if (callUI) {
    callUI.style.display = "none";
  }
}
