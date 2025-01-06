import { UserData } from "@/api/user/getUser";
import GradientChart from "@/components/GradientChart";
import { UPDATE_INTERVAL_MIN } from "@/video/recordSession";
import React from "react";

interface HistoryElementProps {
  user: UserData;
  time: Date;
  counts: number[];
}

const HistoryElement: React.FC<HistoryElementProps> = ({
  user,
  time,
  counts,
}) => {
  const averageBlink =
    counts.reduce((a, b) => a + b, 0) / counts.length / UPDATE_INTERVAL_MIN;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "10px 20px 10px 20px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.5)",
            textAlign: "center",
          }}
        >
          {time.toISOString().split("T")[0].replace(/-/g, "/")}
        </div>
        <img
          src={user.profilePicture}
          alt="User"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          flexDirection: "row",
        }}
      >
        <GradientChart
          xAxisData={counts.map((_, index) => index + 1)}
          data={counts}
          colors={["#1B6C67", "#1B6C67"]}
          style={{
            width: "100%",
            height: "100px",
            marginLeft: "-15px",
            marginBottom: "-20px",
            padding: "0px",
          }}
        />
      </div>
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          Blinked
        </div>
        <div
          style={{
            width: "60px",
            height: "50px",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          {averageBlink.toFixed(1)}
        </div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "12px",
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          / min
        </div>
      </div>
    </div>
  );
};

export default HistoryElement;
