"use client";

interface MainContentProps {
}

export default function MainContent({  }: MainContentProps) {

  return (
    <main
      style={{
        backgroundColor: "#302C42",
        height: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: "11%",
        textAlign: "left",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "bold",
          textAlign: "left",
          marginBottom: "20px",
        }}
      >
        Healthy <span style={{ color: "#C0B7E8" }}>Bl</span>
        <span style={{ color: "#9389BF" }}>in</span>
        <span style={{ color: "#8176AF" }}>ks,</span>
        <br />
        Happy Eyes
      </h1>
      <p
        style={{
          fontSize: "18px",
          textAlign: "left",
          maxWidth: "600px",
          lineHeight: "1.6",
        }}
      >
        Our program monitors your blink rate and <br /> sends notifications
        when it's time to blink, <br /> helping you protect your eyes and
        prevent dryness.
      </p>
      {/* 버튼 추가 */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "186px",
          height: "45px",
          background: "linear-gradient(to right, #8176AF, #C0A3E5)", // 버튼 색상
          color: "white",
          border: "none",
          borderRadius: "25px", // 둥근 직사각형
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "40px",
          marginLeft: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={() => alert("Button clicked!")} // 버튼 클릭 동작
      >
        <img
          src="/rec_button.svg" // SVG 파일 경로
          alt="Button Icon"
          style={{ marginRight: "10px", width: "20px", height: "20px" }}
        />
        Get Started
      </button>
    </main>
  );
}
