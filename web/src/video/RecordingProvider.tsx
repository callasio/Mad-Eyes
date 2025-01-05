"use client";

import React, { createContext, useEffect } from "react";
import { faceLandmarker, getWebcam, stopWebcam } from "@/video/faceMesh";
import { getIsBlinked } from "./eyes";

const RecordingContext = createContext<{
  isRecording: boolean;
  isWebcamOn: boolean;
  setIsRecording: (isRecording: boolean) => void;
  setOnBlink: (onBlink: () => void) => void;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
}>({
  isRecording: false,
  isWebcamOn: false,
  setIsRecording: () => {},
  setOnBlink: () => {},
});

export const RecordingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [blinkCount, setBlinkCount] = React.useState<number>(0);
  const [isBlinked, setIsBlinked] = React.useState<boolean>(false);
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const [isWebcamOn, setIsWebcamOn] = React.useState<boolean>(false);

  const [onBlink, setOnBlink] = React.useState<() => void>(() => () => {});

  const getFaceLandmark = async () => {
    const faceLandmarkerInstance = await faceLandmarker();
    let animationFrameId: number = -1;

    if (isRecording) {
      const webcam = await getWebcam();

      // video.style.display = 'none';
      videoRef.current!.srcObject = webcam;
      videoRef.current!.autoplay = true;
      setIsWebcamOn(true);
      videoRef.current!.onloadedmetadata = () => {
        renderLoop();
      };
    } else {
      cancelAnimationFrame(animationFrameId);
      await stopWebcam();
      setIsWebcamOn(false);
      return;
    }

    function renderLoop(lastVideoTime: number = -1) {
      if (!isRecording || videoRef.current === null) {
        return;
      }

      const currentTime = videoRef.current?.currentTime ?? 0;
      if (currentTime !== lastVideoTime) {
        const result = faceLandmarkerInstance.detect(videoRef.current!);
        setIsBlinked(getIsBlinked(result));
      }

      animationFrameId = requestAnimationFrame(() => renderLoop(currentTime));
    }
  };

  useEffect(() => {
    getFaceLandmark();
  }, [isRecording]);

  useEffect(() => {
    if (isBlinked) {
      onBlink();
      setBlinkCount(blinkCount + 1);
    }
  }, [isBlinked]);

  return (
    <RecordingContext.Provider
      value={{ isRecording, isWebcamOn, setIsRecording, videoRef, setOnBlink }}
    >
      {isRecording && (
        <video
          ref={videoRef}
          style={{
            display: "none",
          }}
        />
      )}
      {children}
    </RecordingContext.Provider>
  );
};

export const useRecording = () => React.useContext(RecordingContext);
