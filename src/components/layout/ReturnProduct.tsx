import React, { useState } from "react";
import { motion } from "framer-motion";
import '../../pages/Inventory.css'

interface ReturnProductProps {
  medicines: { id: number; nombreComercial: string }[];
}

const ReturnProduct: React.FC<ReturnProductProps> = ({ medicines }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  const handleScan = () => {
    alert("Función de escaneo aún no implementada"); // Aquí puedes integrar la funcionalidad
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Devolución registrada:", { selectedMedicine, quantity, reason });

    // Reiniciar valores
    setSelectedMedicine("");
    setQuantity("");
    setReason("");
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={toggleForm} className="registro-button">
        Devolución de Producto
      </button>

      {isOpen && (
  <>
    <div className="modal-overlay" onClick={toggleForm}></div>
    <motion.div
      className="return-form-container"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <h3>Registrar Devolución</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="medicamento">Medicamento:</label>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <select
            id="medicamento"
            value={selectedMedicine}
            onChange={(e) => setSelectedMedicine(e.target.value)}
            required
          >
            <option value="">Seleccione un medicamento</option>
            {medicines.map((med) => (
              <option key={med.id} value={med.nombreComercial}>
                {med.nombreComercial}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleScan} className="scan-btn">
            Escanear
          </button>
        </div>

        <label htmlFor="cantidad">Cantidad a devolver:</label>
        <input
          type="number"
          id="cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />

        <label htmlFor="razon">Razón de devolución:</label>
        <textarea
          id="razon"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          required
        ></textarea>

        <div className="form-buttons">
          <button type="submit">Confirmar Devolución</button>
          <button type="button" onClick={toggleForm} className="cancel-btn">
            Cancelar
          </button>
        </div>
      </form>
    </motion.div>
  </>
)}

    </div>
  );
};

export default ReturnProduct;
