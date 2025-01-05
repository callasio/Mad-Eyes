"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlinkAverageChart from "@/components/blinkAverageChart";
import { useAuth } from "@/auth/AuthProvider";
import GradientButton from "@/components/signup/GradientButton";
import SignOutButton from "@/constants/signOutButton";
import { Dialog } from "@mui/material";
import DashboardDialog from "@/components/dashboard/dialog";

interface WelcomePageProps {}

interface Friend {
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

const getElapsedTime = (startTime: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - startTime.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHrs > 0) {
    return `${diffHrs}h ${diffMins}m`;
  } else {
    return `${diffMins}m`;
  }
};

const getSessionDuration = (session: { start: Date; end?: Date }): string => {
  const startTime = new Date(session.start);
  const endTime = session.end ? new Date(session.end) : new Date();

  const diffMs = endTime.getTime() - startTime.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHrs > 0) {
    return `${diffHrs}h ${diffMins}m`;
  } else {
    return `${diffMins}m`;
  }
};

export default function WelcomePage({}: WelcomePageProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const [showFriends, setShowFriends] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

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
        {/* User Profile Dialog */}
        {showDialog && (
          <DashboardDialog
            user={user!}
            friends={mockFriends}
            setShowDialog={setShowDialog}/>
        )}

        <GradientButton
          text={"Start Recording"}
          onClick={function (): void {
            console.log("Clicked");
          }}
        />
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
            maxWidth: "1000px",
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
