import { signOut } from 'next-auth/react';
import React from 'react';

const SignOutButton: React.FC<{
  rounded?: boolean;
}> = ({
  rounded = true,
}) => {
  return (
    <button
      onClick={() => signOut()}
      style={{
        width: "100%",
        padding: "8px",
        backgroundColor: "#DB4437",
        border: "none",
        borderRadius: "20px",
        color: "white",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "bold",
        marginTop: "10px",
      }}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;