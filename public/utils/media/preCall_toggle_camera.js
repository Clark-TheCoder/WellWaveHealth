import { activateCamera, deactivateCamera } from "./cameraSettings.js";

export const cameraSettings = { enabled: false };

export async function toggleCameraSettings(
  cameraButton,
  cameraImage,
  videoPreview,
  cameraPlaceholder
) {
  const cameraOn = sessionStorage.getItem("cameraState") === "true";

  if (cameraOn) {
    await deactivateCamera(videoPreview);
    videoPreview.srcObject = null;
    videoPreview.style.display = "none";
    cameraButton.classList.remove("selected");
    cameraImage.src = "/media/images/camera_off.png";
    cameraPlaceholder.style.display = "flex";
    cameraSettings.enabled = false;
    sessionStorage.setItem("cameraState", "false");
  } else {
    videoPreview.srcObject = await activateCamera();
    videoPreview.style.display = "block";
    cameraButton.classList.add("selected");
    cameraImage.src = "/media/images/camera_on.png";
    cameraPlaceholder.style.display = "none";
    cameraSettings.enabled = true;
    sessionStorage.setItem("cameraState", "true");
  }
}
