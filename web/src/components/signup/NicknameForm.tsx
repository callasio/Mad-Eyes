import React, { useState } from 'react';

const NicknameForm: React.FC<{
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  nickname,
  setNickname,
}) => {
  return (
    <div style={{ marginBottom: "10px", textAlign: "left", width: "180px" }}>
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
          outline: "none",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#8176AF")}
        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
      />
    </div>
  );
};

export default NicknameForm;