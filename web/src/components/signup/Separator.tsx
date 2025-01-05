import React from 'react';

interface SeparatorProps extends React.HTMLAttributes<HTMLImageElement> {}

const Separator: React.FC<SeparatorProps> = ({ style, ...props }) => {
  return (
    <img
      src="/Vector_16.svg"
      alt="decorative line"
      style={{
        width: "80%",
        height: "auto",
        marginBottom: "25px",
        ...style,
      }}
      {...props}
    />
  );
};

export default Separator;
