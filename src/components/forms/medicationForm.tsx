import React, { useState, useEffect } from "react";
import MultipleSelector from "./multipleSelector";
import { DatePicker, Select, Input } from "antd";
import dayjs from "dayjs";
import compressedForms from "../../data/compressed_forms.json";

interface CompressedForm {
  id: number;
  label: string;
  value: string;
}

import units from "../../data/units.json";
import form from "antd/es/form";

// Interfaces para opciones y registro
export interface OptionType {
  id: number;
  label: string;
  value: string;
}

interface Medication {
  id?: number;
  name?: string;
  presentation?: string;
  key?: number;
  tipo?: string;
  subtipo?: string;
  cantidad?: number;
}

export interface TableRow {
  nombreComercial: string;
  nombreGenerico: string;
  codigoBarra: string;
  categories: OptionType[];
  distributor: OptionType | undefined;
  units: OptionType | undefined;
  form: OptionType | undefined;
  date: string;
  image: string;
  medicament: {
    medications: Medication[];
  };
  compra: {
    cantidad: number;
    precio: number;
    fechaVencimiento: string;
  };
  catalogo?: {
    nombreComercial: string;
    nombreGenerico: string;
    presentacion: string;
  };
}

interface MedicationFormProps {
  onAddMedication: (data: TableRow) => void;
}

