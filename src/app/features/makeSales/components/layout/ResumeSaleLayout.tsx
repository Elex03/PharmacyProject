import { useState } from "react";
import { Header } from "../../../../shared/components/layout/Header";

export const ResumeSaleLayout = () => {
  const [total] = useState(0);

  return (
    <div style={{ border: "1px solid #000", padding: "10px" }}>
      <div style={{ marginLeft: "-10px" }}>
        <Header title="Resumen de venta" size="1.2rem" />
      </div>
      <p style={{ fontSize: "12px" }}>
        Aquí se muestran los medicamentos que ha seleccionado para comprar.
        Puede ajustar la cantidad de cada producto o eliminarlo si lo desea.
      </p>
      <p>total de la venta: {total}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <button className="cancelar">Cancelar venta</button>
        <button className="guardar">Confirmar vetna</button>
      </div>
    </div>
  );
};
