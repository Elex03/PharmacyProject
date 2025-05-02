import React from "react";

import "../../styles/shared.css";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div className="page-container">
      {/* Título */}
      <div style={{ alignSelf: "flex-start" }}>
        <header
          style={{
            fontWeight: "bolder",
            fontSize: "38px",
            margin: 0,
            padding: "0 10px",
          }}
        >
          {title}
        </header>
      </div>
     
      {children}
    </div>
  );
};

export default Layout;
