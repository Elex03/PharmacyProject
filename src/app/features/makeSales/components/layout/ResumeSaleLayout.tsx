import React, { useState, useEffect } from "react";
import { Header } from "../../../../shared/components/layout/Header";
import type { dataPreviewTable } from "../../pages/MakeSalesPage";

interface ResumeSaleLayoutProps {
  data: dataPreviewTable[];
  handleData: (row: dataPreviewTable, eliminated: boolean) => void;
}

export const ResumeSaleLayout: React.FC<ResumeSaleLayoutProps> = ({
  data,
  handleData,
}) => {
  const [items, setItems] = useState<
    (dataPreviewTable & { cantidad: number })[]
  >([]);

  useEffect(() => {
    const updatedItems = data.map((item) => ({
      ...item,
      cantidad: 1,
    }));
    setItems(updatedItems);
  }, [data]);

  console.log(data);

  const eliminarItem = (id: number) => {
    const itemToRemove = data.find((item) => item.id === id);
    if (itemToRemove) {
      handleData(itemToRemove, true); // Eliminar del estado `data`
    }

    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  const calcularTotal = () => {
    return items.reduce(
      (acc, item) => acc + item.cantidad * item.precioVenta,
      0
    );
  };

  const handleCantidadChange = (id: number, cantidad: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad: Math.max(1, Math.min(cantidad, item.stock)),
            }
          : item
      )
    );
  };

  return (
    <div style={{ border: "1px solid #000", padding: "10px" }}>
      <div style={{ marginLeft: "-10px" }}>
        <Header title="Resumen de venta" size="1.2rem" />
      </div>
      <p style={{ fontSize: "12px" }}>
        Aquí se muestran los medicamentos que ha seleccionado para comprar.
        Puede ajustar la cantidad de cada producto o eliminarlo si lo desea.
      </p>

      <table style={{ width: "100%", fontSize: "14px", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>SubTotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.descripcion}</td>
              <td>
                <input
                  type="number"
                  value={item.cantidad}
                  min={1}
                  onChange={(e) =>
                    handleCantidadChange(item.id, parseInt(e.target.value))
                  }
                  style={{ width: "60px" }}
                />
              </td>
              <td>C${(item.cantidad * item.precioVenta).toFixed(2)}</td>
              <td>
                <button onClick={() => eliminarItem(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ fontWeight: "bold", marginTop: "10px" }}>
        Total de la venta: C${calcularTotal().toFixed(2)}
      </p>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button className="cancelar">Cancelar venta</button>
        <button className="guardar">Confirmar venta</button>
      </div>
    </div>
  );
};
