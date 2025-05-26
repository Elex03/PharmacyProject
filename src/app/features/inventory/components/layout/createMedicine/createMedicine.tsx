import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreateMedicineHeader } from "./createMedicine-Header";
import { BasicInformationForm } from "../createMedicineForm/BasicInformationForm";
import { FinancialsInventoryForm } from "../createMedicineForm/FinancialsInventoryForm";
import { useForm, FormProvider } from "react-hook-form";
import type { FullMedicineData } from "../../../../../../types";
import { createMedicine } from "../../../../../shared/api/services/Medicine";

import "./createMedicine.css";
import "../../../../../shared/styles/shared.css";

interface CreateMedicineModalProps {
  onClose: () => void;
}

const CreateMedicineModal: React.FC<CreateMedicineModalProps> = ({
  onClose,
}) => {
  const [tab, setTab] = useState<"basico" | "financiero">("basico");

  const methods = useForm<FullMedicineData>({
    defaultValues: {
      nombre: "",
      codigo: "",
      accioTera: [],
      presentacion: 0,
      via: "",
      fabricante: 0,
      imagen: undefined,
      sintomas: [],
      requierePrescripcion: false,
      precioCompra: 0,
      precioVenta: 0,
      minStock: 0,
      maxStock: 0,
    },
  });

  const onSubmit = (data: FullMedicineData) => {
    console.log("Form submitted with data:", data);
    createMedicine(data)
      .then(() => {
        console.log("Medicine created successfully");

        onClose();
      })
      .catch((error) => {
        console.error("Error creating medicine:", error);
      });
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
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CreateMedicineHeader />

            <div className="tabs">
              <button
                type="button"
                className={tab === "basico" ? "active" : ""}
                onClick={() => setTab("basico")}
              >
                Información básica
              </button>
              <button
                type="button"
                style={{ marginLeft: "-1px" }}
                className={tab === "financiero" ? "active" : ""}
                onClick={() => setTab("financiero")}
              >
                Datos financieros e inventario
              </button>
            </div>

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
              <button
                type="submit"
                className="guardar"
                onClick={(e) => e.stopPropagation()}
              >
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
