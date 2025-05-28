import React, { useState } from "react";
import { VscInbox } from "react-icons/vsc";
import { TfiHelpAlt } from "react-icons/tfi";
import { ModalNotifications } from "../../../features/pedidos/components/ModalNotifications";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("general");

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSelectTab = (tab: string) => setSelectedTab(tab);

  return (
    <>
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
              onClick={openModal}
              aria-label="Abrir notificaciones"
            >
              <VscInbox size={24} />
            </button>
            <TfiHelpAlt size={24} style={{ marginLeft: "10px" }} />
          </div>
        )}
      </header>

      <ModalNotifications
        show={modalVisible}
        onClose={closeModal}
        selectedTab={selectedTab}
        onSelectTab={handleSelectTab}
      />
    </>
  );
};
