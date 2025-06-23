import {
  activateCamera,
  deactivateCamera,
} from "../../../utils/cameraSettings.js";

export const cameraSettings = { enabled: false };

export async function toggleCameraSettings(
  cameraButton,
  cameraImage,
  videoPreview,
  cameraPlaceholder
) {
  if (cameraButton.classList.contains("selected")) {
    await deactivateCamera(videoPreview);
    cameraButton.classList.remove("selected");
    cameraImage.src = "/media/images/camera_off.png";
    cameraPlaceholder.style.display = "flex";
    videoPreview.srcObject = null;
    videoPreview.style.display = "none";
    cameraSettings.enabled = false;
  } else {
    videoPreview.srcObject = await activateCamera();
    videoPreview.style.display = "block";
    cameraButton.classList.add("selected");
    cameraImage.src = "/media/images/camera_on.png";
    cameraPlaceholder.style.display = "none";
    cameraSettings.enabled = true;
  }
}
