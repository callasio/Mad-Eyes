import { Friend } from "@/app/dashboard/page";
import React from "react";

interface FriendsProps {
  friends: Friend[];
  setSelectedFriend: (friend: Friend | null) => void;
  
}

const FriendsFrame: React.FC<FriendsProps> = ({
  friends,
  setSelectedFriend,
}) => {
  return (
    <div
      style={{
        marginTop: "10px",
        borderTop: "1px solid #444",
        paddingTop: "10px",
      }}
    >
      {friends.map((friend) => (
        <div
          key={friend.id}
          onClick={() => setSelectedFriend(friend)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            backgroundColor: "#3D3D3D",
            marginBottom: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#666",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            {friend.nickname[0]}
          </div>
          <div>
            <div style={{ fontWeight: "bold" }}>{friend.nickname}</div>
            <div style={{ fontSize: "12px", color: "#aaa" }}>
              {friend.email}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsFrame;
