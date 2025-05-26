import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

export const FinancialsInventoryForm = () => {
  const { register, control, setValue } = useFormContext();

  const precioCompra = useWatch({ control, name: "financiero.precioCompra" });
  const porcentajeGanancia = useWatch({
    control,
    name: "financiero.porcentajeGanancia",
  });

  useEffect(() => {
    const compra = parseFloat(precioCompra);
    const ganancia = parseFloat(porcentajeGanancia);

    if (!isNaN(compra) && !isNaN(ganancia)) {
      const precioSugerido = compra * (1 + ganancia / 100);
      setValue("precioVenta", parseFloat(precioSugerido.toFixed(2)));
    }
  }, [precioCompra, porcentajeGanancia, setValue]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
    >
      {/* Datos financieros */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <strong style={{fontSize: 14, fontWeight: 'bold'}}>Datos financieros</strong>
        <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <label htmlFor="precioCompra" className="labelForm">Precio de compra</label>
            <input
              id="precioCompra"
              type="number"
              step="0.01"
              {...register("precioCompra")}
              className="action-input-BasicInformationForm"
              placeholder="Ej. C$ 50.00"
            />
          </div>

          <div
            style={{
              width: "150px",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <label htmlFor="porcentajeGanancia" className="labelForm">% de ganancia</label>
            <input
              id="porcentajeGanancia"
              type="number"
              step="0.01"
              {...register("porcentajeGanancia")}
              className="action-input-Financials"
              placeholder="Ej. 25 %"
            />
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <label htmlFor="precioVenta" className="labelForm">Precio de venta</label>
            <input
              id="precioVenta"
              type="number"
              step="0.01"
              {...register("precioVenta")}
              className="action-input-Financials"
              placeholder="Calculado automáticamente"
            />
          </div>
        </div>
      </div>

      {/* Inventario */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <strong style={{fontSize: 14, fontWeight: 'bold'}}>Inventario</strong>
        <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <label htmlFor="minStock" className="labelForm">Cantidad mínima</label>
            <input
              id="minStock"
              type="number"
              {...register("minStock")}
              className="action-input-BasicInformationForm"
              placeholder="Ej. 10"
            />
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <label htmlFor="maxStock" className="labelForm">Cantidad máxima</label>
            <input
              id="maxStock"
              type="number"
              {...register("maxStock")}
              className="action-input-BasicInformationForm"
              placeholder="Ej. 100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
