const audioImage = document.getElementById("audio_image");
const audio = document.createElement("audio");
audio.autoplay = true;

audio.style.display = "none";
document.body.appendChild(audio);

const audioButton = document.getElementById("audio_button");
audioButton.addEventListener("click", () =>
  toggleAudioSettings(audioButton, audioImage, audio)
);
