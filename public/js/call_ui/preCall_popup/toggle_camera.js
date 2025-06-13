import {
  activateCamera,
  deactivateCamera,
} from "../../../utils/cameraSettings.js";

export let cameraSettings = false;

export async function toggleCameraSettings(
  cameraButton,
  videoPreview,
  cameraPlaceholder
) {
  if (cameraButton.classList.contains("selected")) {
    await deactivateCamera(videoPreview);
    cameraButton.classList.remove("selected");
    cameraPlaceholder.style.display = "flex";
    videoPreview.srcObject = null;
    videoPreview.style.display = "none";
    cameraSettings = false;
  } else {
    videoPreview.srcObject = await activateCamera();
    videoPreview.style.display = "block";
    cameraButton.classList.add("selected");
    cameraPlaceholder.style.display = "none";
    cameraSettings = true;
  }
}
