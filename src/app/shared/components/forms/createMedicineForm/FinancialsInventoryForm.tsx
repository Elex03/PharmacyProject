import "./BasicInformationForm.css";

export const FinancialsInventoryForm = () => {
  return (
    <div className="form-grid-BasicInformationForm">
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          className="action-input-BasicInformationForm"
          placeholder="Ingresa el nombre del medicine"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="accion">% de ganancias</label>
          <input
            id="nombre"
            type="text"
            className="action-input-Financials"
            placeholder="00 %"
          />
        </div>

        <div className="form-group">
          <label htmlFor="sintoma">Precio de venta</label>
          <input
            id="nombre"
            type="text"
            className="action-input-Financials"
            placeholder="C$ 00.00"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          className="action-input-BasicInformationForm"
          placeholder="Ingresa el nombre del medicine"
        />
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          className="action-input-BasicInformationForm"
          placeholder="Ingresa el nombre del medicine"
        />
      </div>
    </div>
  );
};
