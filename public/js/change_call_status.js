export async function changeCallStatus(updatedStatus, callAccessToken) {
  console.log("Sending value:", updatedStatus, callAccessToken);
  try {
    const response = await fetch("/call/change_call_status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ updatedStatus, callAccessToken }),
    });

    const data = await response.json();
    if (response.ok) {
      return data.newCallStatus;
    } else {
      return "Error";
    }
  } catch (error) {
    console.error("Fetch failed:", error.message, error);
  }
}
