import  { useState } from "react";
import { Select } from "antd";
import selectMedicaments from "../../data/selectMedicaments.json";
import NewMedicationModal from "./NewMedicamentsModal";

export const AddMedicamentsForm = () => {
  const [selectedMedication, setSelectedMedication] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSelectChange = (value: string) => {
    setSelectedMedication(value);
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="add-medicaments-form">
      <h2>Agregar Medicamentos</h2>
      <label>Si ya tienes un medicamento de ese tipo, selecciónalo:</label>
      <Select
        options={selectMedicaments}
        style={{ width: "100%" }}
        placeholder="Seleccionar un medicamento"
        onChange={handleSelectChange}
        value={selectedMedication || undefined}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <label>Si no tienes un medicamento de ese tipo, agrégalo:</label>
        <button className="add-medicament-button" onClick={handleAddClick}>
          Agregar Medicamento
        </button>
      </div>
      <NewMedicationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
