navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    const videoElement = document.createElement("video");
    videoElement.srcObject = stream;
    videoElement.autoplay = true;
    document.body.appendChild(videoElement);
  })
  .catch((error) => {
    console.error("Error accessing the camera", error);
  });