"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/AuthProvider";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useRecording } from "@/video/RecordingProvider";
import WebcamFrame from "@/components/dashboard/video/WebcamFrame";
import DashboardDialog from "@/components/dashboard/dialog/dialog";
import LoadingEyeProgress from "@/components/LoadingEyeProgress";
import { themeColor } from "@/constants/colors";
import HistoryFrame from "@/components/dashboard/history/historyFrame";
import FriendFrame from "@/components/dashboard/history/friendFrame";

interface WelcomePageProps {}

export interface Friend {
  id: string;
  nickname: string;
  email: string;
  isOnline: boolean;
  lastSession?: {
    start: Date;
    end?: Date; // undefined if still online
  };
}

// Add this after your existing mockSignupData
const mockFriends: Friend[] = [
  {
    id: "1",
    nickname: "Sarah",
    email: "sarah@example.com",
    isOnline: true,
    lastSession: {
      start: new Date(Date.now() - 3600000), // Started 1 hour ago
    },
  },
  {
    id: "2",
    nickname: "Mike",
    email: "mike@example.com",
    isOnline: true,
    lastSession: {
      start: new Date(Date.now() - 7200000), // Started 2 hours ago
      end: new Date(Date.now() - 3600000), // Ended 1 hour ago
    },
  },
];

export default function WelcomePage({}: WelcomePageProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const { isRecording, setIsRecording } = useRecording();

  const { user } = useAuth();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);


  if (!user) {
    return <LoadingEyeProgress />;
  }

  const HEADER_HEIGHT = "65px"

  return (
    <>
      {/* 헤더 */}
      <header
        style={{
          position: "fixed",
          width: "100%",
          backgroundColor: "#302C42",
          zIndex: 1000,
          height: HEADER_HEIGHT,
          display: "flex",
          alignItems: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
          justifyContent: "space-between", // 좌측 Welcome Back과 우측 Sign Out 버튼 배치
          padding: "0 20px",
          color: "white",
        }}
      >
        {/* Profile 버튼을 왼쪽으로 이동 */}
        <div 
          style={{ 
            cursor: "pointer", 
            backgroundColor: "#302C42",
            color: "white",  // 텍스트가 잘 보이도록 색상 추가
             fontFamily: 'Montserrat, sans-serif',
             fontWeight: "bold",
             fontSize: "25px",
             marginLeft: "8px",
             marginTop: "10px",
             marginBottom: "10px",
          }} 
          onClick={() => {
            router.push("/");
          }}
        >
          Mad Eyes
        </div>
        <div
          style={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 10, cursor: "pointer", marginRight: "17px", marginTop: "7px"}}
          onClick={() => setShowDialog(!showDialog)}
          >
          {user?.profilePicture ? (
            <img
              src={user?.profilePicture}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                overflow: "hidden",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#666",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              {user?.nickname}
            </div>
          )}
          <h1
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "var(--font-montserrat), sans-serif",
            }}
          >
            {user?.nickname}
          </h1>
        </div>
        
        {/* User Profile Dialog */}
        {showDialog && (
          <DashboardDialog
            user={user!}
            friends={mockFriends}
            setShowDialog={setShowDialog}
          />
        )}
      </header>

      {/* 메인 컨텐츠 */}
      <main
        style={{
          width: "90%", // 프레임 너비,
          maxWidth: "1200px",
          backgroundColor: "#302C42",
          overflowY: "scroll", // Enable vertical scrolling
          margin: "0 auto", // 가운데 정렬
          marginTop: HEADER_HEIGHT, // 헤더 높이만큼 아래로 이동
          display: "flex",
          justifyContent: "flex-start", // 왼쪽 정렬
          flexDirection: "column",
          alignItems: "center", // 가운데 정렬
        }}
      >
        {/* 둥근 모서리 프레임 */}
        <WebcamFrame/>
        <div style={{
          width: "calc(100% - 80px)",
          gap: "40px",
          display: "flex",
          flexDirection: "row",
          paddingBottom: "40px"
        }}>
          <FriendFrame />
          <HistoryFrame />
        </div>
      </main>
    </>
  );
}
