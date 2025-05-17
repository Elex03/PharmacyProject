import { useFormContext } from "react-hook-form";
import "./BasicInformationForm.css";
import ImageSelector from "./SelectImage";

export const BasicInformationForm = () => {
  const {
    register,
  } = useFormContext();

  return (
    <div className="form-grid-BasicInformationForm">
      <div className="form-group-BasicInformationForm">
        <label htmlFor="nombre">Nombre</label>
        <input
          {...register("nombre", {
            required: "El nombre es obligatorio",
          })}
          id="nombre"
          type="text"
          className="action-input-BasicInformationForm"
          placeholder="Ingresa el nombre del medicamento"
        />
      </div>

      <div className="form-group">
        <label htmlFor="unidad">Unidad interna</label>
        <select
          {...register("unidad")}
          id="unidad"
          className="action-select-BasicInformationForm"
        >
          <option value={1}>Pastilla</option>
          <option value={2}>Ml</option>
          <option value={3}>Dosis</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="codigo">Código de barra</label>
        <input
          {...register("codigo")}
          id="codigo"
          type="text"
          className="action-input-BasicInformationForm"
          placeholder="Ingresa el código del medicamento"
        />

        <div className="form-row" style={{ paddingTop: "10px" }}>
          <div className="form-group">
            <label htmlFor="accioTera">Acción terapéutica</label>
            <select
              {...register("accioTera")}
              id="accioTera"
              className="action-select-BasicInformationForm"
            >
              <option value={0}>Seleccione</option>
              <option value={1}>Analgésico</option>
              <option value={2}>Antibiótico</option>
              {/* Puedes adaptar los valores según tu base de datos */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dosis">Dosis</label>
            <input
              {...register("dosis", { valueAsNumber: true })}
              id="dosis"
              type="number"
              className="action-input-BasicInformationForm"
              placeholder="Cantidad en mg/ml"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="imagen">Seleccione una imagen</label>
        <ImageSelector />
      </div>

      <div className="form-group" style={{ marginTop: "-205px" }}>
        <label htmlFor="sintomas">Síntomas que alivia</label>
        <textarea
          {...register("sintomas")}
          className="textarea-BasicInformationForm"
          id="sintomas"
          placeholder="Descripción de los síntomas"
        />
      </div>
    </div>
  );
};
