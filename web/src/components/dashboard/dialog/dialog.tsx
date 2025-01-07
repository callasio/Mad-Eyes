import SignOutButton from "@/constants/signOutButton";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/AuthProvider";
import CloseIcon from "@mui/icons-material/Close";
import FriendsFrame from "./friends";
import { Friend } from "@/app/dashboard/page";
import SelectedFriendFrame from "./selectedFriend";
import GradientButton from "@/components/GradientButton";

interface User {
  id: string;
  profilePicture?: string;
  nickname: string;
  email: string;
}

interface DialogProps {
  user: User;
  friends: Friend[];
  setShowDialog: (show: boolean) => void;
}


const DashboardDialog: React.FC<DialogProps> = ({
  user,
  friends,
  setShowDialog,
}) => {
  const [showFriends, setShowFriends] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const router = useRouter();
  
  

  const getElapsedTime = (start: Date) => {
    const now = new Date();
    const elapsed = now.getTime() - start.getTime();
    const minutes = Math.floor(elapsed / 6000);
    return `${minutes} minutes`;
  };

  const getSessionDuration = (session: { start: Date; end?: Date }) => {
    if (!session.end) return "Ongoing";
    const duration = session.end.getTime() - session.start.getTime();
    const minutes = Math.floor(duration / 6000);
    return `${minutes} minutes`;
  };

  {/* Search State */}
  const [searchQuery, setSearchQuery] = useState('');
  const filteredFriends = friends.filter(friend => 
    friend.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    friend.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        position: "absolute",
        top: "70px",
        right: "20px",  // left: "20px"를 right: "20px"로 변경
        backgroundColor: "#2D2D2D",
        borderRadius: "12px",
        padding: "20px",
        width: "300px",
        color: "white",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        zIndex: 1000,
      }}
    >
      <button
        onClick={() => setShowDialog(false)}
        style={{
          position: "absolute",
          right: "10px",
          top: "10px",
          background: "none",
          border: "none",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        <CloseIcon />
      </button>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          style={{
            width: "110px",
            height: "110px",
            margin: "0 auto 10px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #ddd",
            backgroundColor: "#302C42",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {user?.profilePicture ? (
            <img
              src={user?.profilePicture}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#666",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              {user?.nickname}
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "5px",
            color: "white",
          }}
        >
          {user?.nickname}
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "#ccc",
          }}
        >
          {user?.email}
        </div>
      </div>
      

      <button
        onClick={() => setShowFriends(!showFriends)}
        style={{
          width: "100%",
          padding: "8px",
          backgroundColor: "#8176AF",
          border: "none",
          borderRadius: "20px",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        {showFriends ? "Hide Friends" : "Show Friends"}
      </button>
      
      {showFriends && (
      <>

        {/* Search Bar */}
        <div style={{
          width: '100%',
          marginBottom: '15px',
          position: 'relative'
        }}>
          {/* Search icon */}
          <div style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999'
          }}>
            🔍
          </div>
          <input
            type="text"
            placeholder="Search friends..."
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: '#383838',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999'
          }}>
            🔍
          </div>
        </div>
          <FriendsFrame friends={filteredFriends} setSelectedFriend={setSelectedFriend} />
        </>
      )}

      {selectedFriend && (
        <SelectedFriendFrame
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
          
        />
      )}
      {/* Profile 버튼을 왼쪽으로 이동 */}
    <button 
    style={{
      width: "100%",
      padding: "8px",
      backgroundColor: "#8176AF",
      border: "none",
      borderRadius: "20px",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
      marginTop: "4px",
      marginBottom: "4px",
    }}onClick={() => {
      router.push("/profile/" + user?.id);
    }}>
      Show Profile
    </button>

    </div>
  );
};

export default DashboardDialog;
