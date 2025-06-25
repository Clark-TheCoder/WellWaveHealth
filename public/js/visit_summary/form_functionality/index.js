import { setupSectionToggles } from "./toggle_sections.js";
import { setupVisitStatusHandler } from "./status_handlers.js";
import { setupFormEvents } from "./form_events.js";
import { setupFormSubmission } from "./submit_form.js";

document.addEventListener("DOMContentLoaded", () => {
  setupSectionToggles();
  setupVisitStatusHandler();
  setupFormEvents();
  setupFormSubmission();
});
