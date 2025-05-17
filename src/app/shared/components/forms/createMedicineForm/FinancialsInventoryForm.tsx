import { useFormContext } from "react-hook-form";
import "./BasicInformationForm.css";

export const FinancialsInventoryForm = () => {
  const { register } = useFormContext();

  return (
    <form className="form-grid-BasicInformationForm">
      <div className="form-group">
        <label htmlFor="precioCompra">Precio de compra</label>
        <input
          id="precioCompra"
          type="number"
          step="0.01"
          {...register("financiero.precioCompra")}
          className="action-input-BasicInformationForm"
          placeholder="Ej. C$ 50.00"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="porcentajeGanancia">% de ganancias</label>
          <input
            id="porcentajeGanancia"
            type="number"
            step="0.01"
            {...register("financiero.porcentajeGanancia")}
            className="action-input-Financials"
            placeholder="Ej. 25 %"
          />
        </div>

        <div className="form-group">
          <label htmlFor="precioVenta">Precio de venta</label>
          <input
            id="precioVenta"
            type="number"
            step="0.01"
            {...register("financiero.precioVenta")}
            className="action-input-Financials"
            placeholder="Ej. C$ 62.50"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="minStock">Cantidad mínima</label>
        <input
          id="minStock"
          type="number"
          {...register("financiero.minStock")}
          className="action-input-BasicInformationForm"
          placeholder="Ej. 10"
        />
      </div>

      <div className="form-group">
        <label htmlFor="maxStock">Cantidad máxima</label>
        <input
          id="maxStock"
          type="number"
          {...register("financiero.maxStock")}
          className="action-input-BasicInformationForm"
          placeholder="Ej. 100"
        />
      </div>
    </form>
  );
};
