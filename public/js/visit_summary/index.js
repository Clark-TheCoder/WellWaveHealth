import { setupSectionToggles } from "./form_functionality/toggle_sections.js";
import { setupVisitStatusHandler } from "./form_functionality/status_handlers.js";
import { setupFormEvents } from "./form_functionality/form_events.js";
import { setupFormSubmission } from "./form_functionality/submit_form.js";

document.addEventListener("DOMContentLoaded", () => {
  setupSectionToggles();
  setupVisitStatusHandler();
  setupFormEvents();
  setupFormSubmission();

  //clear access token from session storage prior to leaving page
  window.addEventListener("beforeunload", () => {
    sessionStorage.removeItem("access_token");
  });
  //if the page is reloaded, send the user back to the main page
  //save the data first
  window.addEventListener("load", () => {
    const [navigation] = performance.getEntriesByType("navigation");
    if (navigation.type === "reload") {
      sessionStorage.removeItem("access_token");
      window.location.href = "/call/scheduled_calls";
    }
  });
});
