// import { setupCallControls } from "./functionality/general/button_functionality.js";
// import { pollCallStatus } from "./functionality/polling/poll_call_status.js";
// import { setupPreCallControls } from "./pre_call/pre_call_controls.js";

// document.addEventListener("DOMContentLoaded", () => {
//   if (document.getElementById("join_call_button")) {
//     setupPreCallControls();
//   }
//   if (document.getElementById("call_ui")) {
//     setupCallControls;
//   }
//   pollCallStatus();
// });

import { setupCallControls } from "./functionality/general/button_functionality.js";
import { pollCallStatus } from "./functionality/polling/poll_call_status.js";
import { setupPreCallControls } from "./pre_call/pre_call_controls.js";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("join_call_button")) {
    setupPreCallControls();
  }
  if (document.getElementById("call_ui")) {
    setupCallControls();
  }

  pollCallStatus();
});
