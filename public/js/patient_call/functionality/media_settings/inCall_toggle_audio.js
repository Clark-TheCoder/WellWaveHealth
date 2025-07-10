import {
  activateAudio,
  deactivateAudio,
} from "../../../../utils/media/audioSettings.js";

const patientAudio = document.getElementById("patient_audio");
const audioIcon = document.getElementById("volume_image");

export async function turnMicOn() {
  patientAudio.srcObject = await activateAudio();
  patientAudio.muted = true;
  await patientAudio.play();
  audioIcon.src = "/media/images/volume_on.png";
  sessionStorage.setItem("audioState", "true");
}

export async function turnMicOff() {
  await deactivateAudio(patientAudio);
  patientAudio.srcObject = null;
  audioIcon.src = "/media/images/volume_off.png";
  sessionStorage.setItem("audioState", "false");
}

export async function toggleAudio() {
  const audioState = sessionStorage.getItem("audioState");
  const patientAudio = document.getElementById("patient_audio");
  const audioIcon = document.getElementById("volume_image");
  if (audioState === "false") {
    patientAudio.srcObject = await activateAudio();
    patientAudio.muted = true;
    await patientAudio.play();
    audioIcon.src = "/media/images/volume_on.png";
    sessionStorage.setItem("audioState", "true");
  } else if (audioState === "true") {
    await deactivateAudio(patientAudio);
    patientAudio.srcObject = null;
    audioIcon.src = "/media/images/volume_off.png";
    sessionStorage.setItem("audioState", "false");
  }
}
