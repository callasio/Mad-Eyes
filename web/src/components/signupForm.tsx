"use client";

interface SignupFormProps {
  profileImage: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}

export default function SignupForm({
  profileImage,
  handleImageUpload,
  nickname,
  setNickname,
}: SignupFormProps) {
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
      <div
        style={{
          background: "radial-gradient(circle, #403A5F, #211E2E)",
          padding: "20px",
          borderRadius: "16px",
          border: "1px solid #FFFFFF",
          width: "540px",
          height: "720px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <h2
          style={{
            color: "white",
            fontSize: "26px",
            fontWeight: "bold",
            fontFamily: "var(--font-montserrat), sans-serif",
            marginTop: "35px",
            marginBottom: "17px",
          }}
        >
          JOIN MADEYES
        </h2>
        <img
          src="/Vector_16.svg"
          alt="decorative line"
          style={{
            width: "80%",
            height: "auto",
            marginBottom: "25px",
          }}
        />
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
            <span style={{ color: "#fff", fontSize: "24px" }}>+</span>
          )}
        </div>
        <label
          htmlFor="profile-upload"
          style={{
            marginTop: "3px",
            marginBottom: "30px",
            width: "180px",
            height: "30px",
            borderRadius: "15px",
            backgroundColor: "#8176AF",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold",
            fontFamily: "var(--font-montserrat), sans-serif",
          }}
        >
          Update Profile Image
        </label>
        <input
          type="file"
          id="profile-upload"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
        <div style={{ marginBottom: "20px", textAlign: "left", width: "180px" }}>
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
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "22px", marginTop: "35px" }}>
          <input
            type="checkbox"
            id="agree"
            style={{
              width: "16px",
              height: "16px",
              accentColor: "#8176AF",
            }}
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
        <button
          style={{
            padding: "9px 18px",
            background: "linear-gradient(to right, #8176AF, #C0B7E8)",
            color: "#302C42",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "17px",
            fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: "bold",
          }}
          onClick={() => alert("닉네임: " + nickname)}
        >
          Let's Go!
        </button>
      </div>
    </main>
  );
}
