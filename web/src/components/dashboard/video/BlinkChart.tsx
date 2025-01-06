import React from "react";
import GradientChart from "@/components/GradientChart";
import { useRecording } from "@/video/RecordingProvider";

const BlinkChart: React.FC = () => {
  const { recordSession } = useRecording();



  const xAxisData = recordSession ?
    recordSession.blinkCounts.map((_, index) => index) : [1, 2, 3, 5, 8, 10, 12, 15, 16, 18, 20];

  const data = recordSession ? 
    recordSession.blinkCounts : [2, 5, 6.5, 3, 8, 10, 9.5, 2.5, 6, 10, 8];

  return (
    <GradientChart
      xAxisData={xAxisData}
      data={data}
      colors={[
        "#43B3AE",  // Soft sea green
        "#207F79"   // Deep sea green
      ]}
    />
  );
};

export default BlinkChart;