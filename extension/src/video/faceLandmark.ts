import { FaceLandmarker, FaceLandmarkerResult, FilesetResolver } from "@mediapipe/tasks-vision";
import image from "../assets/face-photo.jpg";

const faceLandmarkUrl = "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

async function getVision() {

  return FilesetResolver.forVisionTasks(
    '/tasks-vision'
  );
}

export async function faceLandmarker(): Promise<FaceLandmarker> {
  return await FaceLandmarker.createFromOptions(
    await getVision(), {
      baseOptions: { 
        modelAssetPath: faceLandmarkUrl,
        delegate: "GPU",
      }
    });
  }

export async function testFaceLandmarker(): Promise<FaceLandmarkerResult> {
  console.log("testing faceLandmarker");
  const img = new Image();
  img.src = image;
  console.log("image loaded");
  await new Promise((resolve) => {
    img.onload = resolve;
  });
  const results = await faceLandmarker().then(landmarker => landmarker.detect(img));
  return results;
}