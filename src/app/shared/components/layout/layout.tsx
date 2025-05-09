import React from "react";

import "../../styles/shared.css";
import { Header } from "./Header";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div className="container-page">
      <div className="page-container">
        <div style={{ alignSelf: "flex-start" }}>
          <Header title={title} size={"38px"} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
