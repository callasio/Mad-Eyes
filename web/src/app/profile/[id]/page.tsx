"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingEyeProgress from "@/components/LoadingEyeProgress";
import { themeColor } from "@/constants/colors";
import { useAuth } from "@/auth/AuthProvider";
import GradientFill from "@/components/signup/GradientFill";
import Header2 from "@/components/typography/Header2";
import Separator from "@/components/signup/Separator";
import { getUserFromId } from "@/api/user/getUserFromId";
import { UserData } from "@/api/user/getUser";
import EditIcon from "@mui/icons-material/Edit";
import { Edit } from "@mui/icons-material";

const ProfilePage: React.FC<{ params: Promise<{ id: string }> }> = ({
  params,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string | null>(null);

  const { user } = useAuth();

  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    params
      .then((resolvedParams) => {
        setId(resolvedParams.id);
        return resolvedParams.id;
      })
      .then((id) => {
        getUserFromId(id).then((data) => {
          if (data.success === false || !data.user) {
            router.push("/404");
            return;
          }
          const resUserData: UserData = data.user;
          setUserData(resUserData);
          setLoading(false);
        });
      });
  }, [params]);

  if (loading || !userData) {
    return <LoadingEyeProgress />;
  }

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        height: "100vh",
        background: themeColor.primary,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "720px",
          height: "540px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {user?.id === id && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={() => router.push("/profile/edit")}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "5px",
                cursor: "pointer",
                color: "#9A8BC3", // Slightly brighter color
                fontWeight: "bold",
              }}
            >
              <EditIcon />
              Edit Profile
            </div>
          </div>
        )}
        <img
          style={{
            position: "absolute",
            border: "2px solid #FFFFFF",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            top: "-50px",
            left: "auto",
            right: "auto",
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={userData.profilePicture || ""}
        />
        <div
          style={{
            background: "radial-gradient(circle, #403A5F, #211E2E)",
            padding: "20px",
            paddingTop: "80px",
            borderRadius: "16px",
            border: "1px solid #FFFFFF",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Header2 text={userData.nickname} />
          <div
            style={{
              marginTop: "0px",
              fontSize: "17px",
              marginBottom: "20px",
              color: "#ccc",
            }}
          >
            {userData.email}
          </div>
          <Separator />
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              gap: "40px",
              flexDirection: "row",
              padding: "20px 40px 20px 40px",
            }}
          >
            <div
              style={{
                flex: 1,
                background: "#000",
              }}
            ></div>
            <div
              style={{
                flex: 1,
                background: "#000",
              }}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
