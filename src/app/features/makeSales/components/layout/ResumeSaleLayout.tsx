import React from "react";
import { Header } from "../../../../shared/components/layout/Header";
import { useStateResumeLayout } from "../../hooks/useStateResumeLayout";

interface resumeSaleLayoutProps {
  setDataChanged: (value: boolean | ((prev: boolean) => boolean)) => void;
}

export const ResumeSaleLayout: React.FC<resumeSaleLayoutProps> = ({
  setDataChanged,
}) => {
  const {
    handleCancelBotton,
    eliminarItem,
    handleCantidadChange,
    onSubmit,
    register,
    handleSubmit,
    fields,
    calcularTotal,
  } = useStateResumeLayout(setDataChanged);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ border: "1px solid #000", padding: "10px" }}
    >
      <Header title="Resumen de venta" size="1.2rem" />

      <p style={{ fontSize: "12px" }}>
        Aquí se muestran los medicamentos que ha seleccionado para comprar.
        Puede ajustar la cantidad de cada producto o eliminarlo si lo desea.
      </p>

      <table className="inventory-table-I">
        <thead>
          <tr>
            <th className="bold-font" style={{ padding: "0px" }}>
              Descripción
            </th>
            <th className="bold-font" style={{ padding: "0px" }}>
              Cantidad
            </th>
            <th className="bold-font" style={{ padding: "0px" }}>
              SubTotal
            </th>
            <th className="bold-font" style={{ padding: "0px" }}>
              Acciones
            </th>
          </tr>
        </thead>
      </table>

      <div className="table-body-scroll" style={{ maxHeight: "20rem" }}>
        <table className="inventory-table-I">
          <tbody>
            {fields.map((item, index) => (
              <tr key={item.id}>
                <td>{item.descripcion}</td>
                <td>
                  <input
                    type="number"
                    value={item.cantidad}
                    min={1}
                    onChange={(e) =>
                      handleCantidadChange(
                        index,
                        parseInt(e.target.value),
                        item.stock || 1
                      )
                    }
                    style={{ width: "60px" }}
                  />
                </td>
                <td>
                  C${(item.cantidad * (item.precioVenta || 0)).toFixed(2)}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => eliminarItem(index, item.medicamento_fk)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "10px" }}>
        <label style={{ fontWeight: "bold", fontSize: "13px" }}>
          ¿Con cuánto paga el cliente?
        </label>
        <input
          type="number"
          {...register("pagaCon", { required: true, min: 0 })}
          style={{ width: "96%", padding: "5px", marginTop: "5px" }}
        />
      </div>

      <p style={{ fontWeight: "bold", marginTop: "10px" }}>
        Total de la venta: C${calcularTotal().toFixed(2)}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          justifyContent: "space-between",
        }}
      >
        <button type="button" className="cancelar" onClick={handleCancelBotton}>
          Cancelar venta
        </button>
        <button type="submit" className="guardar">
          Confirmar venta
        </button>
      </div>
    </form>
  );
};
