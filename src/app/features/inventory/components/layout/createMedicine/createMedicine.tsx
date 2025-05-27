import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreateMedicineHeader } from "./createMedicine-Header";
import { BasicInformationForm } from "../createMedicineForm/BasicInformationForm";
import { FinancialsInventoryForm } from "../createMedicineForm/FinancialsInventoryForm";
import { useForm, FormProvider } from "react-hook-form";
import type { FullMedicineData } from "../../../../../../types";
import { createMedicine } from "../../../../../shared/api/services/Medicine";
import { toast } from "react-toastify";

import "./createMedicine.css";
import "../../../../../shared/styles/shared.css";
import { useFetchCompanies } from "../../../../ditributors/hooks/useFetchDistributors";
import {
  useFetchCompressedForm,
  useFetchDrugVia,
} from "../../../hooks/useMedicineForm";
import { useModal } from "../../../hooks/useInventoryState";
import { ConfirmModal } from "../../../../../shared/components/forms/AlertDialog";

interface CreateMedicineModalProps {
  onClose: () => void;
}

const CreateMedicineModal: React.FC<CreateMedicineModalProps> = ({
  onClose,
}) => {
  const [tab, setTab] = useState<"basico" | "financiero">("basico");
  const modal = useModal();

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
  const { companiesData } = useFetchCompanies();
  const { compressedForm } = useFetchCompressedForm();
  const { drugVia } = useFetchDrugVia();
  const [pendingData, setPendingData] = useState<FullMedicineData | null>(null);

  const handleConfirmCreation = async () => {
    if (!pendingData) return;
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast
      .promise(
        createMedicine(pendingData),
        {
          pending: "Guardando medicamento...",
          success: "Medicamento creado exitosamente",
          error: "Hubo un error al crear el medicamento",
        },
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      )
      .then(() => {
        modal.onClose();
        onClose();
      })
      .catch((error) => {
        console.error("Error creating medicine:", error);
      });
  };

  const onSubmit = (data: FullMedicineData) => {
    setPendingData(data);
    modal.onOpen();
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
            <CreateMedicineHeader title="Registrar medicamento" />

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
                  <BasicInformationForm
                    companiesData={companiesData}
                    compressedForm={compressedForm}
                    drugVia={drugVia}
                  />
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

      {modal.isOpen && (
        <ConfirmModal
          title="Confirmar creación"
          message="¿Estás seguro de que deseas crear este medicamento? Esta acción no se puede deshacer."
          cancelText="Cancelar"
          confirmText="Confirmar"
          isOpen={modal.isOpen}
          onCancel={modal.onClose}
          onConfirm={handleConfirmCreation}
        />
      )}
    </div>
  );
};

export default CreateMedicineModal;
