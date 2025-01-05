"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlinkAverageChart from "@/components/blinkAverageChart";
import { useAuth } from "@/auth/AuthProvider";
import GradientButton from "@/components/signup/GradientButton";

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
          <div
            style={{
              position: "absolute",
              top: "70px",
              left: "20px",
              backgroundColor: "#2D2D2D",
              borderRadius: "12px",
              padding: "20px",
              width: "300px",
              color: "white",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              zIndex: 1000,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowDialog(false)}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            {/* Profile Image and Info */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  margin: "0 auto 10px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid #ddd",
                  backgroundColor: "#302C42",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {user?.profilePicture ? (
                  <img
                    src={user?.profilePicture}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
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
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "white",
                }}
              >
                {user?.nickname}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#ccc",
                }}
              >
                {user?.email}
              </div>
            </div>

            {/* Add this right before the Sign Out Button */}
            <button
              onClick={() => setShowFriends(!showFriends)}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#8176AF",
                border: "none",
                borderRadius: "20px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              {showFriends ? "Hide Friends" : "Show Friends"}
            </button>

            {/* Friends List */}
            {showFriends && (
              <div
                style={{
                  marginTop: "10px",
                  borderTop: "1px solid #444",
                  paddingTop: "10px",
                }}
              >
                {mockFriends.map((friend) => (
                  <div
                    key={friend.id}
                    onClick={() => setSelectedFriend(friend)}
                    style={{
                      padding: "8px",
                      borderRadius: "8px",
                      backgroundColor: "#3D3D3D",
                      marginBottom: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "#666",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      {friend.nickname[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: "bold" }}>
                        {friend.nickname}
                      </div>
                      <div style={{ fontSize: "12px", color: "#aaa" }}>
                        {friend.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Friend's Blink Data Popup */}
            {selectedFriend && (
              <div
                style={{
                  position: "absolute",
                  left: "320px",
                  top: "0",
                  backgroundColor: "#2D2D2D",
                  borderRadius: "12px",
                  padding: "20px",
                  width: "300px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <button
                  onClick={() => setSelectedFriend(null)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    background: "none",
                    border: "none",
                    color: "white",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
                <h3 style={{ marginBottom: "15px", color: "white" }}>
                  {selectedFriend.nickname}'s Session
                </h3>
                <div
                  style={{
                    backgroundColor: "#383838",
                    borderRadius: "8px",
                    padding: "20px",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {/* Online Status */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: selectedFriend.isOnline
                          ? "#4CAF50"
                          : "#666",
                        marginRight: "10px",
                      }}
                    />
                    <span>
                      {selectedFriend.isOnline ? "Online" : "Offline"}
                    </span>
                  </div>

                  {/* Session Info */}
                  {selectedFriend.lastSession && (
                    <div>
                      {selectedFriend.isOnline ? (
                        <>
                          <div>Started:</div>
                          <div
                            style={{ fontSize: "18px", marginBottom: "10px" }}
                          >
                            {selectedFriend.lastSession.start.toLocaleTimeString()}
                          </div>
                          <div>Duration:</div>
                          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                            {getElapsedTime(selectedFriend.lastSession.start)}
                          </div>
                        </>
                      ) : (
                        <>
                          <div>Last Session:</div>
                          <div
                            style={{ fontSize: "16px", marginBottom: "10px" }}
                          >
                            {selectedFriend.lastSession.start.toLocaleTimeString()}{" "}
                            -{" "}
                            {selectedFriend.lastSession.end?.toLocaleTimeString()}
                          </div>
                          <div>Duration:</div>
                          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                            {getSessionDuration(selectedFriend.lastSession)}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Your existing Sign Out Button */}

            {/* Sign Out Button */}
            <button
              onClick={() => signOut()}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#DB4437",
                border: "none",
                borderRadius: "20px",
                color: "white",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Sign Out
            </button>
          </div>
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
