export async function activateAudio() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return stream;
  } catch (error) {
    console.log("Mic access error:", error);
  }
}

export async function deactivateAudio(streamSource) {
  const stream = streamSource.srcObject;
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    streamSource.srcObject = null;
  }
}
