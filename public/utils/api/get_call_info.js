export async function getCallInfo(access_token) {
  console.log("Sending access_token:", access_token);
  try {
    let response = await fetch("/call/visit_summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ access_token: access_token }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return { success: false, message: data.message || "Unknown error" };
    }

    return { success: true, data: data.data };
  } catch (error) {
    return { success: false, message: error.message || "Something went wrong" };
  }
}
