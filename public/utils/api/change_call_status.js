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

// export async function changeCallStatus(updatedStatus, access_token) {
//   try {
//     const response = await fetch("/call/change_call_status", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ updatedStatus, access_token }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//return value to use for styling the calls on the scheduled calls webpage Maybe??
//return data.newCallStatus;

//think this is fine for now, seems to work since my fetch calls returns the call with the status in it anyways
//       return data.message;
//     } else {
//       return "Error";
//     }
//   } catch (error) {
//     console.error("Fetch failed:", error.message, error);
//   }
// }
