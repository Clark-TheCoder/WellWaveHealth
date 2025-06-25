export function setupSectionToggles() {
  const inputSectionLabels = document.querySelectorAll(".section_label_div");
  inputSectionLabels.forEach((section) => {
    section.addEventListener("click", () => {
      const content = section.nextElementSibling;
      if (content && content.classList.contains("section_inputs_div")) {
        content.classList.toggle("flex");
      }
    });
  });
}
