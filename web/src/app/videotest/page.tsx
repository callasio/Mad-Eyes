"use client";

import { useEffect, useState } from "react";
import { useRecording } from "../../video/process";

export default function Page() {
  const { isRecording, setIsRecording } = useRecording();
  
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ fontSize: 24 }}>VideoTest</div>
      <button onClick={() => setIsRecording(!isRecording)}>{
        isRecording ? "Stop Recording" : "Start Recording"
        }</button>
    </div>
  );
}