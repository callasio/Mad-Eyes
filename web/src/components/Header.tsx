import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header
      style={{
        position: "fixed",
        width: "100%",
        backgroundColor: "#302C42",
        zIndex: 1000,
        height: "65px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        justifyContent: "space-between", // 좌측 Welcome Back과 우측 Sign Out 버튼 배치
        padding: "0 20px",
        color: "white",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: "Montserrat, sans-serif",
          fontWeight: "bold",
          fontSize: "25px",
          marginLeft: "8px",
          marginTop: "10px",
        }}
      >
        MADEYES
      </h1>
      <div style={{ marginLeft: "auto" }}>
        {!session ? (
          <button
            onClick={() => {
              signIn("google");
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
  );
};

export default Header;
