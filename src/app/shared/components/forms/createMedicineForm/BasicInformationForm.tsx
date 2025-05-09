import "./BasicInformationForm.css";
import ImageSelector from "./SelectImage";

export const BasicInformationForm = () => {
  return (
    <div className="form-grid-BasicInformationForm">
      <div className="form-group-BasicInformationForm">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          className="action-input-BasicInformationForm"
          placeholder="Ingresa el nombre del medicine"
        />
      </div>
      <div className="form-group">
        <label htmlFor="accion">Unidad interna</label>
        <select id="accion" className="action-select-BasicInformationForm">
          <option value="analgésico">Pastilla</option>
          <option value="antibiótico">Ml</option>
          <option value="dosis">dosis</option>
        </select>
      </div>
      <div className="form-group">
      <label htmlFor="codigo">Código de barra</label>
        <input
          id="nombre"
          type="text"
          className="action-input-BasicInformationForm"
          placeholder="Ingresa el nombre del medicine"
        />
      <div className="form-row" style={{paddingTop: '10px'}}>
        <div className="form-group">
          <label htmlFor="accion">Acción terapéutica</label>
          <select id="accion" className="action-select-BasicInformationForm">
            <option value="">Via</option>
            <option value="analgésico">Analgésico</option>
            <option value="antibiótico">Antibiótico</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sintoma">Dosis</label>
          <select id="sintoma" className="action-select-BasicInformationForm">
            <option value="">Dosis</option>
            <option value="fiebre">Fiebre</option>
            <option value="dolor">Dolor</option>
          </select>
        </div>
      </div>
      </div>
      <div className="form-group">
        <label htmlFor="imagen">Seleccione una imagen</label>
        <ImageSelector />
      </div>
      <div className="form-group" style={{ marginTop: "-205px" }}>
        <label htmlFor="codigo">Sintomas que</label>
        <textarea
          className="textarea-BasicInformationForm"
          id="codigo"
          placeholder="Descripción del medicamento"
        />
      </div>
    </div>
  );
};
