import React from "react";
import { VscInbox } from "react-icons/vsc";
import { TfiHelpAlt } from "react-icons/tfi";
interface HeaderProps {
  title: string;
  size?: string;
  headerButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  size = "24px",
  headerButton = false,
}) => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          fontWeight: "bolder",
          fontSize: size,
          flex: 1,
          textAlign: "left",
        }}
      >
        {title}
      </div>

      {headerButton && (
        <div style={{ marginLeft: "auto" }}>
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#000",
            }}
            onClick={() => console.log("Back button clicked")}
          >
            <VscInbox size={24} />
          </button>
          <TfiHelpAlt size={24} style={{ marginLeft: "10px" }} />
        </div>
      )}
    </header>
  );
};
