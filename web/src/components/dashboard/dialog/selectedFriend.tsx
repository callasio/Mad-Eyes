import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Friend } from "@/app/dashboard/page";

interface SelectedFriendFrameProps {
  selectedFriend: Friend | null;
  setSelectedFriend: (friend: Friend | null) => void;
  position?: { top: number, left: number };  // Add this
}

const getElapsedTime = (startTime: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - startTime.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHrs > 0) {
    return `${diffHrs}h ${diffMins}m`;
  } else {
    return `${diffMins}m`;
  }
};

const getSessionDuration = (session: { start: Date; end?: Date }): string => {
  const startTime = new Date(session.start);
  const endTime = session.end ? new Date(session.end) : new Date();

  const diffMs = endTime.getTime() - startTime.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHrs > 0) {
    return `${diffHrs}h ${diffMins}m`;
  } else {
    return `${diffMins}m`;
  }
};

const SelectedFriendFrame: React.FC<SelectedFriendFrameProps> = ({
  selectedFriend,
  setSelectedFriend,
  position
}) => {
  if (!selectedFriend) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: position?.left || "300px",
        top: position?.top || "200px",
        backgroundColor: "#2D2D2D",
        borderRadius: "12px",
        padding: "20px",
        width: "300px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <button
        onClick={() => setSelectedFriend(null)}
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
      <h3 style={{ marginBottom: "15px", color: "white" }}>
        {selectedFriend.nickname}'s Session
      </h3>
      <div
        style={{
          backgroundColor: "#383838",
          borderRadius: "8px",
          padding: "20px",
          color: "white",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: selectedFriend.isOnline ? "#4CAF50" : "#666",
              marginRight: "10px",
            }}
          />
          <span>{selectedFriend.isOnline ? "Online" : "Offline"}</span>
        </div>

        {selectedFriend.lastSession && (
          <div>
            {selectedFriend.isOnline ? (
              <>
                <div>Started:</div>
                <div style={{ fontSize: "18px", marginBottom: "10px" }}>
                  {selectedFriend.lastSession.start.toLocaleTimeString()}
                </div>
                <div>Duration:</div>
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {getElapsedTime(selectedFriend.lastSession.start)}
                </div>
              </>
            ) : (
              <>
                <div>Last Session:</div>
                <div style={{ fontSize: "16px", marginBottom: "10px" }}>
                  {selectedFriend.lastSession.start.toLocaleTimeString()} -{" "}
                  {selectedFriend.lastSession.end?.toLocaleTimeString()}
                </div>
                <div>Duration:</div>
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {getSessionDuration(selectedFriend.lastSession)}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedFriendFrame;
