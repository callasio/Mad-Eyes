import GradientChart from '@/components/GradientChart';
import { themeColor } from '@/constants/colors';
import { LineChart } from '@mui/x-charts';
import React, { useEffect, useState } from 'react';



const BlinkChart: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '200px', backgroundColor: '#FFFFFF' }}>
    <GradientChart xAxis={[
      { data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
    ]} data={[
      0, 1, 2, 3, 3,
    ]} color={themeColor.primary}    
    />
    </div>
  );
};

export default BlinkChart;