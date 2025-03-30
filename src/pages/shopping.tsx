import React, { useState, useEffect } from "react";
import MultipleSelector from "../components/forms/multipleSelector";
import SelectItem from "../components/forms/selectItem";
import compressedForms from "../data/compressed_forms.json";
import { DatePicker } from "antd";
import units from "../data/units.json";
import dayjs from "dayjs";
import MedicamentsSelector from "../components/forms/medicamentsSelector";

interface Option {
  id: number;
  label: string;
  value: string;
}

interface TableRow {
  nombreComercial: string;
  nombreGenerico: string;
  categories: Option[];
  distributor: Option | undefined;
  units: Option | undefined;
  form: Option | undefined;
  date: string;
  image: string; // Almacena la URL de la imagen
}

const Shopping: React.FC = () => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<Option[]>([]);
  const [distributors, setDistributors] = useState<Option[]>([]);
  const [nombreComercial, setNombreComercial] = useState<string>("");
  const [nombreGenerico, setNombreGenerico] = useState<string>("");
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/inventory/getCategories")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los datos");
        return response.json();
      })
      .then((data) => {
        const options = data.map((item: { id: number; label: string }) => ({
          value: item.id.toString(),
          label: item.label,
        }));
        setOptions(options);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/distributors/")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los datos");
        return response.json();
      })
      .then((data) => {
        const options = data.map((item: { id: number; nombre: string }) => ({
          value: item.id.toString(),
          label: item.nombre,
        }));
        setDistributors(options);
      });
  }, []);

  // Manejar la selección de una imagen y generar una vista previa
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleAddToTable = () => {
    const newItem: TableRow = {
      nombreComercial,
      nombreGenerico,
      image,
      categories: selected,
      distributor: distributors.find((d) => d.value === selected[0]?.value),
      units: units.find((unit) => unit.id.toString() === selected[0]?.value),
      form: compressedForms
        .map((form) => ({ ...form, id: Number(form.id) }))
        .find((form) => form.id.toString() === selected[0]?.value),
      date: dayjs().format("YYYY-MM-DD"),
    };
    setTableData([...tableData, newItem]);
    setImage("");
  };

  return (
    <div className="shopping-page">
      <h2>Compras</h2>
      <div className="shopping-actions">
        <input
          type="text"
          placeholder="Nombre Comercial"
          value={nombreComercial}
          onChange={(e) => setNombreComercial(e.target.value)}
          className="input-nombre-comercial"
        />
        <input
          type="text"
          placeholder="Nombre Generico"
          value={nombreGenerico}
          onChange={(e) => setNombreGenerico(e.target.value)}
          className="input-nombre-generico"
        />
        <MedicamentsSelector/>
        <MultipleSelector selected={selected} setSelected={setSelected} options={options} />
        <label htmlFor="distributor">Distribuidor</label>
        <SelectItem options={distributors.map((d) => ({ ...d, id: d.id.toString() }))} />
        <label htmlFor="units">Unidades</label>
        <SelectItem options={units.map((unit) => ({ ...unit, id: unit.id.toString() }))} />
        <label htmlFor="form">Forma</label>
        <SelectItem options={compressedForms} />

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <img src={image} alt="Preview" style={{ width: "100px", height: "100px", marginTop: "10px" }} />}

        <DatePicker defaultValue={dayjs()} />

        {/* Botón para agregar los datos a la tabla */}
        <button onClick={handleAddToTable}>Agregar</button>

        {/* Tabla que muestra los datos agregados */}
        <table>
          <thead>
            <tr>
              <th>Nombre Comercial</th>
              <th>Nombre Genérico</th>
              <th>Fecha</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>{item.nombreComercial}</td>
                <td>{item.nombreGenerico}</td>
                <td>{item.date}</td>
                <td>
                  {item.image && <img src={item.image} alt="Producto" style={{ width: "50px", height: "50px" }} />}
                </td>
                <td>
                  <button>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shopping;
