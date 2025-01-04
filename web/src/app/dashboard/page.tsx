"use client";

import { signOut, useSession } from "next-auth/react";
import { themeColor } from "@/constants/colors"; // themeColor 경로 확인 필요
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BlinkAverageChart from "@/components/blinkAverageChart";


interface WelcomePageProps {
    
}

export default function WelcomePage({  }: WelcomePageProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
        router.push('/')
    }
  }, [session])

  return (
    <>
      {/* 헤더 */}
      <header
        style={{
          backgroundColor: "#302C42",
          height: "65px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // 좌측 Welcome Back과 우측 Sign Out 버튼 배치
          padding: "0 20px",
          color: "white",
        }}
      >
        {/* Welcome Back 문구 */}
        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold", fontFamily: "var(--font-montserrat), sans-serif"}}>
          Welcome Back, {session?.user?.name}
        </h1>

        {/* Sign Out 버튼 */}
        <button
          onClick={() => signOut()}
          style={{
            padding: "8px 12px",
            backgroundColor: "#DB4437",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Sign Out
        </button>
      </header>
    
     {/* 메인 컨텐츠 */}
     <main
        style={{
          backgroundColor: "#302C42",
          height: "calc(100vh - 65px)", // 헤더 제외한 높이
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
    
        }}
      >
        {/* 둥근 모서리 프레임 */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "25px",
            width: "90%", // 프레임 너비,
            marginTop: "30px",
            minWidth: "800px",
            maxWidth:"1000px"    ,   
            height: "500px",
            marginLeft: "20px",
            marginRight: "20px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
             <BlinkAverageChart />
          
        </div>
      </main>
    </>
  );
}
