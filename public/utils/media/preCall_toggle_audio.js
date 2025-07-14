import { activateAudio, deactivateAudio } from "./audioSettings.js";

export const audioSettings = { enabled: false };

export async function toggleAudioSettings(audioButton, audioImage, audio) {
  const micOn = sessionStorage.getItem("audioState") === "true";

  if (micOn) {
    await deactivateAudio(audio);
    audio.srcObject = null;
    audioButton.classList.remove("selected");
    audioImage.src = "/media/images/volume_off.png";
    audioSettings.enabled = false;
    sessionStorage.setItem("audioState", "false");
  } else {
    audio.srcObject = await activateAudio();
    audio.muted = true;
    await audio.play();
    audioButton.classList.add("selected");
    audioImage.src = "/media/images/volume_on.png";
    audioSettings.enabled = true;
    sessionStorage.setItem("audioState", "true");
  }
}
