import Stack from "@mui/material/Stack";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { LineChart, areaElementClasses } from "@mui/x-charts/LineChart";

interface GradientChartProps {
  xAxis: { data: number[] }[];
  data: number[];
  colors: string[];
}

export default function GradientChart({
  xAxis,
  data,
  colors,
}: GradientChartProps) {
  return (
    <Stack direction="column" width="100%" spacing={1}>
      <LineChart
        xAxis={xAxis}
        yAxis={[
          {
            min: 0,
            max: Math.max(...data) * 1.2,
          },
        ]}
        series={[{ data, showMark: false, area: true }]}
        height={300}
        tooltip={{ trigger: "none" }}
        disableAxisListener
        disableLineItemHighlight
        axisHighlight={{ x: "none", y: "none" }}
        colors={colors}
        sx={{
          [`& .${areaElementClasses.root}`]: {
            fill: "url(#paint0_linear_45_2)",
          },
        }}
      >
        <ColorPalette id="paint0_linear_45_2" colors={colors} />
      </LineChart>
    </Stack>
  );
}

function ColorPalette({ id, colors }: { id: string; colors: string[] }) {
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height; // You can provide the axis Id if you have multiple ones

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
        <stop stopColor={colors[0]} />
        <stop offset="1" stopColor={colors[1]}/>
      </linearGradient>
    </defs>
  );
}
