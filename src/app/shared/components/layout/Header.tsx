import React, { useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

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
            onClick={toggleModal}
          >
            <VscInbox size={24} />
          </button>
          <TfiHelpAlt size={24} style={{ marginLeft: "10px" }} />
        </div>
      )}

      {isModalOpen && <HelpModal onClose={toggleModal} />}
    </header>
  );
};
const HelpModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{fontWeight: 'bold'}}>Escáner de código de barras</h2>
        <img
          src="/medication_scan.gif"
          alt="Escáner de código de barras"
          style={{ width: "80%", marginBottom: "1rem", borderRadius: "8px" }}
        />
        <p style={{ marginBottom: "1rem" }}>
          Abre la app <strong>FarmaNovaApp</strong> en tu móvil.
          <br />
          ¿No la tienes?
          <br />
          <a
            href="https://drive.google.com/drive/folders/1dvZ6p-faoEOp_K8d0vLfuCFSSCcaP578?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#007bff", textDecoration: "underline" }}
          >
            Descárgala aquí
          </a>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            style={{
              backgroundColor: "white",
              color: "#007bff",
              border: "1px solid #007bff",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Continuar
          </button>
          <button
            onClick={onClose}
            style={{
              marginTop: "10px",
              backgroundColor: "white",
              border: "none",
              cursor: "pointer",
              color: "#000",
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
