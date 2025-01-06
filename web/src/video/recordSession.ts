import { FaceLandmarkerResult } from "@mediapipe/tasks-vision";
import { getEyesAreaRatio } from "./eyes";
import { postBlinks } from "@/api/blinks/postBlinks";
import { Session } from "next-auth";

const HISTORY_SIZE = 200;
export const UPDATE_INTERVAL_MIN = 0.2;

export default class RecordSession {
  private session: Session;
  public startTimeIso8601: string;
  public blinkCounts: number[] = [0];
  public onBlink: () => void = () => {};

  private ratioHistory: number[] = [];
  private lastTime: number;
  private successTime: number = 0;
  private isBlinked: boolean = false;
  private serverUploadTimeMinute: number = UPDATE_INTERVAL_MIN;

  constructor(
    startTimeIso8601: string,
    session: Session,
    onBlink: () => void = () => {},
  ) {
    this.startTimeIso8601 = startTimeIso8601;
    this.lastTime = new Date(startTimeIso8601).getTime();
    this.session = session;
    this.onBlink = onBlink;
  }

  private get elapsedTime() {
    return new Date().getTime() - new Date(this.startTimeIso8601).getTime();
  }
 
  public update = (faceLandmarkerResult: FaceLandmarkerResult) => {
    const eyesAreaRatio = getEyesAreaRatio(faceLandmarkerResult);
    const current = new Date().getTime();
    if (isNaN(eyesAreaRatio) || eyesAreaRatio == 0) {
      this.lastTime = current;
      return;
    }

    this.ratioHistory.push(eyesAreaRatio);
    if (this.ratioHistory.length > HISTORY_SIZE) {
      this.ratioHistory.shift();
    }

    this.successTime += current - this.lastTime;
    this.lastTime = current;

    const nowBlinked = this.getIsBlinked();
    if (nowBlinked && !this.isBlinked) {
      this.blinkCounts[this.blinkCounts.length - 1] += 1;
    }
    this.isBlinked = nowBlinked;

    if (this.successTime > this.serverUploadTimeMinute * 60 * 1000) {
      this.serverUploadTimeMinute += UPDATE_INTERVAL_MIN;
      postBlinks(this.startTimeIso8601, this.elapsedTime / 60 / 1000, this.blinkCounts.at(-1)!, this.session)
      this.blinkCounts.push(0);
    }
  }

  private getIsBlinked = () => {
    if (this.ratioHistory.length < HISTORY_SIZE * 0.3) return false;

    const averageRatio =
      this.ratioHistory.reduce((a, b) => a + b, 0) / this.ratioHistory.length;

    return this.ratioHistory.at(-1)! < averageRatio * 0.8;
  }
}