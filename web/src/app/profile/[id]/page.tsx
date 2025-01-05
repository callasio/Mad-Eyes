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
import ImageForm from "@/components/signup/ImageForm";
import GradientButton from "@/components/GradientButton";

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
      <GradientFill>
        <Header2 text={`${userData.nickname}'s profile`} />
        <Separator />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 30,
            alignItems: "center",
          }}
        >
          <ImageForm profileImage={userData.profilePicture || ""} imagePlaceholderText={userData.nickname} />
          {user?.id === id && (
            <GradientButton onClick={() => router.push("/profile/edit")}>
              <div>Edit Profile</div>
            </GradientButton>
          )}
        </div>
      </GradientFill>
    </main>
  );
};

export default ProfilePage;
