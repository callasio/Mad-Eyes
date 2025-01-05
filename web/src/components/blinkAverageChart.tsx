import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ChartData,
} from "chart.js";

// Chart.js에서 사용될 컴포넌트 등록
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
);

// mockData 선언
const mockData = [
  {
    day: "Mon",
    hourlyBlinks: [15, 20, 18, 25, 22, 30, 35, 40, 38, 28, 26, 20],
  },
  {
    day: "Tue",
    hourlyBlinks: [18, 22, 20, 28, 30, 32, 38, 42, 40, 34, 28, 25],
  },
  {
    day: "Wed",
    hourlyBlinks: [16, 21, 19, 27, 24, 33, 39, 43, 41, 35, 30, 29],
  },
  {
    day: "Thur",
    hourlyBlinks: [14, 18, 20, 23, 26, 29, 31, 36, 38, 33, 28, 24],
  },
  {
    day: "Fri",
    hourlyBlinks: [20, 25, 22, 30, 35, 37, 40, 44, 46, 41, 36, 31],
  },
  {
    day: "Sat",
    hourlyBlinks: [22, 28, 26, 34, 38, 40, 45, 50, 48, 44, 39, 35],
  },
  {
    day: "Sun",
    hourlyBlinks: [19, 24, 23, 28, 32, 36, 39, 43, 42, 38, 33, 29],
  },
];

export default function BlinkAverageChart() {
  // 각 요일의 평균 계산
  const dailyAverages = mockData.map((day) => {
    const total = day.hourlyBlinks.reduce((sum, blinks) => sum + blinks, 0);
    return total / day.hourlyBlinks.length; // 평균 계산
  });

  // 그래프 데이터 설정
  const data: ChartData<"line"> = {
    labels: mockData.map((day) => day.day),
    datasets: [
      {
        label: "Daily Average Blinks",
        data: dailyAverages,
        borderColor: "rgba(0, 0, 0, 0.8)",
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return undefined;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, "#9DA6FE"); // 가장 진한 색
          gradient.addColorStop(1, "#DADEFF"); // 가장 연한 색
          return gradient;
        },
        pointBackgroundColor: "#9DA6FE",
        pointBorderColor: "#fff",
        borderWidth: 2,
        pointRadius: 5,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // 옵션 설정
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "black",
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "black", // X축 라벨 색상
          font: {
            weight: "bold", // X축 라벨 글씨 두께
            size: 14, // 글씨 크기 (옵션)
          },
        },
        grid: {
          color: "transparent", // X축 격자선 색상
          lineWidth: 2, // X축 격자선 두께
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#9E9FA7", // Y축 라벨 색상
          font: {
            weight: "bold", // Y축 라벨 글씨 두께
            size: 14, // 글씨 크기 (옵션)
          },
        },
        grid: {
          color: "#808080", // Y축 격자선 색상
          lineWidth: 2, // Y축 격자선 두께 (필요하면 다른 색으로 설정 가능)
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "800px",
        margin: "0 auto",
        paddingTop: "20px",
      }}
    >
      <Line data={data} options={options as any} />
    </div>
  );
}
