import React, { useEffect } from "react";
import BlinkChart from "./BlinkChart";
import { themeColor } from "@/constants/colors";
import { useRecording } from "@/video/RecordingProvider";
import GradientButton from "@/components/GradientButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Header2 from "@/components/typography/Header2";
const VideoFrame: React.FC = () => {
  const {
    isRecording,
    setIsRecording,
    isWebcamOn,
    videoRef,
    recordSession,
    setOnBlink,
  } = useRecording();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const screenVideoRef = React.useRef<HTMLVideoElement>(null);

  let animationId: number = -1;

  const mapVideoToCanvasCoordinates = (
    videoX: number,
    videoY: number,
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement
  ) => {
    const videoRatio = video.videoWidth / video.videoHeight;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > videoRatio) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * videoRatio;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = canvas.width / videoRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    const canvasX = offsetX + (videoX / video.videoWidth) * drawWidth;
    const canvasY = offsetY + (videoY / video.videoHeight) * drawHeight;

    return { x: canvasX, y: canvasY };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (screenVideoRef.current && videoRef?.current) {
      screenVideoRef.current.srcObject = videoRef.current.srcObject;
    } else if (screenVideoRef.current) {
      screenVideoRef.current.srcObject = null;
    }

    if (isWebcamOn && videoRef?.current) {
      let frameCount = 0;
      const render = () => {
        if (!isWebcamOn || !videoRef.current || !canvas || !ctx) {
          cancelAnimationFrame(animationId);
          return;
        }

        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);

        if (recordSession && videoRef.current) {
          const video = videoRef.current;
          const [leftEyeCenter, rightEyeCenter] = recordSession.eyesCenter;
          const [leftEyeLength, rightEyeLength] = recordSession.eyesLength;

          const leftEyeCanvasCenter = mapVideoToCanvasCoordinates(
            leftEyeCenter.x,
            leftEyeCenter.y,
            video,
            canvas
          );

          const rightEyeCanvasCenter = mapVideoToCanvasCoordinates(
            rightEyeCenter.x,
            rightEyeCenter.y,
            video,
            canvas
          );

          frameCount += 1;
          const sizeMutiplier = 1 + 0.1 * Math.sin(frameCount / 10);
          ctx.beginPath();

          ctx.arc(
            leftEyeCanvasCenter.x,
            leftEyeCanvasCenter.y,
            (leftEyeLength * sizeMutiplier) / 4,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = themeColor.bright;
          ctx.fill();

          ctx.arc(
            rightEyeCanvasCenter.x,
            rightEyeCanvasCenter.y,
            (rightEyeLength * sizeMutiplier) / 4,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = themeColor.bright;
          ctx.fill();
        }

        animationId = requestAnimationFrame(render);
      };

      render();
    } else {
      ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
      cancelAnimationFrame(animationId);
    }
  }, [isWebcamOn, recordSession, videoRef, screenVideoRef]);

  return (
    <div
      style={{
        flexDirection: "column",
        width: "100%",
        flex: 1,
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "40px",
          justifyContent: "flex-start",
          marginLeft: "50px",
        }}
      >
        <VisibilityIcon
          style={{
            verticalAlign: "middle",
            marginRight: "8px",
          }}
        />
        <Header2
          text="EYE TRACK"
          style={{
            marginTop: "0px",
            marginBottom: "0px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "40px",
          marginTop: "15px",
          gap: "40px",
        }}
      >
        <div
          style={{
            background: "radial-gradient(circle at center, #2D2D3A, #1E1E28)",
            borderRadius: "25px",
            flex: 2,
            overflow: "hidden",
            height: "400px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {!isWebcamOn && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "#26233566",
                backdropFilter: "blur(10px)",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "white", margin: 0, padding: "20px" }}>
                Blink Detection
              </h2>
              <p style={{ color: "white", margin: 0, padding: "20px" }}>
                Click the{" "}
                <span style={{ fontWeight: "bold" }}>
                  <PlayArrowIcon style={{ verticalAlign: "middle" }} />
                  Start Recording
                </span>{" "}
                button!
              </p>
            </div>
          )}
          <BlinkChart />
        </div>

        <div
          style={{
            flex: 1,
            height: "400px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            <video
              ref={screenVideoRef}
              autoPlay
              muted
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#262335",
                width: "100%",
                height: "100%",
                borderRadius: "25px",
                objectFit: "cover",
                transform: "scaleX(-1)",
                zIndex: 0,
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "25px",
                transform: "scaleX(-1)",
                zIndex: 1,
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              zIndex: 3,
            }}
          >
            <GradientButton
              style={{
                width: "100%",
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                setIsRecording(!isRecording);
              }}
            >
              <div
                style={{
                  flexDirection: "row",
                  gap: 10,
                  display: "flex",
                  alignItems: "center",
                  background: "transparent",
                }}
              >
                {isRecording ? <PauseIcon /> : <PlayArrowIcon />}
                {isRecording ? "Stop Recording" : "Start Recording"}
              </div>
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoFrame;
