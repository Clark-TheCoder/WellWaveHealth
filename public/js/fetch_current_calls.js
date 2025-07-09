// import {
//   createCallCard,
//   showNoCallsMessage,
// } from "./scheduled_calls/precall_call_ui/index.js";

// document.addEventListener("DOMContentLoaded", loadScheduledCalls);

// async function loadScheduledCalls() {
//   try {
//     const response = await fetch("/call/scheduled_calls/loadCalls", {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//     });

//     const data = await response.json();
//     const scheduledCallsDiv = document.getElementById("calls");
//     scheduledCallsDiv.innerHTML = "";

//     if (!response.ok || !data.calls?.length) {
//       showNoCallsMessage(scheduledCallsDiv);
//     } else {
//       data.calls.forEach((call) => {
//         const callElement = createCallCard(call);
//         scheduledCallsDiv.appendChild(callElement);
//       });
//     }
//   } catch (error) {
//     console.error("Failed to fetch scheduled calls:", error);
//   }
// }
