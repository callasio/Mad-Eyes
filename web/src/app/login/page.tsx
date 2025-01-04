"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <main
      style={{
        textAlign: "center",
        marginTop: "50px",
        backgroundColor: "#333333", // 배경색: 진한 회색
        height: "100vh",
        color: "white", // 텍스트 색상: 흰색
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!session ? (
        <>
          <h1 style={{ marginBottom: "20px" }}>Log In</h1>
          <button
            onClick={() => signIn("google")}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 20px",
              backgroundColor: "white",
              color: "#333333",
              border: "1px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <img
              src="/google-icon.svg" // Google 아이콘 경로 (public 폴더에 google-icon.svg 파일 추가 필요)
              alt="Google Icon"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            Continue with Google
          </button>
        </>
      ) : (
        <>
          <h1 style={{ marginBottom: "20px" }}>Welcome, {session.user?.name}</h1>
          <p>Email: {session.user?.email}</p>
          <button
            onClick={() => signOut()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#DB4437",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Sign Out
          </button>
        </>
      )}
    </main>
  );
}

