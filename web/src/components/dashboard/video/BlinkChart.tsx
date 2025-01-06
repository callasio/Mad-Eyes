import React, { useEffect } from "react";
import GradientChart from "@/components/GradientChart";
import { useRecording } from "@/video/RecordingProvider";

const BlinkChart: React.FC = () => {
  const { recordSession, isRecording } = useRecording();

  const backXAxisData = [1, 2, 3, 5, 8, 10, 12, 15, 16, 18, 20];
  const backData = [2, 5, 6.5, 3, 8, 10, 9.5, 2.5, 6, 10, 8];

  const [xAxisData, setXAxisData] = React.useState<number[]>([]);
  const [data, setData] = React.useState<number[]>([]);

  useEffect(() => {
    if (isRecording) {
      setXAxisData([0, 1]);
      setData([10, 10]);
    }
  }, [isRecording]);

  useEffect(() => {
    const interval = setInterval(() => {
      let displayCounts = recordSession?.blinkCounts || [];
      if (displayCounts.length <= 2) {
        displayCounts = [10, 10];
      } else if (displayCounts.length >= 3) {
        displayCounts = displayCounts.slice(0, -1);
      }
      setXAxisData(displayCounts.map((_, index) => index));
      setData(displayCounts);
    }, 500);

    return () => clearInterval(interval);
  }, [recordSession, isRecording]);

  return (
    <GradientChart
      xAxisData={isRecording ? xAxisData : backXAxisData}
      data={isRecording ? data : backData}
      colors={[
        "#43B3AE",  // Soft sea green
        "#207F79"   // Deep sea green
      ]}
    />
  );
};

export default BlinkChart;