import {
  activateAudio,
  deactivateAudio,
} from "../../../utils/audioSettings.js";

export let audioSettings = false;

export async function toggleAudioSettings(audioButton, audioImage, audio) {
  if (audioButton.classList.contains("selected")) {
    await deactivateAudio(audio);
    audioButton.classList.remove("selected");
    audioImage.src = "/media/images/volume_off.png";
    audioSettings = false;
  } else {
    audio.srcObject = await activateAudio();
    audioButton.classList.add("selected");
    audioImage.src = "/media/images/volume_on.png";
    audioSettings = true;
  }
}
