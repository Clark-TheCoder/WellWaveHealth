const preCallOverlay = document.getElementById("pc_page_overlay");
const preCallPopup = document.getElementById("pc_popup");

export function showPreCallPopup() {
  preCallOverlay.style.display = "block";
  preCallPopup.style.display = "block";
}

export function hidePreCallPopup() {
  preCallOverlay.style.display = "none";
  preCallPopup.style.display = "none";
}
