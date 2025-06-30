export async function submitVisitSummary({
  access_token,
  summary,
  plan,
  notes,
  visitStatus,
}) {
  try {
    const response = await fetch("/call/visit_summary", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ access_token, summary, plan, notes, visitStatus }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return { success: false, message: data.message || "Unknown error" };
    }

    return { success: true, data };
  } catch (err) {
    return { success: false, message: err.message || "Something went wrong" };
  }
}
