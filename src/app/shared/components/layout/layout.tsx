import React from "react";

import "../../styles/shared.css";
import { Header } from "./Header";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  headerButton?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ title, children, headerButton = false }) => {
  return (
    <div className="container-page">
      <div className="page-container">
        <div style={{ alignSelf: "flex-start", width: "100%" }}>
          <Header title={title} size={"38px"} headerButton={headerButton} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
