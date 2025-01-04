"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/mainContents";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("");


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (session) {
      // session이 있는 경우에만 실행
      const userEmail = session.user?.email || "unknown@example.com";
  
      const mockDatabase: { [key: string]: boolean } = {
        "munkonggpt@gmail.com": true,  // 이미 가입된 사용자
        "navygrace8389@gmail.com": false, // 신규 사용자
      };
  
      const isUserSignedUp = mockDatabase[userEmail] || false;

      setIsSignedUp(isUserSignedUp);
      setShowSignup(!isUserSignedUp); // 회원가입 여부에 따라 화면 설정
    }
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
        <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>Mad Eyes</h1>
        <div style={{ marginLeft: "auto" }}> 
          {!session ? (
            <button
              onClick={() => {signIn("google");}}
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
            backgroundColor: "#302C42",
            height: "calc(100vh - 65px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
  style={{
    background: "radial-gradient(circle, #403A5F, #211E2E)",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #FFFFFF",
    width: "540px", 
    height: "720px",
    display: "flex",
    flexDirection: "column", 
    alignItems:"center",
    gap: "16px", 
  }}
>
  {/* JOIN MADEYES 문구 추가 */}
  <h2
    style={{
      color: "white",
      fontSize: "26px",
      fontWeight: "bold",
      fontFamily: "var(--font-montserrat), sans-serif", 
      marginTop: "35px",
      marginBottom: "17px",
    }}
  >
    JOIN MADEYES
  </h2>
  {/* SVG 파일 불러오기 */}
<img
  src="/Vector_16.svg" // SVG 파일 경로 (public 폴더 기준)
  alt="decorative line"
  style={{
    width: "80%", // 원하는 너비 설정
    height: "auto", // 높이를 자동으로 맞춤
    marginBottom: "25px", // 아래 콘텐츠와의 간격
  }}
/>
  <div
  style={{
    position: "relative",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "2px solid #ddd",
    overflow: "hidden",
    backgroundColor: "#302C42",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "3px", // 닉네임 입력과의 간격 추가
  }}
>
  {profileImage ? (
    <img
      src={profileImage}
      alt="Profile"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  ) : (
    <span style={{ color: "#fff", fontSize: "24px" }}>+</span>
  )}
  </div>
  {/* + 버튼 (원형 아래에 배치) */}
  <label
    htmlFor="profile-upload"
    style={{
      marginTop: "3px", // 원형 이미지와 버튼 사이 간격
      marginBottom: "30px",
      width: "180px",
      height: "30px",
      borderRadius: "15px",
      backgroundColor: "#8176AF",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      fontSize: "12px",
      fontWeight: "bold",
      fontFamily: "var(--font-montserrat), sans-serif"
    }}
  >
    Update Profile Image
  </label>
  <input
    type="file"
    id="profile-upload"
    accept="image/*"
    onChange={handleImageUpload}
    style={{ display: "none",
      backgroundColor: "#302C42"
    }}
  />


<div style={{ marginBottom: "20px", textAlign: "left", width: "180px" }}>
  <label
    htmlFor="nickname"
    style={{
      display: "block",
      fontSize: "13px",
      color: "#ffffff",
      marginBottom: "8px",
      fontFamily: "var(--font-montserrat), sans-serif",
      fontWeight:"bold"
    }}
  >
    Nickname
  </label>
  <input
    type="text"
    id="nickname"
    placeholder="Enter your nickname"
    value={nickname}
    onChange={(e) => setNickname(e.target.value)}
    style={{
      padding: "10px",
      width: "100%",
      borderRadius: "8px",
      border: "1px solid #ddd",
      color: "#ffffff", // 입력된 텍스트 색상
      backgroundColor: "#302C42", // 배경 색상
    }}
  />
</div>

{/* 개인정보 수집 동의 체크박스 */}
<div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "22px", marginTop: "35px" }}>
  <input
    type="checkbox"
    id="agree"
    style={{
      width: "16px",
      height: "16px",
      accentColor: "#8176AF", // 체크박스 색상
    }}
  />
  <label
    htmlFor="agree"
    style={{
      fontSize: "14px",
      color: "#ffffff",
      fontFamily: "var(--font-montserrat), sans-serif"
    }}
  >
    I agree to the Privacy Policy
  </label>
</div>

{/* Let's Go 버튼 */}
<button
  style={{
    padding: "9px 18px",
    background: "linear-gradient(to right, #8176AF, #C0B7E8)", // 버튼 색상,
    color: "#302C42",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "17px",
    fontFamily: "var(--font-montserrat), sans-serif",
    fontWeight: "bold"
  }}
  onClick={() => alert("닉네임: " + nickname)} // 버튼 클릭 동작
>
  Let's Go!
</button>
</div>

        </main>
      )}
    </>
  );}

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
      <h1>Welcome Back, {session?.user?.name}</h1>
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
