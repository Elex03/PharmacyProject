import React from "react";
import { Select, Input } from "antd";

const { Option } = Select;

interface MedicamentsSelectorProps {
  selectedOption: string | undefined;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedType: string | undefined;
  setSelectedType: React.Dispatch<React.SetStateAction<string | undefined>>;
  blisterUnits: number | undefined;
  setBlisterUnits: React.Dispatch<React.SetStateAction<number | undefined>>;
  unitsPerBlister: number | undefined;
  setUnitsPerBlister: React.Dispatch<React.SetStateAction<number | undefined>>;
  unit: string;
  setUnit: React.Dispatch<React.SetStateAction<string>>;
  quantityBoxes: number | undefined;
  setQuantityBoxes: React.Dispatch<React.SetStateAction<number | undefined>>;
  medications: Medication[];
  setMedications: React.Dispatch<React.SetStateAction<Medication[]>>;
}

const MedicamentsSelector: React.FC<MedicamentsSelectorProps> = ({
  selectedOption,
  setSelectedOption,
  selectedType,
  setSelectedType,
  blisterUnits,
  setBlisterUnits,
  unitsPerBlister,
  setUnitsPerBlister,
  unit,
  setUnit,
  quantityBoxes,
  setQuantityBoxes,
}) => {

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number | undefined>>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value === "" ? undefined : Number(value));
    }
  };


  return (
    <div>
      <label>Seleccionar:</label>
      <Select value={selectedOption} style={{ width: 200 }} onChange={setSelectedOption} placeholder="Caja o Unidad">
        <Option value="caja">Caja</Option>
        <Option value="unidad">Unidad</Option>
      </Select>

      {selectedOption === "caja" && (
        <>
          <label>Tipo:</label>
          <Select value={selectedType} style={{ width: 200 }} onChange={setSelectedType} placeholder="Seleccione tipo">
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

    </div>
  );
};

export default MedicamentsSelector;
