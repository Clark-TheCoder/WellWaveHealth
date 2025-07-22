export async function startCallTime(access_token) {
  try {
    let response = await fetch("/call/start_call_time", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        access_token: access_token,
      }),
    });

    let data = await response.json();
    if (data) {
      return data.startTime;
    } else {
      /***make custom error message */
      return data.message;
    }
    //this will be the start time
  } catch (error) {
    console.log("error");
  }
}
