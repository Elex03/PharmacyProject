import React, { useState } from "react";
import { Select, Input, Button, message } from "antd";

const { Option } = Select;

const MedicamentsSelector: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [blisterUnits, setBlisterUnits] = useState<number | undefined>();
  const [unitsPerBlister, setUnitsPerBlister] = useState<number | undefined>();
  const [unit, setUnit] = useState<string>("");
  const [quantityBoxes, setQuantityBoxes] = useState<number | undefined>();


  const [medications, setMedications] = useState<Medication[]>([]);

  const handleSelectOption = (value: string) => {
    setSelectedOption(value);
    setSelectedType(undefined);
  };

  const handleSelectType = (value: string) => setSelectedType(value);

  const handleNumberInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number | undefined>>
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value === "" ? undefined : Number(value));
    }
  };

  const handleAddMedication = () => {
    if (!selectedOption) {
      message.error("Seleccione una opción (Caja o Unidad)");
      return;
    }
    
    if (selectedOption === "caja" && !quantityBoxes) {
      message.error("Ingrese la cantidad de cajas");
      return;
    }

    if (selectedOption === "caja" && selectedType === "blister" && (!blisterUnits || !unitsPerBlister)) {
      message.error("Complete los campos de blister");
      return;
    }

    if (selectedOption === "unidad" && !unit) {
      message.error("Ingrese la unidad");
      return;
    }

    const newMedication = {
      key: medications.length + 1,
      tipo: selectedOption,
      subtipo: selectedType || "N/A",
      cantidad: selectedOption === "unidad" ? unit : quantityBoxes,
    };

    setMedications([...medications, newMedication]);
    message.success("Medicamento agregado correctamente");
  };



  return (
    <div className="shopping-page">
      <h2>Registro de Medicamentos</h2>
      <div className="shopping-actions">
        <label>Seleccionar:</label>
        <Select value={selectedOption} style={{ width: 200 }} onChange={handleSelectOption} placeholder="Caja o Unidad">
          <Option value="caja">Caja</Option>
          <Option value="unidad">Unidad</Option>
        </Select>

        {selectedOption === "caja" && (
          <>
            <label>Tipo:</label>
            <Select value={selectedType} style={{ width: 200 }} onChange={handleSelectType} placeholder="Seleccione tipo">
              <Option value="blister">Blister</Option>
              <Option value="unidad">Unidad</Option>
            </Select>

            {selectedType === "blister" && (
              <>
                <label>Unidades por blister:</label>
                <Input type="text" value={blisterUnits || ""} onChange={(e) => handleNumberInput(e, setBlisterUnits)} style={{ width: 200 }} />
                <label>Unidades por medicamento:</label>
                <Input type="text" value={unitsPerBlister || ""} onChange={(e) => handleNumberInput(e, setUnitsPerBlister)} style={{ width: 200 }} />
              </>
            )}

            <label>Cantidad de Cajas:</label>
            <Input type="text" value={quantityBoxes || ""} onChange={(e) => handleNumberInput(e, setQuantityBoxes)} style={{ width: 200 }} />
          </>
        )}

        {selectedOption === "unidad" && (
          <>
            <label>Unidad:</label>
            <Input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} style={{ width: 200 }} />
          </>
        )}

        <Button type="primary" style={{ marginTop: "10px" }} onClick={handleAddMedication}>Agregar</Button>
      </div>
    </div>
  );
};

export default MedicamentsSelector;
