"use client";

"use client";

import { postUserRegister } from "@/api/user/postUserRegister";
import { useAuth } from "@/auth/AuthProvider";
import GradientButton from "@/components/signup/GradientButton";
import GradientFill from "@/components/signup/GradientFill";
import Separator from "@/components/signup/Separator";
import Header2 from "@/components/typography/Header2";
import { themeColor } from "@/constants/colors";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const [nickname, setNickname] = useState("");
  const [agree, setAgree] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const { checkSignupState: updateSignupState } = useAuth();

  const { data: session } = useSession();

  const onProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getProfileImageBlob = async () => {
    if (profileImage) {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      return blob;
    }
    return null;
  };

  return (
    <main
      style={{
        backgroundColor: "#302C42",
        height: "calc(100vh - 65px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GradientFill>
        <Header2 text="JOIN MADEYES" />
        <Separator />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <div style={{ position: "relative" }}>
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
                marginBottom: "3px",
              }}
              onClick={() => document.getElementById("profile-upload")?.click()}
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
                <AddIcon
                  style={{ color: themeColor.white, fontSize: "40px" }}
                />
              )}
            </div>

            {profileImage && (
              <div
                style={{
                  position: "absolute",
                  zIndex: 1,
                  bottom: "5px",
                  right: "5px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: themeColor.white,
                  padding: "5px",
                  flexDirection: "column",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onClick={() => setProfileImage("")}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ddd")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = themeColor.white)
                }
              >
                <ClearIcon
                  style={{
                    color: themeColor.primary,
                    borderRadius: "50%",
                    fontSize: "20px",
                  }}
                  onClick={() => setProfileImage("")}
                />
              </div>
            )}
          </div>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            onChange={onProfileImageChange}
            style={{ display: "none" }}
          />
          <div
            style={{ marginBottom: "10px", textAlign: "left", width: "180px" }}
          >
            <label
              htmlFor="nickname"
              style={{
                display: "block",
                fontSize: "13px",
                color: "#ffffff",
                marginBottom: "8px",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontWeight: "bold",
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
                color: "#ffffff",
                backgroundColor: "#302C42",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#8176AF")}
              onBlur={(e) => (e.target.style.borderColor = "#ddd")}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "22px",
              marginTop: "35px",
            }}
          >
            <input
              type="checkbox"
              id="agree"
              style={{
                width: "16px",
                height: "16px",
                accentColor: "#8176AF",
              }}
              checked={agree}
              onChange={() => setAgree(!agree)}
            />
            <label
              htmlFor="agree"
              style={{
                fontSize: "14px",
                color: "#ffffff",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              I agree to the Privacy Policy
            </label>
          </div>
          <GradientButton
            text="Let's Go!"
            onClick={async () => {
              const blob = await getProfileImageBlob();
              if (!session) {
                alert("Please sign in first");
                return;
              }
              const res = await postUserRegister(nickname, blob, session);

              if (res.status === "existing" || res.status === "success") {
                updateSignupState();
                return;
              }
            }}
          />
        </div>
      </GradientFill>
    </main>
  );
}
