import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreateMedicineHeader } from "./createMedicine-Header";
import { BasicInformationForm } from "../createMedicineForm/BasicInformationForm";
import { FinancialsInventoryForm } from "../createMedicineForm/FinancialsInventoryForm";
import { useForm, FormProvider } from "react-hook-form";
import type { FullMedicineData } from "../../../../../../types";
import { updateMedicine } from "../../../../../shared/api/services/Medicine";

import { useFetchCompanies } from "../../../../ditributors/hooks/useFetchDistributors";
import {
  useFetchCompressedForm,
  useFetchDrugVia,
} from "../../../hooks/useMedicineForm";

import "./createMedicine.css";
import "../../../../../shared/styles/shared.css";
import { useFetchOneMedicine } from "../../../hooks/useMedicineForm";
import { API_URL } from "../../../../../shared/components/config";
import { toast } from "react-toastify";

interface EditMedicineProps {
  onClose: () => void;
  selectedMedicineId: number;
}

interface Update extends FullMedicineData {
  medicamentoId: number;
}

const EditMedicine: React.FC<EditMedicineProps> = ({
  onClose,
  selectedMedicineId,
}) => {
  const [tab, setTab] = useState<"basico" | "financiero">("basico");

  const { medicineData } = useFetchOneMedicine(selectedMedicineId);

  const methods = useForm<Update>();

  useEffect(() => {
    if (medicineData) {
      methods.reset({
        medicamentoId: selectedMedicineId,
        nombre: medicineData.nombre || "",
        codigo: medicineData.codigo || "",
        accioTera: medicineData.accioTera || [],
        presentacion: medicineData.presentacion || 0,
        via: medicineData.via || "",
        fabricante: medicineData.fabricante || 0,
        imagen: medicineData.imagen ? API_URL + medicineData.imagen : undefined,
        sintomas: medicineData.sintomas || [],
        requierePrescripcion: medicineData.requierePrescripcion || false,
        precioCompra: medicineData.precioCompra || 0,
        precioVenta: medicineData.precioVenta || 0,
        minStock: medicineData.minStock || 0,
        maxStock: medicineData.maxStock || 0,
      });
    }
  }, [medicineData, methods, methods.reset, selectedMedicineId]);

  const { companiesData } = useFetchCompanies();
  const { compressedForm } = useFetchCompressedForm();
  const { drugVia } = useFetchDrugVia();

  const onSubmit = (data: FullMedicineData) => {
    console.log("Form submitted with data:", data);
    toast
      .promise(
        updateMedicine(data),
        {
          pending: "Editando medicamento...",
          success: "Medicamento actualizado exitosamente",
          error: "Hubo un error al editar el medicamento",
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
            <CreateMedicineHeader title="Editar medicamento" />

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
    </div>
  );
};

export default EditMedicine;
