import { FaceLandmarkerResult } from "@mediapipe/tasks-vision";

export interface Point {
  x: number;
  y: number;
}

const RightEyeIndex = [
  33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7,
  33,
];

const LeftEyeIndex = [
  362, 398, 384, 385, 386, 387, 388, 466, 388, 374, 373, 372, 464, 463, 381,
  380, 362,
];

const RightEyeEndsIndex = [33, 133];
const LeftEyeEndsIndex = [362, 263];

const FaceBorderIndex = [
  10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378,
  400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21,
  54, 103, 67, 109, 10,
];

export function getEyesCenter(landmarkderResults: FaceLandmarkerResult, width: number, height: number): [Point, Point] {
  const leftEyeEnds = getPoints(landmarkderResults, LeftEyeEndsIndex);
  const rightEyeEnds = getPoints(landmarkderResults, RightEyeEndsIndex);

  if (leftEyeEnds.length !== 2 || rightEyeEnds.length !== 2) {
    return [{ x: 0, y: 0 }, { x: 0, y: 0 }];
  }

  const leftEyeCenter = {
    x: (leftEyeEnds[0].x + leftEyeEnds[1].x) / 2 * width,
    y: (leftEyeEnds[0].y + leftEyeEnds[1].y) / 2 * height,
  };

  const rightEyeCenter = {
    x: (rightEyeEnds[0].x + rightEyeEnds[1].x) / 2 * width,
    y: (rightEyeEnds[0].y + rightEyeEnds[1].y) / 2 * height,
  };

  return [leftEyeCenter, rightEyeCenter];
}

export function getEyesLength(landmarkderResults: FaceLandmarkerResult, width: number, height: number): [number, number] {
  const leftEyeEnds = getPoints(landmarkderResults, LeftEyeEndsIndex);
  const rightEyeEnds = getPoints(landmarkderResults, RightEyeEndsIndex);

  if (leftEyeEnds.length !== 2 || rightEyeEnds.length !== 2) {
    return [0, 0];
  }

  const leftEyeLength = Math.sqrt(
    Math.pow((leftEyeEnds[0].x - leftEyeEnds[1].x) * width, 2) +
    Math.pow((leftEyeEnds[0].y - leftEyeEnds[1].y) * height, 2)
  );

  const rightEyeLength = Math.sqrt(
    Math.pow((rightEyeEnds[0].x - rightEyeEnds[1].x) * width, 2) +
    Math.pow((rightEyeEnds[0].y - rightEyeEnds[1].y) * height, 2)
  );

  return [leftEyeLength, rightEyeLength];
}

export function getEyesAreaRatio(landmarkderResults: FaceLandmarkerResult): number {
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
