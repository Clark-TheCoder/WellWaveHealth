import {
  activateCamera,
  deactivateCamera,
} from "../../../../utils/media/cameraSettings.js";

const patientVideo = document.querySelector(".patient_video_on");
const patientVideoPlaceholder = document.querySelector(".patient_video");
const cameraIcon = document.getElementById("in_call_camera_image");

export async function turnCameraOn() {
  patientVideo.srcObject = await activateCamera();
  cameraIcon.src = "/media/images/camera_on.png";
  patientVideoPlaceholder.classList.add("hidden");
  patientVideo.classList.remove("hidden");
}

export async function turnCameraOff() {
  await deactivateCamera(patientVideo);
  cameraIcon.src = "/media/images/camera_off.png";
  patientVideoPlaceholder.classList.remove("hidden");
  patientVideo.classList.add("hidden");
  patientVideo.classList.remove("hidden");
}

export async function toggleCamera() {
  if (patientVideoPlaceholder.classList.contains("hidden")) {
    await deactivateCamera(patientVideo);
    cameraIcon.src = "/media/images/camera_off.png";
    sessionStorage.setItem("cameraState", "false");
  } else {
    patientVideo.srcObject = await activateCamera();
    cameraIcon.src = "/media/images/camera_on.png";
    sessionStorage.setItem("cameraState", "true");
  }

  patientVideoPlaceholder.classList.toggle("hidden");
  patientVideo.classList.toggle("hidden");
}
