import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Header } from "../../../shared/components/layout/Header";

interface Medicine {
  id: number;
  nombreComercial: string;
}

interface ReturnProductProps {
  medicines: Medicine[];
  onClose: () => void;
}

interface ReturnProductForm {
  medicineId: number;
  batch: string;
  cantidad: number;
  razon: string;
}

const batchesData: Record<number, string[]> = {
  1: ["L001", "L002", "L003"],
  2: ["L101", "L102"],
  3: ["L201"],
};

const ReturnProduct: React.FC<ReturnProductProps> = ({
  medicines,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReturnProductForm>();

  const [selectedMedicineId, setSelectedMedicineId] = useState<number | null>(
    null
  );
  const [batches, setBatches] = useState<string[]>([]);

  const onSubmit = (data: ReturnProductForm) => {
    console.log("Datos enviados a la API:", data);
    reset();
    onClose();
  };

  useEffect(() => {
    if (selectedMedicineId !== null) {
      setBatches(batchesData[selectedMedicineId] || []);
    } else {
      setBatches([]);
    }
  }, [selectedMedicineId]);

  return (
    <div className="modal-overlay">
      <motion.div
        className="return-form-container"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div style={{ margin: "0px 0px 10px -10px" }}>
          <Header title="Devolución de medicamento" size="1.2rem" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group-BasicInformationForm">
            <label htmlFor="medicine">Seleccionar medicamento</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <select
                id="medicine"
                className="action-select-BasicInformationForm"
                {...register("medicineId", { required: true })}
                onChange={(e) => setSelectedMedicineId(Number(e.target.value))}
              >
                <option value="">Selecciona un medicamento</option>
                {medicines.map((med) => (
                  <option key={med.id} value={med.id}>
                    {med.nombreComercial}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() =>
                  alert("Funcionalidad de escanear aún no implementada")
                }
                className="escanear-boton"
              >
                Escanear
              </button>
            </div>
            {errors.medicineId && (
              <span className="error">Requiere seleccionar un medicamento</span>
            )}
          </div>

          {batches.length > 0 && (
            <div className="form-group">
              <label htmlFor="batch">Número de lote</label>
              <select
                id="batch"
                className="action-select-BasicInformationForm"
                {...register("batch", { required: true })}
              >
                <option value="">Selecciona un lote</option>
                {batches.map((batch, index) => (
                  <option key={index} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
              {errors.batch && (
                <span className="error">Requiere seleccionar un lote</span>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="cantidad">Cantidad a devolver:</label>
            <input
              type="number"
              id="cantidad"
              placeholder="00"
              {...register("cantidad", { required: true, min: 1 })}
              className="action-input"
            />
            {errors.cantidad && (
              <span className="error">Cantidad inválida</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="razon">Razón de devolución:</label>
            <textarea
              id="razon"
              rows={3}
              {...register("razon", { required: true })}
              className="textarea-BasicInformationForm"
            />
            {errors.razon && <span className="error">Campo requerido</span>}
          </div>

          <div className="action-buttons">
            <button type="button" onClick={onClose} className="cancelar">
              Cancelar
            </button>
            <button type="submit" className="guardar">
              Confirmar Devolución
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ReturnProduct;
