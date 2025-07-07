import {
  activateCamera,
  deactivateCamera,
} from "../../../../utils/media/cameraSettings.js";

const providerVideoPlaceholder = document.querySelector(".provider_video");
const providerVideo = document.querySelector(".provider_video_on");
const cameraIcon = document.getElementById("camera_image");

export async function turnCameraOn() {
  providerVideo.srcObject = await activateCamera();
  cameraIcon.src = "/media/images/camera_on.png";
  providerVideoPlaceholder.classList.add("hidden");
  providerVideo.classList.remove("hidden");
  sessionStorage.setItem("cameraState", "true");
}

export async function turnCameraOff() {
  await deactivateCamera(providerVideo);
  cameraIcon.src = "/media/images/camera_off.png";
  providerVideoPlaceholder.classList.remove("hidden");
  providerVideo.classList.add("hidden");
  sessionStorage.setItem("cameraState", "false");
}

export async function toggleCamera(cameraOn) {
  if (cameraOn === "true") {
  }
  if (providerVideoPlaceholder.classList.contains("hidden")) {
    await deactivateCamera(providerVideo);
    cameraIcon.src = "/media/images/camera_off.png";
    sessionStorage.setItem("cameraState", "false");
  } else {
    providerVideo.srcObject = await activateCamera();
    cameraIcon.src = "/media/images/camera_on.png";
    sessionStorage.setItem("cameraState", "true");
  }

  providerVideoPlaceholder.classList.toggle("hidden");
  providerVideo.classList.toggle("hidden");
}
