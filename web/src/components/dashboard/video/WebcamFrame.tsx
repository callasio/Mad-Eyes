import React, { useEffect } from 'react';
import BlinkChart from './BlinkChart';
import { themeColor } from '@/constants/colors';
import { useRecording } from '@/video/RecordingProvider';
import GradientButton from '@/components/GradientButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';


const VideoFrame: React.FC = () => {
  const { isRecording, setIsRecording, isWebcamOn, videoRef, setOnBlink } = useRecording();

  const ref = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setOnBlink(() => () => {
      console.log("Blinked!");
    })
    if (isWebcamOn && ref.current && videoRef?.current) {
      ref.current.srcObject = videoRef.current.srcObject;
    } else {
      if (ref.current)
        ref.current!.srcObject = null;
    }
  }, [isWebcamOn, ref]);

  return (
    <div style={{
      display: "flex",
      width: "90%", // 프레임 너비,
      maxWidth: "1200px",
      flexDirection: "row",
      margin: "40px",
      gap: "40px"
    }}>
      <div
        style={{
          backgroundColor: "#262335",
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
              Click the button above to start recording and see the blink
              detection in action!
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
        <video
          ref={ref}
          style={{
            backgroundColor: "#262335",
            width: "100%",
            height: "100%",
            borderRadius: "25px",
            objectFit: "cover",
          }}
          autoPlay
          playsInline
          muted
        />
        <div style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}>
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
              {isRecording ? <PlayArrowIcon /> : <PauseIcon />}
              {isRecording ? "Stop Recording" : "Start Recording"}
            </div>
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default VideoFrame;