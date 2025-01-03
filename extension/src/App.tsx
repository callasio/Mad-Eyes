import './App.css'
import { faceLandmarker } from './video/faceLandmark'
import { useEffect, useRef, useState } from 'react';
import { startWebcam } from './video/webcam';
import { FaceLandmarker } from '@mediapipe/tasks-vision';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let faceLandmarkerInstance: FaceLandmarker | null = null;
    let animationFrameId: number;

    const setup = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) {
        return;
      }

      const stream = await startWebcam();
      video.srcObject = stream;
      await video.play();

      faceLandmarkerInstance = await faceLandmarker();

      const render = async () => {
        if (!isRecording) {
          cancelAnimationFrame(animationFrameId);
          return;
        }
        
        if (!faceLandmarkerInstance) {
          return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const results = await faceLandmarkerInstance.detect(video);

        if (results.faceLandmarks) {
          for (const landmarks of results.faceLandmarks) {
            landmarks.forEach((landmark) => {
              ctx.beginPath();
              ctx.arc(
                landmark.x * canvas.width,
                landmark.y * canvas.height,
                2, // Radius of the point
                0,
                2 * Math.PI
              );
              ctx.fillStyle = "red";
              ctx.fill();
            })}}

        animationFrameId = requestAnimationFrame(render);
      }

      render();
    }
    
    setup();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (faceLandmarkerInstance) faceLandmarkerInstance.close();
    };
  }, [isRecording]);

  return (
    <>
      <div>
      <video
        ref={videoRef}
        style={{ display: "none" }}
        playsInline
        muted
      ></video>
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ border: "1px solid black" }}
      ></canvas>
    </div>
      <div className="card">
        <button onClick={() => { setIsRecording(!isRecording) }}>
          {
            isRecording
              ? "Stop Recording"
              : "Start Recording"
          }
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
