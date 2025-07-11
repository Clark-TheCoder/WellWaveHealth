import { toggleAudioSettings } from "../../../utils/media/preCall_toggle_audio.js";
import { toggleCameraSettings } from "../../../utils/media/preCall_toggle_camera.js";
import { joinCall } from "./join_call.js";

//camera settings for the pre call
const cameraImage = document.getElementById("camera_image");
const cameraButton = document.getElementById("camera_button");
const videoPreview = document.getElementById("video_preview");
const cameraPlaceholder = document.getElementById("camera_icon");
cameraButton.addEventListener("click", () =>
  toggleCameraSettings(
    cameraButton,
    cameraImage,
    videoPreview,
    cameraPlaceholder
  )
);

//audio settings for the pre call
const audioImage = document.getElementById("audio_image");
const audio = document.createElement("audio");
audio.autoplay = true;

audio.style.display = "none";
document.body.appendChild(audio);

const audioButton = document.getElementById("audio_button");
audioButton.addEventListener("click", () =>
  toggleAudioSettings(audioButton, audioImage, audio)
);

//join call button functionality
const joinButton = document.getElementById("join_call_button");
joinButton.addEventListener("click", joinCall);
