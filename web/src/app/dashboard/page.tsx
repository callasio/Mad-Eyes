"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/AuthProvider";
import GradientButton from "@/components/GradientButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useRecording } from "@/video/RecordingProvider";
import WebcamFrame from "@/components/dashboard/video/WebcamFrame";
import DashboardDialog from "@/components/dashboard/dialog/dialog";

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
        <h1
          onClick={() => setShowDialog(!showDialog)}
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "var(--font-montserrat), sans-serif",
            cursor: "pointer", // Added to show it's clickable
          }}
        >
          Welcome Back, {user?.nickname}
        </h1>
        <GradientButton onClick={() => {
          router.push("/profile/" + user?.id);
        }}>
          Profile
        </GradientButton>
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
          backgroundColor: "#302C42",
          height: "calc(100vh - 65px)", // 헤더 제외한 높이
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* 둥근 모서리 프레임 */}
        <WebcamFrame/>
      </main>
    </>
  );
}
