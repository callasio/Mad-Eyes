import { useState } from "react";
import { signOut } from "next-auth/react";

function SignOutButton({
  color = "#E86452",
  text = "Sign Out",
  dialog = false,
  onClick = () => {},
}) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleSignOut = () => {
    setShowConfirmDialog(true);
  };

  return (
    <>
      <button
        onClick={dialog ? handleSignOut : onClick}
        style={{
          width: "100%",
          paddingLeft: "25px",
          paddingRight: "25px",
          paddingTop: "10px",
          paddingBottom: "10px",
          backgroundColor: color,
          border: "none",
          borderRadius: "20px",
          color: "white",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        {text}
      </button>

      {showConfirmDialog && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#302C42",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #ffffff",
              width: "300px",
              textAlign: "center",
            }}
          >
            <h3
              style={{
                color: "white",
                marginTop: "2px",
                marginBottom: "20px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                fontSize: "21px",
              }}
            >
              REALLY??
            </h3>
            <p style={{ color: "white", marginBottom: "27px" }}>
              Sure you want to fire <br /> your blinking coach? 👀
            </p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                onClick={onClick}
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#E86452",
                  border: "none",
                  borderRadius: "20px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmDialog(false)}
                style={{
                  padding: "8px 20px",
                  backgroundColor: "#8176AF",
                  border: "none",
                  borderRadius: "20px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignOutButton;
