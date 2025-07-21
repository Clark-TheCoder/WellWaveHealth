import { getCallStatus } from "../../../../utils/api/get_call_status.js";

export function pollCallStatus(onStatusUpdate) {
  const pathParts = window.location.pathname.split("/");
  const access_token = pathParts[pathParts.length - 1];

  const intervalId = setInterval(async () => {
    const callData = await getCallStatus(access_token);
    const callStatus = callData.status;

    if (callStatus) {
      onStatusUpdate(callStatus);
      if (callStatus !== "generated" && callStatus !== "in_progress") {
        clearInterval(intervalId);
      }
    }
  }, 5000);

  return intervalId;
}
