export async function changeCallStatus(updatedStatus, access_token) {
  try {
    const response = await fetch("/call/change_call_status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ updatedStatus, access_token }),
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
