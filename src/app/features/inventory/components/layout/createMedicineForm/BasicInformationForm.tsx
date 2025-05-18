import { useFormContext } from "react-hook-form";
import "./BasicInformationForm.css";
import ImageSelector from "./SelectImage";
import {
  useFetchCompanies,
  useFetchCompressedForm,
  useFetchTherapeuticAction,
} from "../../../hooks/useMedicineForm";

export const BasicInformationForm = () => {
  const { register } = useFormContext();

  const { companiesData } = useFetchCompanies();
  const { therapeuticData } = useFetchTherapeuticAction();
  const { compressedForm } = useFetchCompressedForm();

  return (
    <div className="form-grid-BasicInformationForm">
      {/* Presentación */}
      <div className="form-group-BasicInformationForm">
        <label htmlFor="presentacion">Presentación</label>
        <select
          {...register("presentacion")}
          id="presentacion"
          className="action-select-BasicInformationForm"
        >
          {compressedForm.length > 0 ? (
            compressedForm.map((compressedFormResponse) => (
              <option
                key={compressedFormResponse.id}
                value={compressedFormResponse.id}
              >
                {compressedFormResponse.label}
              </option>
            ))
          ) : (
            <option disabled value="">
              No hay nada que mostrar
            </option>
          )}
        </select>
      </div>

      {/* Unidad interna */}
      <div className="form-group-BasicInformationForm">
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

      {/* Fabricante */}
      <div className="form-group-BasicInformationForm">
        <label htmlFor="fabricante">Fabricante</label>
        <select
          {...register("fabricante")}
          id="fabricante"
          className="action-select-BasicInformationForm"
        >
          {companiesData.map((companiesData) => (
            <option value={companiesData.id}>{companiesData.label}</option>
          ))}
        </select>
      </div>

      {/* Acción terapéutica y dosis */}
      <div className="form-row">
        <div className="form-group-BasicInformationForm">
          <label htmlFor="accioTera">Acción terapéutica</label>
          <select
            {...register("accioTera")}
            id="accioTera"
            className="action-select-BasicInformationForm"
          >
            {therapeuticData.map((therapeticResponse) => (
              <option value={therapeticResponse.id}>
                {therapeticResponse.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group-BasicInformationForm">
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

      {/* Imagen */}
      <div className="form-group-BasicInformationForm">
        <label htmlFor="imagen">Seleccione una imagen</label>
        <ImageSelector />
      </div>

      {/* Síntomas */}
      <div className="form-group-BasicInformationForm">
        <label htmlFor="sintomas">Síntomas que alivia</label>
        <textarea
          {...register("sintomas")}
          id="sintomas"
          className="textarea-BasicInformationForm"
          placeholder="Descripción de los síntomas"
        />
      </div>
    </div>
  );
};
