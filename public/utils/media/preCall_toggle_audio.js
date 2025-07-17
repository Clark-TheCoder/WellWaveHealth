import { activateAudio, deactivateAudio } from "./audioSettings.js";

export const audioSettings = {
  enabled: false,
  stream: null,
};

export async function toggleAudioSettings(audioButton, audioImage) {
  if (audioButton.classList.contains("selected")) {
    // Turn mic OFF
    await deactivateAudio();
    audioSettings.enabled = false;
    audioSettings.stream = null;
    audioButton.classList.remove("selected");
    audioImage.src = "/media/images/volume_off.png";
  } else {
    // Turn mic ON
    const stream = await activateAudio();
    if (!stream) return; // failed to get mic

    audioSettings.enabled = true;
    audioSettings.stream = stream;
    audioButton.classList.add("selected");
    audioImage.src = "/media/images/volume_on.png";
  }
}
