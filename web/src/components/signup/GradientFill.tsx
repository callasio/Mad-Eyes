import React, { forwardRef, HTMLAttributes } from "react";

interface GradientFillProps extends HTMLAttributes<HTMLDivElement> {}

const GradientFill = forwardRef<HTMLDivElement, GradientFillProps>(
  (props, ref) => {
    return (
      <div
        ref={ref}
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
          ...props.style,
        }}
        {...props}
      >
        {props.children}
      </div>
    );
  },
);

export default GradientFill;
