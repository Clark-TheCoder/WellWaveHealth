import {
  activateCamera,
  deactivateCamera,
} from "../../../../utils/cameraSettings.js";

const providerVideoPlaceholder = document.querySelector(".provider_video");
const providerVideo = document.querySelector(".provider_video_on");
const cameraIcon = document.getElementById("camera_image");

export async function toggleCamera() {
  if (providerVideoPlaceholder.classList.contains("hidden")) {
    await deactivateCamera(providerVideo);
    cameraIcon.src = "/media/images/camera_off.png";
  } else {
    providerVideo.srcObject = await activateCamera();
    cameraIcon.src = "/media/images/camera_on.png";
  }

  providerVideoPlaceholder.classList.toggle("hidden");
  providerVideo.classList.toggle("hidden");
}
