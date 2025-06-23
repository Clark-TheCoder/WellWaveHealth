import {
  activateAudio,
  deactivateAudio,
} from "../../../utils/audioSettings.js";

export const audioSettings = { enabled: false };

export async function toggleAudioSettings(audioButton, audioImage, audio) {
  if (audioButton.classList.contains("selected")) {
    await deactivateAudio(audio);
    audioButton.classList.remove("selected");
    audioImage.src = "/media/images/volume_off.png";
    audioSettings.enabled = false;
  } else {
    audio.srcObject = await activateAudio();
    audioButton.classList.add("selected");
    audioImage.src = "/media/images/volume_on.png";
    audioSettings.enabled = true;
  }
}
