import React from "react";
import "./createMedicine.css";
import { Header } from "../../../../../shared/components/layout/Header";
import { AnimatedMulti } from "../../../../../shared/components/forms/multipleSelector";
import { useFetchTherapeuticAction } from "../../../hooks/useMedicineForm";
interface Medicine {
  nombre: string;
  accion: string;
  codigo: string;
  requierePrescripcion: boolean;
}

interface Props {
  medicine: Medicine;
  onChange: (key: keyof Medicine, value: string | boolean) => void;
}


export const CreateMedicineHeader: React.FC<Props> = ({
  medicine,
  onChange,
}) => {
  
  const {therapeuticData} = useFetchTherapeuticAction();
  return (
    <>
      <div style={{ margin: "0 -10px" }}>
        <Header title="Registar medicamento" size="1.5rem" />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            className="action-input"
            placeholder="Ingresa el nombre del medicine"
            value={medicine.nombre}
            onChange={(e) => onChange("nombre", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="accion">Acción terapéutica</label>
         <AnimatedMulti data={therapeuticData}/>
        </div>

        <div className="form-group">
          <label htmlFor="codigo">Código de barra</label>
          <input
            id="codigo"
            className="action-input"
            type="text"
            placeholder="Ingresa el código de barra"
            value={medicine.codigo}
            onChange={(e) => onChange("codigo", e.target.value)}
          />
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            className="action-checkbox"
            id="prescripcion"
            checked={medicine.requierePrescripcion}
            onChange={(e) => onChange("requierePrescripcion", e.target.checked)}
          />
          <label htmlFor="prescripcion">Requiere prescripción médica</label>
        </div>
      </div>
    </>
  );
};
