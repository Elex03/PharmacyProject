import React, { useState } from "react";
import "./DispositivoButton.css"; // asegúrate de importar el CSS

enum Estado {
  DESCONECTADO = "Desconectado",
  CONECTANDO = "Conectando",
  CONECTADO = "Conectado",
}

const DispositivoConBoton: React.FC = () => {
  const [estado, setEstado] = useState<Estado>(Estado.DESCONECTADO);

  const handleClick = () => {
    if (estado === Estado.DESCONECTADO) {
      setEstado(Estado.CONECTANDO);
      setTimeout(() => {
        setEstado(Estado.CONECTADO);
      }, 2000);
    } else if (estado === Estado.CONECTADO) {
      setEstado(Estado.DESCONECTADO);
    }
  };

  return (
    <div className="dispositivo-container">
      <div className="header">
        <span className={`circle ${estado.toLowerCase()}`}></span>
        <span className="title">Dispositivo</span>
        <span className="estado-text">- {estado}</span>
      </div>

      <button className="button-action" onClick={handleClick}>
        {estado === Estado.CONECTANDO ? "Conectando..." : "Escanear"}
      </button>
    </div>
  );
};

export default DispositivoConBoton;
