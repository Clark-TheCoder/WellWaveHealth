export async function changeCallStatus(updatedStatus, access_token) {
  try {
    const response = await fetch("/call/change_call_status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ updatedStatus, access_token }),
    });

    return response.ok;
  } catch (error) {
    console.error("Fetch failed:", error.message, error);
    return false;
  }
}
