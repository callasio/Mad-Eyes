import { Friend } from "@/app/dashboard/page";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/navigation";

interface FriendElementProps {
  friend: Friend;
  showToggle?: boolean;
  expandedFriendId?: string | null;
  gray?: boolean;
  setExpandedFriendId?: (id: string | null) => void;
}

const FriendElement: React.FC<FriendElementProps> = ({
  friend,
  expandedFriendId = null,
  showToggle = true,
  gray = false,
  setExpandedFriendId = () => {},
}) => {
  const router = useRouter();
  return (
    <div
      key={friend.id}
      onClick={() => {
        router.push(`/profile/${friend.id}`);
      }}
      style={{
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          padding: "12px",
          borderRadius: "8px",
          backgroundColor: gray ? "#555" : "#4D4766",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            backgroundColor: "#8E85B3",
            display: "flex",
            objectFit: "cover",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
          src={friend.profilePicture || friend.nickname[0]}
        />

        <div style={{ flexGrow: 1 }}>
          <div
            style={{
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            {friend.nickname}
          </div>
          <div style={{ fontSize: "12px", color: "#aaa" }}>{friend.email}</div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              marginRight: showToggle ? "0" : "8px",
              borderRadius: "50%",
              backgroundColor: friend.online
                ? "#4CAF50"
                : gray
                ? "#888"
                : "#666",
            }}
          />
          {showToggle && (
            <span
              style={{
                transform:
                  expandedFriendId === friend.id
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                transition: "transform 0.3s ease, color 0.3s ease",
                color: "#aaa",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setExpandedFriendId(
                  expandedFriendId === friend.id ? null : friend.id
                );
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#aaa";
              }}
            >
              <ExpandMoreIcon
                style={{
                  verticalAlign: "middle",
                }}
              />
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          overflow: "hidden",
          maxHeight: expandedFriendId === friend.id ? "200px" : "0",
          opacity: expandedFriendId === friend.id ? 1 : 0,
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            marginTop: "4px",
            padding: "16px",
            backgroundColor: "#383838",
            borderRadius: "8px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "16px",
                color: friend.online ? "#4CAF50" : "#666",
              }}
            >
              {friend.online ? "Currently Online" : "Offline"}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 16px",
              }}
            >
              {friend.duration && (
                <>
                  <div>
                    <div
                      style={{
                        color: "#aaa",
                        marginBottom: "4px",
                      }}
                    >
                      Started
                    </div>
                    <div
                      style={{
                        color: "white",
                        fontSize: "16px",
                      }}
                    >
                      {friend.start &&
                        new Date(friend.start!).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        color: "#aaa",
                        marginBottom: "4px",
                      }}
                    >
                      Duration
                    </div>
                    <div
                      style={{
                        color: "white",
                        fontSize: "16px",
                      }}
                    >
                      {friend.duration &&
                        Math.round(friend.duration) + " minutes"}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendElement;
