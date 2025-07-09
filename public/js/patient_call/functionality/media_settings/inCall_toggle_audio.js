import {
  activateAudio,
  deactivateAudio,
} from "../../../../utils/media/audioSettings.js";

const providerAudio = document.getElementById("provider_audio");
const audioIcon = document.getElementById("volume_image");

export async function turnMicOn() {
  providerAudio.srcObject = await activateAudio();
  providerAudio.muted = true;
  await providerAudio.play();
  audioIcon.src = "/media/images/volume_on.png";
  sessionStorage.setItem("audioState", "true");
}

export async function turnMicOff() {
  await deactivateAudio(providerAudio);
  providerAudio.srcObject = null;
  audioIcon.src = "/media/images/volume_off.png";
  sessionStorage.setItem("audioState", "false");
}

export async function toggleAudio() {
  const audioState = sessionStorage.getItem("audioState");
  const providerAudio = document.getElementById("provider_audio");
  const audioIcon = document.getElementById("volume_image");
  if (audioState === "false") {
    providerAudio.srcObject = await activateAudio();
    providerAudio.muted = true;
    await providerAudio.play();
    audioIcon.src = "/media/images/volume_on.png";
    sessionStorage.setItem("audioState", "true");
  } else if (audioState === "true") {
    await deactivateAudio(providerAudio);
    providerAudio.srcObject = null;
    audioIcon.src = "/media/images/volume_off.png";
    sessionStorage.setItem("audioState", "false");
  }
}
