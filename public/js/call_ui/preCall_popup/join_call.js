export async function joinCall(call, videoStream) {
  try {
    let response = await fetch("/call/join/doctor", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ accessToken: call.access_token }),
    });
    const data = await response.json();
    if (response.ok) {
      window.location.href = "/call/doctor_call_view";
      console.log(videoStream);
    } else {
      console.log("no");
    }
  } catch (error) {
    console.error("Join call error:", error);
  }
}
