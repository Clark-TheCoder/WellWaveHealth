export async function getCallStatus(access_token) {
  try {
    const response = await fetch(`/call/join/status/${access_token}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
      return data;
    } else {
      /***custom errror message */
      console.log("Custom error message:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Fetch error in getCallStatus:", error);
    return null;
  }
}
