import React from "react";

interface HeaderProps {
  title: string;
  size ?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, size }) => {
  return (
    <header
      style={{
        fontWeight: "bolder",
        fontSize: `${size}`,
        margin: 0,
        padding: "0 10px",
      }}
    >
      {title}
    </header>
  );
};
