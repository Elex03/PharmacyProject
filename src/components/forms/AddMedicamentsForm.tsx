import { useState } from "react";
import { Select, Input, Button } from "antd";
import selectMedicaments from "../../data/selectMedicaments.json";
import NewMedicationModal from "./NewMedicamentsModal";

export const AddMedicamentsForm = () => {
  const [selectedMedication, setSelectedMedication] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Estados para inputs adicionales
  const [cantidad, setCantidad] = useState("");
  const [dosis, setDosis] = useState("");

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
      <div style={{ flexDirection: 'row', display: 'flex', gap: '10px' }}>
        <Select
          showSearch
          allowClear
          options={selectMedicaments}
          style={{ width: "100%" }}
          placeholder="Buscar o seleccionar un medicamento"
          onChange={handleSelectChange}
          value={selectedMedication || undefined}
          filterOption={(input, option) =>
            option?.value.toLowerCase().includes(input.toLowerCase()) || false
          }
        />
        <Button>
            Agregar           
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <label>Si no tienes un medicamento de ese tipo, agrégalo:</label>
        <Button className="add-medicament-button" onClick={handleAddClick}>
          Agregar Medicamento
        </Button>
      </div>
      {/* Inputs adicionales que se muestran solo si hay un medicamento seleccionado */}
      {selectedMedication && (
        <div style={{ marginTop: "20px" }}>
          <Input
            type="number"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Input
            type="text"
            placeholder="Dosis"
            value={dosis}
            onChange={(e) => setDosis(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </div>
      )}

      <NewMedicationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
