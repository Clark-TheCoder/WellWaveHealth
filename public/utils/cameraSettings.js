export async function activateCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    return stream;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function deactivateCamera(streamSource) {
  let stream = streamSource.srcObject;
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
}
