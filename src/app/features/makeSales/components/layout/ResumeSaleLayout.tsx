import { useState, useEffect } from "react";
import { Header } from "../../../../shared/components/layout/Header";
import { useCart } from "../../hooks/useCart";
import "../../../../shared/components/layout/Table/Table.css";

interface dataPreviewTable {
  id: number;
  descripcion: string;
  precioVenta: number;
  stock: number;
}

export const ResumeSaleLayout = () => {
  const [items, setItems] = useState<
    (dataPreviewTable & { cantidad: number })[]
  >([]);

  const { items: data } = useCart();

  const { deleteItem, empty } = useCart();

  useEffect(() => {
    const updatedItems = data.map((item) => ({
      ...item,
      cantidad: 1,
      descripcion: item.name || "",
      precioVenta: item.price || 0,
    }));
    setItems(updatedItems);
  }, [data]);

  console.log(data);

  const eliminarItem = (id: number) => {
    const itemToRemove = data.find((item) => item.id === id);
    if (itemToRemove) {
      const { id } = itemToRemove;
      deleteItem(id);
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

  const handleCancelBotton = () => {
    empty();
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

      <table className="inventory-table-I">
        <thead>
          <tr >
            <th className="bold-font" style={{padding: '0px'}}>Descripción</th>
            <th className="bold-font" style={{padding: '0px'}}>Cantidad</th>
            <th className="bold-font" style={{padding: '0px'}}>SubTotal</th>
            <th className="bold-font" style={{padding: '0px'}}>Acciones</th>
          </tr>
        </thead>
      </table>
      <div className="table-body-scroll" style={{maxHeight: '20rem'}}>
        <table className="inventory-table-I">
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
                  <button onClick={() => eliminarItem(item.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontWeight: "bold", marginTop: "10px" }}>
        Total de la venta: C${calcularTotal().toFixed(2)}
      </p>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px", justifyContent: 'space-between' }}>
        <button className="cancelar" onClick={handleCancelBotton}>
          Cancelar venta
        </button>
        <button className="guardar">Confirmar venta</button>
      </div>
    </div>
  );
};