const MedicationForm: React.FC<MedicationFormProps> = ({ onAddMedication }) => {
  const [nombreComercial, setNombreComercial] = useState<string>("");
  const [nombreGenerico, setNombreGenerico] = useState<string>("");
  const [codigoBarra, setCodigoBarra] = useState<string>("");
  const [selected, setSelected] = useState<OptionType[]>([]);
  const [image, setImage] = useState<string>("");

  const [distributors, setDistributors] = useState<OptionType[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<OptionType | undefined>(undefined);
  const [selectedForm, setSelectedForm] = useState<CompressedForm[]>([]);

  const [catalogMedications, setCatalogMedications] = useState<
    (OptionType & {
      nombreComercial: string;
      nombreGenerico: string;
      presentacion: string;
    })[]
  >([]);
  const [selectedCatalogMedication, setSelectedCatalogMedication] = useState<
    (OptionType & {
      nombreComercial: string;
      nombreGenerico: string;
      presentacion: string;
    }) | undefined
  >(undefined);

  // Estados para datos de compra
  const [purchaseQuantity, setPurchaseQuantity] = useState<number | undefined>(undefined);
  const [purchasePrice, setPurchasePrice] = useState<number | undefined>(undefined);
  const [purchaseExpiration, setPurchaseExpiration] = useState<string>("");
  const [date] = useState(dayjs().format("YYYY-MM-DD"));

  const medications: Medication[] = [];

  useEffect(() => {
    fetch("https://farmanova-api.onrender.com/apiFarmaNova/distributors/")
      .then((response) => response.json())
      .then((data) => {
        const opts = data.map((item: { id: number; nombre: string }) => ({
          value: item.id.toString(),
          label: item.nombre,
          id: item.id,
        }));
        setDistributors(opts);
      })
      .catch((error) => console.error("Error fetching distributors:", error));
  }, []);

  // Cargar catálogo de medicamentos
  useEffect(() => {
    fetch("https://farmanova-api.onrender.com/apiFarmaNova/medications")
      .then((response) => response.json())
      .then((data) => {
        const catalog = data.map(
          (item: { id: number; nombreComercial: string; nombreGenerico: string; presentacion: string }) => ({
            value: item.id.toString(),
            label: `${item.nombreComercial} - ${item.presentacion}`,
            id: item.id,
            nombreComercial: item.nombreComercial,
            nombreGenerico: item.nombreGenerico,
            presentacion: item.presentacion,
          })
        );
        setCatalogMedications(catalog);
      })
      .catch((error) => console.error("Error fetching medications:", error));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = () => {
    let registro: TableRow;
    if (selectedCatalogMedication) {
      // Se utiliza la información del catálogo
      registro = {
        nombreComercial: selectedCatalogMedication.nombreComercial,
        nombreGenerico: selectedCatalogMedication.nombreGenerico,
        codigoBarra,
        image,
        categories: selected,
        distributor: distributors.find((d) => d.value === selected[0]?.value),
        units: selectedUnit,
        form: selectedForm.length > 0 ? { id: selectedForm[0].id, label: selectedForm[0].label, value: selectedForm[0].value } : undefined,
        date: date,
        medicament: {
          medications,
        },
        compra: {
          cantidad: purchaseQuantity || 0,
          precio: purchasePrice || 0,
          fechaVencimiento: purchaseExpiration || dayjs().format("YYYY-MM-DD"),
        },
        catalogo: {
          nombreComercial: selectedCatalogMedication.nombreComercial,
          nombreGenerico: selectedCatalogMedication.nombreGenerico,
          presentacion: selectedCatalogMedication.presentacion,
        },
      };
    } else {
      // Se utilizan los datos ingresados manualmente
      registro = {
        nombreComercial,
        nombreGenerico,
        codigoBarra,
        image,
        categories: selected,
        distributor: distributors.find((d) => d.value === selected[0]?.value),
        units: selectedUnit,
        form: selectedForm.length > 0 ? { id: selectedForm[0].id, label: selectedForm[0].label, value: selectedForm[0].value } : undefined,
        date: date,
        medicament: {
          medications,
        },
        compra: {
          cantidad: purchaseQuantity || 0,
          precio: purchasePrice || 0,
          fechaVencimiento: purchaseExpiration || dayjs().format("YYYY-MM-DD"),
        },
      };
    }
    onAddMedication(registro);
    // Reinicia campos si lo deseas
  };

  return (
    <div className="medication-form">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Input type="text" placeholder="Nombre Comercial" value={nombreComercial} onChange={(e) => setNombreComercial(e.target.value)} />
        <Input type="text" placeholder="Nombre Genérico" value={nombreGenerico} onChange={(e) => setNombreGenerico(e.target.value)} />
        <Input type="text" placeholder="Código de Barras" value={codigoBarra} onChange={(e) => setCodigoBarra(e.target.value)} />

        <MultipleSelector selected={selected} setSelected={setSelected} options={[]} />

        <label htmlFor="distribuidor">Distribuidor</label>
        <Select
          options={distributors}
          style={{ width: "200px" }}
          onChange={() => {
            /* Maneja la selección si es necesario */
          }}
        />

        <label htmlFor="units">Unidades</label>
        <Select
          options={units.map((unit) => ({ ...unit, id: unit.id.toString() }))}
          style={{ width: "200px" }}
          onChange={(value) => {
            // Puedes manejar la selección de unidad
            const found = units.find((unit) => unit.id.toString() === value);
            if (found) setSelectedUnit({ id: found.id, label: found.label, value: found.id.toString() });
          }}
        />
        <label htmlFor="form">Forma</label>
        <Select
          options={compressedForms}
          style={{ width: "200px" }}
          onChange={(value) => {
            const found = compressedForms.find((form) => form.id.toString() === value);
            if (found) setSelectedForm([{ id: Number(form.id), label: form.label }]);
          }}
        />

        <label htmlFor="image">Imagen del medicamento</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="Preview" style={{ width: "100px", height: "100px", marginTop: "10px" }} />}

        <label htmlFor="date">Fecha de vencimiento</label>
        <DatePicker defaultValue={dayjs()} style={{ width: "200px" }} />

        <label>Catálogo de Medicamentos</label>
        <Select
          placeholder="Selecciona un medicamento del catálogo"
          options={catalogMedications.map((cat) => ({
            value: cat.value,
            label: cat.label,
            nombreComercial: cat.nombreComercial,
            nombreGenerico: cat.nombreGenerico,
            presentacion: cat.presentacion,
          }))}
          style={{ width: "300px" }}
          onChange={(value) => {
            const selectedCat = catalogMedications.find((cat) => cat.value === value);
            setSelectedCatalogMedication(selectedCat);
          }}
        />

        <Input
          type="number"
          placeholder="Cantidad de compra"
          value={purchaseQuantity || ""}
          onChange={(e) => setPurchaseQuantity(Number(e.target.value))}
          style={{ width: "200px" }}
        />
        <Input
          type="number"
          placeholder="Precio de compra"
          value={purchasePrice || ""}
          onChange={(e) => setPurchasePrice(Number(e.target.value))}
          style={{ width: "200px" }}
        />
        <DatePicker
          placeholder="Fecha de vencimiento de compra"
          onChange={(_date, dateString) => setPurchaseExpiration(typeof dateString === "string" ? dateString : "")}
          style={{ width: "200px" }}
        />

        <button onClick={handleSubmit}>Agregar</button>
      </div>
    </div>
  );
};

export default MedicationForm;
