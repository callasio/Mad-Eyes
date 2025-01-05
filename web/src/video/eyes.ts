import { FaceLandmarkerResult } from "@mediapipe/tasks-vision";

interface Point {
  x: number;
  y: number;
}

const HISTORY_SIZE = 200;

const RightEyeIndex = [
  33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7,
  33,
];

const LeftEyeIndex = [
  362, 398, 384, 385, 386, 387, 388, 466, 388, 374, 373, 372, 464, 463, 381,
  380, 362,
];

const FaceBorderIndex = [
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378,
  400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21,
  54, 103, 67, 109, 10,
];

let ratioHistory: number[] = [];

export function getIsBlinked(
  landmarkderResults: FaceLandmarkerResult,
): boolean {
  const eyesAreaRatio = getEyesAreaRatio(landmarkderResults);
  updateRatioHistory(eyesAreaRatio);

  if (ratioHistory.length < HISTORY_SIZE * 0.3) return false;

  const averageRatio =
    ratioHistory.reduce((a, b) => a + b, 0) / ratioHistory.length;

  return eyesAreaRatio < averageRatio * 0.8;
}

function updateRatioHistory(ratio: number) {
  if (isNaN(ratio)) return;
  ratioHistory.push(ratio);
  if (ratioHistory.length > HISTORY_SIZE) {
    ratioHistory.shift();
  }
}

function getEyesAreaRatio(landmarkderResults: FaceLandmarkerResult): number {
  const leftEyeArea = getFacePointsArea(landmarkderResults, LeftEyeIndex);
  const rightEyeArea = getFacePointsArea(landmarkderResults, RightEyeIndex);
  const faceArea = getFacePointsArea(landmarkderResults, FaceBorderIndex);

  const leftEyeAreaRatio = leftEyeArea / faceArea;
  const rightEyeAreaRatio = rightEyeArea / faceArea;

  const eyesAreaRatio = (leftEyeAreaRatio + rightEyeAreaRatio) / 2;

  return eyesAreaRatio;
}

function getFacePointsArea(
  landmarkderResults: FaceLandmarkerResult,
  index: number[],
): number {
  const points = getPoints(landmarkderResults, index);
  return calculateArea(points);
}

function getPoints(
  landmarkderResults: FaceLandmarkerResult,
  index: number[],
): Point[] {
  const eyeArea: Point[] = index
    .map((index) => {
      return {
        x: landmarkderResults.faceLandmarks?.at(0)?.at(index)?.x,
        y: landmarkderResults.faceLandmarks?.at(0)?.at(index)?.y,
      };
    })
    .filter(
      (point): point is Point => point.x !== undefined && point.y !== undefined,
    );

  return eyeArea;
}

function calculateArea(points: Point[]): number {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    area += points[i].x * points[j].y;
    area -= points[i].y * points[j].x;
  }
  return area / 2;
}
