let currentAudioStream = null;

export async function activateAudio() {
  try {
    if (currentAudioStream) return currentAudioStream;

    currentAudioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    return currentAudioStream;
  } catch (error) {
    console.log("Mic access error:", error);
    return null;
  }
}

export async function deactivateAudio() {
  if (currentAudioStream) {
    currentAudioStream.getTracks().forEach((track) => track.stop());
    currentAudioStream = null;
  }
}
