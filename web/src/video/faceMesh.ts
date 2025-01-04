import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const vision = FilesetResolver.forVisionTasks(
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
);

export async function faceLandmarker() {
  return await FaceLandmarker.createFromOptions(
    await vision,
    {
      baseOptions: {
        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      },
    }
  );
}

export async function getWebcam(): Promise<MediaStream> {
  return await navigator.mediaDevices.getUserMedia({ video: true });
}


