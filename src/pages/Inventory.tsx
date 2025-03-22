import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component"; // Importamos el tipo TableColumn
import "./Inventory.css";

// Definimos la interfaz para la estructura de los datos que estamos manejando
interface Record {
  descripcion: string;
  stock: number;
  distribuidor: string;
  fechaVencimiento: string;
}

function Inventory() {
  // Definir las columnas de la tabla con tipos adecuados
  const columns: TableColumn<Record>[] = [
    // Aseguramos que sea del tipo 'TableColumn<Record>'
    {
      name: "Descripción",
      selector: (row: Record) => row.descripcion, // Definimos el tipo de 'row'
      sortable: true,
    },
    {
      name: "Estado de stock",
    },
    {
      name: "Inventario",
      selector: (row: Record) => `${row.stock} en stock`,
    },
    {
      name: "Distribuidor",
      selector: (row: Record) => row.distribuidor,
    },
    {
      name: "Fecha de vencimiento",
      selector: (row: Record) => row.fechaVencimiento,
    },
  ];

  // Estado para almacenar los datos cargados desde el JSON
  const [records, setRecords] = useState<Record[]>([]);
  const [originalData, setOriginalData] = useState<Record[]>([]); // Estado para los datos originales (sin filtrar)
  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para almacenar la búsqueda
  const [sortAsc, setSortAsc] = useState<boolean>(true); // Estado para controlar el orden de clasificación

  // Cargar datos desde el archivo JSON
  useEffect(() => {
    fetch("/data.json") // Ruta al archivo JSON (debe estar en la carpeta 'public')
      .then((response) => response.json())
      .then((data: Record[]) => {
        setRecords(data); // Actualiza el estado de los registros
        setOriginalData(data); // Guardar los datos originales para restaurarlos después
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
  }, []);

  // Filtrar registros en función de la búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query); // Actualiza el estado de búsqueda

    if (query === "") {
      setRecords(originalData); // Si la búsqueda está vacía, restauramos los datos originales
    } else {
      const filteredRecords = originalData.filter((record) =>
        record.descripcion.toLowerCase().includes(query.toLowerCase())
      );
      setRecords(filteredRecords); // Filtrar sobre los datos originales
    }
  };

  // Ordenar los registros en orden ascendente o descendente
  const handleSort = () => {
    const sortedRecords = [...records].sort((a, b) => {
      return sortAsc
        ? a.descripcion.localeCompare(b.descripcion)
        : b.descripcion.localeCompare(a.descripcion);
    });
    setRecords(sortedRecords);
    setSortAsc(!sortAsc);
  };

  return (
    <div className="container">
      <h2>Inventario</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select>
          <option>Filtrar por nombre</option>
          {/* Aquí puedes agregar más opciones si lo necesitas */}
        </select>
        <select>
          <option>Categoría</option>
          {/* Aquí puedes agregar más opciones si lo necesitas */}
        </select>
        <button onClick={handleSort}>
          {sortAsc ? "Ascendente" : "Descendente"}
        </button>
        <button className="register">Registrar pedido</button>
      </div>

      <DataTable
        columns={columns}
        data={records} // Usa los datos filtrados o completos
        selectableRows
        pagination // Activar la paginación integrada de DataTable
        onSelectedRowsChange={(data) => console.log(data)}
        fixedHeader
      />
    </div>
  );
}

export default Inventory;
