import React from "react";
import GradientChart from "@/components/GradientChart";

const BlinkChart: React.FC = () => {
  return (
    <GradientChart
      xAxisData={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
      data={[3, 1, 2, 1, 3, 2,1,3,3,3]}
      colors={[
        "#43B3AE",  // Soft sea green
        "#207F79"   // Deep sea green
      ]}
    />
  );
};

export default BlinkChart;