const sideBarButton = document.getElementById("notes_button");
const notes = document.getElementById("notes_container");

sideBarButton.addEventListener("click", toogleSideBar);
function toogleSideBar() {
  notes.classList.toggle("hidden");
}
