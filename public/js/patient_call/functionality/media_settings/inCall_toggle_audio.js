import {
  activateAudio,
  deactivateAudio,
} from "../../../../utils/media/audioSettings.js";

const audioIcon = document.getElementById("volume_image");

export let callAudioSettings = {
  stream: null,
  enabled: false,
};

export async function turnMicOn() {
  const stream = await activateAudio();
  if (!stream) return;

  callAudioSettings.stream = stream;
  callAudioSettings.enabled = true;

  audioIcon.src = "/media/images/volume_on.png";
  sessionStorage.setItem("audioState", "true");

  // Future: Add tracks to WebRTC peer connection here
}

export async function turnMicOff() {
  await deactivateAudio();
  callAudioSettings.stream = null;
  callAudioSettings.enabled = false;

  audioIcon.src = "/media/images/volume_off.png";
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
