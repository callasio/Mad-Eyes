import * as React from 'react';
import { ScaleLinear } from 'd3-scale';
import { green, red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import { useYScale, useDrawingArea } from '@mui/x-charts/hooks';
import { LineChart, areaElementClasses } from '@mui/x-charts/LineChart';

interface GradientChartProps {
  xAxis: { data: number[] }[];
  data: number[];
  color: string;
}

export default function GradientChart({
  xAxis,
  data,
  color,
}: GradientChartProps) {
  return (
    <Stack direction="column" width="100%" spacing={1}>
      <LineChart
        xAxis={xAxis}
        yAxis={[{
          min: 0,
          max: Math.max(...data) * 1.2,
        }]}
        series={[{ data, showMark: false, area: true }]}
        height={200}
        margin={{ top: 20, bottom: 30, left: 75 }}
        colors={[
          color
        ]}
        sx={{
          [`& .${areaElementClasses.root}`]: {
            fill: 'url(#paint0_linear_45_2)',
          },
        }}
      >
        <ColorPalette id="paint0_linear_45_2" color={color} />
      </LineChart>
    </Stack>
  );
}

function ColorPalette({ id, color }: { id: string; color: string }) {
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;// You can provide the axis Id if you have multiple ones

  return (
    <defs>
      <linearGradient
        id={id}
        x1="0"
        x2="0"
        y1="0"
        y2={`${svgHeight}px`}
        gradientUnits="userSpaceOnUse" // Use the SVG coordinate instead of the component ones.
      >
        <stop stop-color={color} stop-opacity="0.4" />
        <stop offset="1" stop-color={color} stop-opacity="0"/>
      </linearGradient>
    </defs>
  );
}
