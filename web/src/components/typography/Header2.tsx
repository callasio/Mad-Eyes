import React from "react";

interface Header2Props {
  text: string;
}

const Header2: React.FC<Header2Props & React.HTMLAttributes<HTMLHeadingElement>> = ({ text, style, ...props }) => {
  return (
    <h2
      style={{
        color: "white",
        fontSize: "26px",
        fontWeight: "bold",
        fontFamily: "var(--font-montserrat), sans-serif",
        marginTop: "35px",
        marginBottom: "17px",
        ...style,
      }}
      {...props}
    >
      {text}
    </h2>
  );
};

export default Header2;
