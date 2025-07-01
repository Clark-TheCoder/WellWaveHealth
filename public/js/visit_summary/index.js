import { setupSectionToggles } from "./form_functionality/toggle_sections.js";
import { setupVisitStatusHandler } from "./form_functionality/status_handlers.js";
import { setupFormEvents } from "./form_functionality/form_events.js";
import { setupFormSubmission } from "./form_functionality/submit_form.js";
import { getCallInfo } from "../../utils/api/get_call_info.js";
import { loadVisitNotesToForm } from "./form_functionality/load_visit_notes.js";

document.addEventListener("DOMContentLoaded", async () => {
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

  //load the notes if there are any
  let callNotes = await getCallInfo(sessionStorage.getItem("access_token"));

  if (callNotes.success) {
    //call function to place text in textarea
    loadVisitNotesToForm(callNotes.data.notes);
  } else {
    //***need custom error message popup */
    console.log("Call notes fetch failed:", callNotes.message);
  }
});
