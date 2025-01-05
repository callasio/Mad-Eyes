"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BlinkAverageChart from "@/components/blinkAverageChart";
import { useAuth } from "@/auth/AuthProvider";


interface WelcomePageProps {
    
}

interface Friend {
  id: string;
  nickname: string;
  profileImage?: string;
  email: string;
  blinkData: {
    day: string;
    count: number;
  }[];
}

// Add this after your existing mockSignupData
const mockFriends: Friend[] = [
  {
    id: '1',
    nickname: 'Sarah',
    email: 'sarah@example.com',
    blinkData: [
      { day: 'Mon', count: 15 },
      { day: 'Tue', count: 18 },
      { day: 'Wed', count: 12 },
      { day: 'Thu', count: 20 },
      { day: 'Fri', count: 16 },
      { day: 'Sat', count: 14 },
      { day: 'Sun', count: 13 }
    ]
  },
  {
    id: '2',
    nickname: 'Mike',
    email: 'mike@example.com',
    blinkData: [
      { day: 'Mon', count: 12 },
      { day: 'Tue', count: 14 },
      { day: 'Wed', count: 16 },
      { day: 'Thu', count: 15 },
      { day: 'Fri', count: 19 },
      { day: 'Sat', count: 17 },
      { day: 'Sun', count: 11 }
    ]
  }
];

export default function WelcomePage({  }: WelcomePageProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const [showFriends, setShowFriends] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!session) {
        router.push('/')
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
              <div style={{ 
                fontSize: "18px", 
                fontWeight: "bold", 
                marginBottom: "5px",
                color: "white",
              }}>
                {user?.nickname}
              </div>
              <div style={{ 
                fontSize: "14px", 
                color: "#ccc" 
              }}>
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
    marginBottom: "10px"
  }}
>
  {showFriends ? 'Hide Friends' : 'Show Friends'}
</button>

{/* Friends List */}
{showFriends && (
  <div style={{
    marginTop: "10px",
    borderTop: "1px solid #444",
    paddingTop: "10px"
  }}>
    {mockFriends.map(friend => (
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
          gap: "10px"
        }}
      >
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "#666",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white"
        }}>
          {friend.nickname[0]}
        </div>
        <div>
          <div style={{ fontWeight: "bold" }}>{friend.nickname}</div>
          <div style={{ fontSize: "12px", color: "#aaa" }}>{friend.email}</div>
        </div>
      </div>
    ))}
  </div>
)}

{/* Friend's Blink Data Popup */}
{selectedFriend && (
  <div style={{
    position: "absolute",
    left: "320px",
    top: "0",
    backgroundColor: "#2D2D2D",
    borderRadius: "12px",
    padding: "20px",
    width: "300px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)"
  }}>
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
        cursor: "pointer"
      }}
    >
      ×
    </button>
    <h3 style={{ color: "white" }}>{selectedFriend.nickname}'s Blink Data</h3>
    <div style={{ marginTop: "15px" }}>
      {selectedFriend.blinkData.map((data, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: "1px solid #444",
            color: "white"
          }}
        >
          <span>{data.day}</span>
          <span>{data.count} blinks/min</span>
        </div>
      ))}
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
