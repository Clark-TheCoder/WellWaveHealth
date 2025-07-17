import {
  activateAudio,
  deactivateAudio,
} from "../../../../utils/media/audioSettings.js";

export const callAudioSettings = {
  stream: null,
  enabled: false,
};

export async function turnMicOn() {
  const stream = await activateAudio();
  if (!stream) return;

  callAudioSettings.stream = stream;
  callAudioSettings.enabled = true;

  document.getElementById("volume_image").src = "/media/images/volume_on.png";
  sessionStorage.setItem("audioState", "true");

  // In the future: peerConnection.addTrack(track, stream)
}

export async function turnMicOff() {
  await deactivateAudio();
  callAudioSettings.stream = null;
  callAudioSettings.enabled = false;

  document.getElementById("volume_image").src = "/media/images/volume_off.png";
  sessionStorage.setItem("audioState", "false");
}

export async function toggleAudio() {
  const audioState = sessionStorage.getItem("audioState");
  if (audioState === "false") {
    await turnMicOn();
  } else {
    await turnMicOff();
  }
}
