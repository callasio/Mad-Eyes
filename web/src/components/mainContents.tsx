"use client";

import { signIn } from "next-auth/react";
import LoadingEyeProgress from './LoadingEyeProgress';

interface MainContentProps {}

export default function MainContent({}: MainContentProps) {
  return (
    <main
      style={{
        backgroundColor: "#302C42",
        height: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "0 11%",
        textAlign: "left",
      }}
    >
       {/* Left Section */}
    <div style={{ flex: 1, textAlign: "left", marginLeft: "175px"}}>
      <h1
        style={{
          marginTop: "85px",
          fontSize: "72px",
          fontWeight: "bold",
          textAlign: "left",
          marginBottom: "35px",
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
          fontSize: "20px",
          textAlign: "left",
          maxWidth: "600px",
          lineHeight: "1.6",
        }}
      >
        Our program monitors your blink rate and <br /> sends notifications when
        it's time to blink, <br /> helping you protect your eyes and prevent
        dryness.
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
        onClick={() => signIn()} // 버튼 클릭 동작
      >
        <img
          src="/rec_button.svg" // SVG 파일 경로
          alt="Button Icon"
          style={{ marginRight: "10px", width: "20px", height: "20px" }}
        />
        Get Started
      </button>
    </div>
    
     {/* Right Section */}
     <div style={{
      position: 'relative',
      width: '420px',  // Adjust size as needed
      height: '260px', // Adjust size as needed
      background: 'radial-gradient(50% 50% at 50% 50%, #3A3456 0%, #211E2E 100%)',
      borderRadius: '130px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      marginRight: "230px",
      marginTop: "145px"
    }}>
     {/* Eye container */}
     <div style={{
          position: 'relative',
          width: '18rem',
          height: '10rem',
          
        }}>
          {/* Eye shape */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#C0B7E8',
            borderRadius: '9999px',
            overflow: 'hidden',
            animation: 'blink 4s ease-in-out infinite'
          }}>
            {/* Pupil */}
            <div style={{
              position: 'absolute',
              top: '50%',
              width: '6.7rem',
              height: '6.7rem',
              backgroundColor: '#302C42',
              borderRadius: '9999px',
              transform: 'translateY(-50%)',
              animation: 'pupilMove 2s ease-in-out infinite'
            }}>
              {/* Light reflection */}
              <div style={{
                position: 'absolute',
                width: '2.75rem',
                height: '2.75rem',
                backgroundColor: 'rgba(192, 183, 232, 0.3)',
                borderRadius: '9999px',
                top: '0.75rem',
                right: '0.75rem'
              }} />
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes pupilMove {
            0%, 100% {
              left: 7%;
            }
            50% {
              left:57%;
            }
          }
            @keyframes blink {
          0%, 45%, 55%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0);
          }
        }
        `}
      </style>
      
    
   
  </main>
  );
}
