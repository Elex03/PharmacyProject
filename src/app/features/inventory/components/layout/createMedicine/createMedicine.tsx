import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreateMedicineHeader } from "./createMedicine-Header";
import { BasicInformationForm } from "../../../../../shared/components/forms/createMedicineForm/BasicInformationForm";

import "./createMedicine.css";
import "../../../../../shared/styles/shared.css"
import { FinancialsInventoryForm } from "../../../../../shared/components/forms/createMedicineForm/FinancialsInventoryForm";

interface Medicine {
  nombre: string;
  accion: string;
  codigo: string;
  requierePrescripcion: boolean;
}

interface CreateMedicineModalProps {
  onClose: () => void;
}
const CreateMedicineModal: React.FC<CreateMedicineModalProps> = ({
  onClose,
}) => {
  const [tab, setTab] = useState<"basico" | "financiero">("basico");
  const [Medicine, setMedicine] = useState<Medicine>({
    nombre: "",
    accion: "",
    codigo: "",
    requierePrescripcion: false,
  });

  const handleChange = (key: keyof Medicine, value: string | boolean) => {
    setMedicine((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="modal-overlay">
      <motion.div
        className="medicamento-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4 }}
      >
        <CreateMedicineHeader medicine={Medicine} onChange={handleChange} />
        <div className="tabs">
          <button
            className={tab === "basico" ? "active" : ""}
            onClick={() => setTab("basico")}
          >
            Información básica
          </button>
          <button
            style={{ marginLeft: "-1px" }}
            className={tab === "financiero" ? "active" : ""}
            onClick={() => setTab("financiero")}
          >
            Datos financieros e inventario
          </button>
        </div>

        <div className="tab-content">
          <AnimatePresence mode="wait">
            {tab === "basico" && (
              <motion.div
                key="basico"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="tab-panel"
              >
                <BasicInformationForm/>
              </motion.div>
            )}

            {tab === "financiero" && (
              <motion.div
                key="financiero"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="tab-panel"
              >
               <FinancialsInventoryForm/>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="action-buttons">
          <button className="cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="guardar"
            onClick={() => {
              console.log(Medicine);
            }}
          >
            Guardar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateMedicineModal;
