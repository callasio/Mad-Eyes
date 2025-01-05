import GradientChart from "@/components/GradientChart";
import React from "react";

const BlinkChart: React.FC = () => {
  return (
    <GradientChart
      xAxis={[{ data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }]}
      data={[0, 1, 2, 3, 3]}
      colors={[
        "#8176AF",
        "#C0B7E8"
      ]}
    />
  );
};

export default BlinkChart;
