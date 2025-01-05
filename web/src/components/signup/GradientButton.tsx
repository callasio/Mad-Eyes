import React from 'react';

interface GradientButtonProps {
  text: string;
  onClick: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({ text, onClick }) => {
  return (
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
        transition: "background 0.3s ease",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)"
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        (e.target as HTMLButtonElement).style.background = "linear-gradient(to right, #6b5b95, #a89cc8)";
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).style.background = "linear-gradient(to right, #8176AF, #C0B7E8)";
      }}
    >
      {text}
    </button>
  );
};

export default GradientButton;