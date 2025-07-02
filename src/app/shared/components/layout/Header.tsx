import React, { useState } from "react";
import { VscInbox } from "react-icons/vsc";
import { TfiHelpAlt } from "react-icons/tfi";
import Tour from "reactour";
import { ModalNotifications } from "../../../features/pedidos/components/ModalNotifications";
import { useTour } from "../../../shared/hooks/useTour"; // importa tu nuevo hook
import type { ReactourStep } from "reactour";
import { useNotifications } from "../../../features/pedidos/hooks/useNotifications";
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

  const { notificaciones } = useNotifications();

  const cantidadNoLeidas = notificaciones.filter((n) => !n.leido).length;

  const { isTourOpen, openTour, closeTour, steps } = useTour("Inventory", [
    {
      selector: ".step-chart",
      content: "Este gráfico muestra un resumen visual del inventario.",
    },
    {
      selector: ".step-actions",
      content: "Aquí puedes buscar, filtrar o agregar nuevos medicamentos.",
    },
    {
      selector: ".step-table",
      content: "Esta tabla muestra los productos registrados en el inventario.",
    },
    {
      selector: ".step-syntomps",
      content: "Esta tabla muestra los productos registrados en el inventario.",
    },
  ] as ReactourStep[]);

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
          <div style={{ position: "relative", display: "inline-block" }}>
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
              {cantidadNoLeidas > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "10px",
                    height: "10px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
              )}
            </button>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#000",
              }}
              onClick={openTour}
              aria-label="Iniciar recorrido"
            >
              <TfiHelpAlt size={24} style={{ marginLeft: "10px" }} />
            </button>
          </div>
        )}
      </header>

      <ModalNotifications
        show={modalVisible}
        onClose={closeModal}
        selectedTab={selectedTab}
        onSelectTab={handleSelectTab}
      />

      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={closeTour}
        accentColor="#007bff"
      />
    </>
  );
};
