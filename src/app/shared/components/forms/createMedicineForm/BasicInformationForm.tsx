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
        <label htmlFor="accion">Acción terapéutica</label>
        <select id="accion" className="action-select-BasicInformationForm">
          <option value="">Seleccionar acción terapéutica</option>
          <option value="analgésico">Analgésico</option>
          <option value="antibiótico">Antibiótico</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="accion">Acción terapéutica</label>
        <select id="accion" className="action-select-BasicInformationForm">
          <option value="">Seleccionar acción terapéutica</option>
          <option value="analgésico">Analgésico</option>
          <option value="antibiótico">Antibiótico</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="imagen">Seleccione una imagen</label>
        <ImageSelector />
      </div>
      <div className="form-group" style={{ marginTop: "-270px" }}>
        <label htmlFor="codigo">Código de barra</label>
        <textarea
          className="textarea-BasicInformationForm"
          id="codigo"
          placeholder="Descripción del medicamento"
        />
      </div>
    </div>
  );
};
