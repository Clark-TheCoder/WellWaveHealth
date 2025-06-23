export async function toggleAudio() {
  const audioIcon = document.getElementById("volume_image");
  audioIcon.src = audioIcon.src.includes("volume_off.png")
    ? "/media/images/volume_on.png"
    : "/media/images/volume_off.png";
}
