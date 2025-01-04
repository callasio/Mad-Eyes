"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainContent from "@/components/mainContents";
import SignupForm from "@/components/signupForm";
import { themeColor } from "@/constants/colors";

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
        "munkonggpt@gmail.com": false,  // 이미 가입된 사용자
        "navygrace8389@gmail.com": true, // 신규 사용자
      };
  
      const isUserSignedUp = mockDatabase[userEmail] || false;

      setIsSignedUp(isUserSignedUp);
      setShowSignup(!isUserSignedUp); // 회원가입 여부에 따라 화면 설정
      if (!showSignup) {
        router.push("/dashboard"); 
      }
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
    <MainContent/>

    </>
  );}
  
return (
  <>
  {/* 메인 컨텐츠 */}
  {showSignup &&  (
    <SignupForm
      profileImage={profileImage}
      handleImageUpload={handleImageUpload}
      nickname={nickname}
      setNickname={setNickname}
    />
  
  )}</>);}
