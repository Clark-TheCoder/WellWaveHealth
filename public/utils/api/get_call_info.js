const access_token = sessionStorage.getItem("access_token");
export async function getCallInfo(access_token) {
  try {
    let response = await fetch("/call/visit_summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ access_token }),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return { success: false, message: data.message || "Unknown error" };
    }
    return { success: true, data };
  } catch (error) {
    return { success: false, message: err.message || "Something went wrong" };
  }
}
