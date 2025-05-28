import { useFormContext } from "react-hook-form";
import "./BasicInformationForm.css";
import ImageSelector from "./SelectImage";
import TagInput from "../../../../../shared/components/forms/TagInput";
import React from "react";
import { useFetchSymptoms } from "../../../hooks/useMedicineForm";

interface labelI {
  label: string;
  value: string;
  id: number;
}

interface BasicInformationFormProps {
  companiesData: labelI[];
  compressedForm: labelI[];
  drugVia: labelI[];
}
export const BasicInformationForm: React.FC<BasicInformationFormProps> = ({
  companiesData,
  compressedForm,
  drugVia,
}) => {
  const { register } = useFormContext();

  const { symptoms } = useFetchSymptoms();

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        width: "100%",
      }}
    >
      {/* Columna izquierda */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
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
        {/* <div className="form-group-BasicInformationForm">
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
        </div> */}

        {/* Fabricante */}
        <div className="form-group-BasicInformationForm">
          <label htmlFor="fabricante">Fabricante</label>
          <select
            {...register("fabricante")}
            id="fabricante"
            className="action-select-BasicInformationForm"
          >
            {companiesData.map((companiesData) => (
              <option key={companiesData.id} value={companiesData.id}>
                {companiesData.label}
              </option>
            ))}
          </select>
        </div>
        {/* Síntomas */}
        <div className="form-group-BasicInformationForm">
          <label htmlFor="sintomas">Síntomas que alivia</label>
          {/* <textarea
            {...register("sintomas")}
            id="sintomas"
            className="textarea-BasicInformationForm"
            placeholder="Descripción de los síntomas"
          /> */}

          <TagInput suggestions={symptoms} maxTags={5} />
        </div>
      </div>

      {/* Columna derecha */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* Acción terapéutica y dosis */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }} className="form-group-BasicInformationForm">
            <label htmlFor="accioTera">Via</label>
            <select
              {...register("via")}
              id="accioTera"
              className="action-select-BasicInformationForm"
            >
              {drugVia.length > 0 ? (
                drugVia.map((compressedFormResponse) => (
                  <option
                    key={compressedFormResponse.id}
                    value={compressedFormResponse.label}
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

          {/* <div style={{ flex: 1 }} className="form-group-BasicInformationForm">
            <label htmlFor="dosis">Dosis</label>
            <select
              {...register("accioTera")}
              id="accioTera"
              className="action-select-BasicInformationForm"
            >
              <option>Oral</option>
              <option>Rectal</option>
            </select>
          </div> */}
        </div>

        {/* Imagen */}
        <div className="form-group-BasicInformationForm">
          <label htmlFor="imagen">Seleccione una imagen</label>
          <ImageSelector />
        </div>
      </div>
    </div>
  );
};
