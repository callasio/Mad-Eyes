import React from "react";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  onClick,
  children,
}) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      style={{
        padding: "9px 18px",
        background: "linear-gradient(to right, #8176AF, #C0B7E8)",
        color: "#302C42",
        border: "none",
        borderRadius: "50px",
        cursor: "pointer",
        fontSize: "17px",
        fontFamily: "var(--font-montserrat), sans-serif",
        fontWeight: "bold",
        transition: "background 0.3s ease",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (e.target === ref.current)
          ref.current.style.background =
            "linear-gradient(to right, #6b5b95, #a89cc8)";
      }}
      onMouseLeave={(e) => {
        if (e.target === ref.current)
          ref.current.style.background =
            "linear-gradient(to right, #8176AF, #C0B7E8)";
      }}
    >
      {children}
    </button>
  );
};

export default GradientButton;
