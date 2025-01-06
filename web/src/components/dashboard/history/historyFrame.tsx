import Header2 from "@/components/typography/Header2";
import React, { useRef } from "react";
import HistoryIcon from "@mui/icons-material/History";

const HistoryFrame: React.FC = () => {
  return (
    <div
      style={{
        flex: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginLeft: "10px",
          marginBottom: "15px",
        }}
      >
        <HistoryIcon
          style={{
            verticalAlign: "middle",
            marginRight: "8px",
          }}
        />
        <Header2
          text="HISTORY"
          style={{
            marginTop: "0px",
            marginBottom: "0px",
          }}
        />
      </div>

      <div
        style={{
          backgroundColor: "#262335",
          height: "1000px",
          borderRadius: "25px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default HistoryFrame;
