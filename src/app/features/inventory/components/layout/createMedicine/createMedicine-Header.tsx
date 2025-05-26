import "./createMedicine.css";
import { Header } from "../../../../../shared/components/layout/Header";
import { AnimatedMulti } from "../../../../../shared/components/forms/multipleSelector";
import { useFetchTherapeuticAction } from "../../../hooks/useMedicineForm";
import { useFormContext } from "react-hook-form";
import React from "react";

interface CreateMedicineHeaderProps {
  title: string;
}
export const CreateMedicineHeader:React.FC<CreateMedicineHeaderProps> = ({title}) => {
  const { register } = useFormContext();

  const { therapeuticData } = useFetchTherapeuticAction();
  return (
    <>
      <div style={{ margin: "0 -10px" }}>
        <Header title={title} size="1.5rem" />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            {...register("nombre")}
            id="nombre"
            type="text"
            className="action-input"
            placeholder="Ingresa el nombre del medicine"
            onChange={(e) => e.target.value}
          />
        </div>

        <div className="form-group">
          <label htmlFor="accion">Acción terapéutica</label>
          <AnimatedMulti data={therapeuticData} />
        </div>

        <div className="form-group">
          <label htmlFor="codigo">Código de barra</label>
          <input
            {...register("codigo")}
            id="codigo"
            className="action-input"
            type="text"
            placeholder="Ingresa el código de barra"
            onChange={(e) => e.target.value}
          />
        </div>

        <div className="form-group checkbox">
          <input
            {...register("requierePrescripcion")}
            type="checkbox"
            className="action-checkbox"
            id="prescripcion"
            onChange={(e) =>  e.target.checked}
          />
          <label htmlFor="prescripcion">Requiere prescripción médica</label>
        </div>
      </div>
    </>
  );
};
