export async function endCallTime(access_token) {
  try {
    let response = await fetch("/call/end_call_time", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ access_token: access_token }),
    });

    if (!response.ok) {
      console.error("Failed to end call time");
    } else {
      console.log("Call end time recorded successfully.");
    }
  } catch (error) {}
}
