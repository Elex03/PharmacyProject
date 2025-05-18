import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreateMedicineHeader } from "./createMedicine-Header";
import { BasicInformationForm } from "../createMedicineForm/BasicInformationForm";
import { FinancialsInventoryForm } from "../createMedicineForm/FinancialsInventoryForm";
import { useForm, FormProvider } from "react-hook-form";

import "./createMedicine.css";
import "../../../../../shared/styles/shared.css";

interface FullMedicineData {
  nombre: string;
  presentacion: number;
  fabricante: number;
  accion: string;
  codigo: string;
  imagen?: File; 
  accioTera: number;
  dosis: number;
  sintomas: string;
  unidad: number; 
  requierePrescripcion: boolean;
  financiero: {
    precioCompra: number;
    precioVenta: number;
    minStock: number;
    maxStock: number;
  };
}

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

  const methods = useForm<FullMedicineData>({
    defaultValues: {
      nombre: "",
      accion: "",
      codigo: "",
      imagen: undefined,
      accioTera: 0,
      presentacion: 0,
      fabricante: 0,
      dosis: 0,
      sintomas: "",
      unidad: 0,
      requierePrescripcion: false,
      financiero: {
        precioCompra: 0,
        precioVenta: 0,
        minStock: 0,
        maxStock: 0,
      },
    },
  });

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

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data) => {
              console.log(data); 
              // onClose();
            })}
          >
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
                  <BasicInformationForm />
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
                  <FinancialsInventoryForm />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="action-buttons">
              <button type="button" className="cancelar" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="guardar">
                Guardar
              </button>
            </div>
          </form>
        </FormProvider>
      </motion.div>
    </div>
  );
};

export default CreateMedicineModal;
