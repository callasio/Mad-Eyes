"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/mainContents";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("");


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    // session.user?.email이 null 또는 undefined인 경우 기본값 처리
    const userEmail = session?.user?.email || "unknown@example.com";
  
    const mockDatabase: { [key: string]: boolean } = {
      "user1@example.com": true,  // 이미 가입된 사용자
      "user2@example.com": false, // 신규 사용자
    };
  
    setIsSignedUp(mockDatabase[userEmail] || false);
  }, [session]);
  

  if (!session) {

  return (
    <>
      {/* 헤더 */}
      <header
        style={{
          backgroundColor: "#302C42",
          height: "65px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // 좌측 로고와 우측 버튼을 분리
          padding: "0 20px",
          color: "white",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>My App</h1>
        <div style={{ marginLeft: "auto" }}> 
          {!session ? (
            <button
              onClick={() => {signIn("google");
                setShowSignup(false); // 로그인 후 회원가입 창 표시
              }}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 12px",
                backgroundColor: "white",
                color: "#333",
                border: "1px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              <img
                src="/icon_google.svg"
                alt="Google Icon"
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "8px",
                }}
              />
              Sign in with Google
            </button>
          ) : (
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
          )}
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      {!showSignup && ( 
      <MainContent showSignup={showSignup} />
          )}

          {showSignup && (
        <main
          style={{
            backgroundColor: "#4a4a4a",
            height: "calc(100vh - 65px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#555",
              padding: "20px",
              borderRadius: "16px",
              width: "500px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <label htmlFor="profile-upload">
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: "#666",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "24px", color: "#fff" }}>+</span>
                </div>
              </label>
              <input
                type="file"
                id="profile-upload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginTop: "10px",
                  }}
                />
              )}
            </div>
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={{
                padding: "10px",
                width: "80%",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#8176AF",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Let's Go!
            </button>
          </div>
        </main>
      )}
    </>
  );
}
// 기본 페이지 (회원가입된 사용자)
return (
  <main
    style={{
      backgroundColor: "#302C42",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    }}
  >
    <div>
      <h1>Welcome Back, {session.user?.name}</h1>
      <button
        onClick={() => signOut()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#DB4437",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Sign Out
      </button>
    </div>
  </main>
);
}
  




