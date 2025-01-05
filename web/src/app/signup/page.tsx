"use client";

"use client";

import { postUserRegister } from "@/api/user/postUserRegister";
import { useAuth } from "@/auth/AuthProvider";
import GradientButton from "@/components/GradientButton";
import GradientFill from "@/components/signup/GradientFill";
import ImageForm from "@/components/signup/ImageForm";
import NicknameForm from "@/components/signup/NicknameForm";
import Separator from "@/components/signup/Separator";
import Header2 from "@/components/typography/Header2";
import { themeColor } from "@/constants/colors";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const [nickname, setNickname] = useState("");
  const [agree, setAgree] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const { checkSignupState: updateSignupState } = useAuth();

  const { data: session } = useSession();

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
          <ImageForm 
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />
          <NicknameForm nickname={nickname} setNickname={setNickname}/>
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
          >
            Let's Go!
          </GradientButton>
        </div>
      </GradientFill>
    </main>
  );
}
