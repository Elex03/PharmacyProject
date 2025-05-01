import React from "react";

import "../../styles/shared.css";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  totalItems: number;
}

const Layout: React.FC<LayoutProps> = ({ title, children, totalItems }) => {
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
      {totalItems !== undefined && (
        <div style={{ alignSelf: "flex-start", padding: "0 10px" }}>
          <p className="label">
            Se encontraron{" "}
            <span
              className="highlight-bubble"
              style={{ backgroundColor: "#A5DDFF" }}
            >
              {totalItems}
            </span>{" "}
            elementos
          </p>
        </div>
      )}

      {children}
    </div>
  );
};

export default Layout;
