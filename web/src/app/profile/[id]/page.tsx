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
import PersonIcon from "@mui/icons-material/Person";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { getUserFriends } from "@/api/user/getUserFriends";
import { deleteFriend } from "@/api/friend/deleteFreind";
import { useSession } from "next-auth/react";
import { postFriendInvite } from "@/api/friend/postFriendInvite";
import { Friend } from "@/app/dashboard/page";
import FriendElement from "@/components/friendElement";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  getRecordCurrentFromId,
  RecordCurrent,
} from "@/api/record/getRecordCurrentFromId";

const ProfilePage: React.FC<{ params: Promise<{ id: string }> }> = ({
  params,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string | null>(null);

  const { user } = useAuth();
  const { data: session } = useSession();

  const [userData, setUserData] = useState<UserData>();
  const [isFriend, setIsFriend] = useState(false);
  const [friends, setFriend] = useState<Friend[]>([]);

  const [loadAgain, setLoadAgain] = useState(false);
  const [recordCurrent, setRecordCurrent] = useState<RecordCurrent>();

  useEffect(() => {
    Promise.all([
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
          });
        }),

      params.then((resolvedParams) => {
        if (!user) return;
        getUserFriends(user.id).then((data) => {
          setIsFriend(
            data.friends?.some((friend) => friend.id === resolvedParams.id) ??
              false
          );
        });
      }),

      params.then(async (resolvedParams) => {
        await getUserFriends(resolvedParams.id).then((data) => {
          setFriend(data.friends ?? []);
        });
      }),

      params.then(async (resolvedParams) => {
        await getRecordCurrentFromId(resolvedParams.id).then((data) => {
          if (data.status === "success" && data.record) {
            setRecordCurrent(data.record);
          }
        });
      }),
    ]).then(() => setLoading(false));
  }, [params, loadAgain]);

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
        {user?.id === id ? (
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
        ) : isFriend ? (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (!user || !session) return;
              deleteFriend(user.id, session).then((re) => {
                console.log(re.status);
                setLoadAgain(!loadAgain);
              });
            }}
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
              <PersonRemoveIcon />
              Delete Friend
            </div>
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (!user || !session) return;
              postFriendInvite(user.id, session);
            }}
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
              <PersonAddIcon />
              Invite Friend
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
              gap: "20px",
              flexDirection: "row",
              padding: "0px 40px 0 40px",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "270px",
              }}
            >
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  gap: "5px",
                  paddingLeft: "5px",
                }}
              >
                <RemoveRedEyeIcon />
                <Header2
                  text="Status"
                  style={{
                    marginTop: "0px",
                    fontSize: "20px",
                    marginBottom: "5px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  padding: "40px 0 40px 0",
                  flex: 1,
                  background: "#383838",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    fontSize: "20px",
                    color: recordCurrent?.online ? "#4CAF50" : "#aaa",
                  }}
                >
                  {recordCurrent?.online ? "Currently Online" : "Offline"}
                </div>
                {recordCurrent?.duration && (
                  <>
                    <div
                      style={{
                        flex: 1,
                      }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#aaa",
                        }}
                      >
                        Started
                      </span>
                      <span>
                        {new Date(recordCurrent.start).toLocaleTimeString()}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#aaa",
                        }}
                      >
                        Duration
                      </span>
                      <span>{Math.round(recordCurrent.duration)} minutes</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div
              style={{
                flex: 1.5,
                display: "flex",
                flexDirection: "column",
                height: "270px",
              }}
            >
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  gap: "5px",
                  paddingLeft: "5px",
                }}
              >
                <PersonIcon />
                <Header2
                  text="Friends"
                  style={{
                    marginTop: "0px",
                    fontSize: "20px",
                    marginBottom: "5px",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll",
                  background: "#383838",
                  borderRadius: "8px",
                  padding: "10px",
                  paddingBottom: "0",
                  flex: 1,
                }}
              >
                {friends.map((friend) => (
                  <FriendElement
                    key={friend.id}
                    friend={friend}
                    showToggle={false}
                    gray
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
