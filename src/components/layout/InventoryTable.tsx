import React, { useState, useEffect, useRef } from "react";

import "./Table.css";

interface InventoryItem {
  id: number;
  descripcion: string;
  stock: string;
  inventario: number;
  distribuidor: string;
  vencimiento: string;
  nombreComercial: string;
  nombreGenerico: string;
  formaFarmaceutica: string;
  concentracion: string;
  presentacion: string;
  laboratorio: string;
  precioCompra: number;
  precioVenta: string;
  margenUtilidad: number;
}

// Estructura de los filtros para cada columna
interface ColumnFilterState {
  // Orden ascendente (true), descendente (false) o sin orden (undefined)
  sortOrder?: boolean;
  // Texto de búsqueda (para filtrar los valores de la lista)
  searchText: string;
  // Lista de valores chequeados (solo esos se mostrarán)
  selectedValues: string[];
  // Control de apertura/cierre del menú de filtros
  isOpen: boolean;
}

interface InventoryTableProps {
  data: InventoryItem[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ data }) => {
  // Guardamos la información de filtros para cada columna en un objeto
  // donde la key es el nombre de la propiedad (por ej: 'descripcion')
  // y el value es el estado de filtros para esa columna.
  const [filterState, setFilterState] = useState<{
    [key: string]: ColumnFilterState;
  }>({});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Lista de columnas que queremos mostrar y filtrar
  const columns = [
    { key: "descripcion", header: "Descripción" },
    { key: "formaFarmaceutica", header: "Forma Farmacéutica" },
    { key: "laboratorio", header: "Laboratorio" },
    { key: "stock", header: "Estado de stock" },
    { key: "inventario", header: "En inventario" },
    { key: "vencimiento", header: "Fecha de vencimiento" },
    { key: "precioCompra", header: "Precio Compra" },
    { key: "precioVenta", header: "Precio Venta" },
    { key: "margenUtilidad", header: "Margen de Utilidad" },
  ];

  // Inicializamos los filtros con todos los valores chequeados para cada columna
  useEffect(() => {
    const initialState: { [key: string]: ColumnFilterState } = {};
    columns.forEach((col) => {
      const allValues = data.map((item) => String(item[col.key]));
      const uniqueValues = Array.from(new Set(allValues));

      initialState[col.key] = {
        sortOrder: undefined, // sin orden
        searchText: "",
        selectedValues: uniqueValues, // por defecto, todos seleccionados
        isOpen: false,
      };
    });
    setFilterState(initialState);
  }, []);

  // Filtrado y ordenamiento de los datos
  const getFilteredAndSortedData = () => {
    // Clonamos los datos
    let filteredData = [...data];

    // Para cada columna, aplicamos filtros
    columns.forEach((col) => {
      const colKey = col.key;
      const { selectedValues } = filterState[colKey] || {};
      if (selectedValues && selectedValues.length > 0) {
        filteredData = filteredData.filter((item) =>
          selectedValues.includes(String(item[colKey]))
        );
      }
    });

    // Ordenamiento: solo aplicamos el primer orden que encontremos
    // (Si quieres soportar orden múltiple, ajusta la lógica)
    for (let col of columns) {
      const colKey = col.key;
      const { sortOrder } = filterState[colKey] || {};
      if (sortOrder !== undefined) {
        filteredData.sort((a, b) => {
          const aVal = String(a[colKey]);
          const bVal = String(b[colKey]);
          if (aVal < bVal) return sortOrder ? -1 : 1;
          if (aVal > bVal) return sortOrder ? 1 : -1;
          return 0;
        });
        // Si quieres que el orden sea sólo para la primera columna que tenga sortOrder definido,
        // puedes hacer un break aquí. Si no, retira el break para permitir ordenaciones sucesivas.
        break;
      }
    }

    return filteredData;
  };

  const filteredAndSortedData = getFilteredAndSortedData();

  // Paginación
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredAndSortedData.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Callback para actualizar el estado de filtros de una columna
  const updateFilterState = (colKey: string, newState: Partial<ColumnFilterState>) => {
    setFilterState((prev) => ({
      ...prev,
      [colKey]: {
        ...prev[colKey],
        ...newState,
      },
    }));
  };

  return (
    <div className="inventory-container">
      <table className="inventory-table-I">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={{ position: "relative" }}>
                {/* Nombre de la columna (clicable) */}
                <div
                  onClick={() => {
                    // Al hacer clic en el nombre de la columna,
                    // abrimos/cerramos el menú de filtro
                    updateFilterState(col.key, {
                      isOpen: !filterState[col.key]?.isOpen,
                    });
                  }}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {col.header}

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px",
                      border: "1px solid #ccc", // Borde gris claro
                      borderRadius: "2px", // Esquinas ligeramente redondeadas (opcional)
                      backgroundColor: "#fff", // Fondo blanco
                    }}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Flecha hacia abajo (triángulo) */}
                      <path d="M0 2 L4 6 L8 2 Z" fill="#333" />
                    </svg>
                  </div>
                </div>

                {/* Menú de filtro estilo Excel */}
                {filterState[col.key]?.isOpen && (
                  <FilterDropdown
                    columnKey={col.key}
                    columnHeader={col.header}
                    allData={data}
                    filter={filterState[col.key]}
                    onChangeFilter={(newState) => updateFilterState(col.key, newState)}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <tr key={item.id}>
                {columns.map((col) => (
                  <td key={col.key}>{String(item[col.key])}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center", color: "gray" }}>
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination" style={{ marginTop: "1rem" }}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          ← Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default InventoryTable;

/**
 * Componente que representa el menú de filtros al estilo Excel.
 * Contiene:
 * - Orden asc/desc
 * - Búsqueda de valores
 * - Checkboxes con valores únicos
 * - Botón Aplicar y Cancelar
 */
interface FilterDropdownProps {
  columnKey: string;
  columnHeader: string;
  allData: InventoryItem[];
  filter: ColumnFilterState;
  onChangeFilter: (newState: Partial<ColumnFilterState>) => void;
}
const FilterDropdown: React.FC<FilterDropdownProps> = ({
  columnKey,
  columnHeader,
  allData,
  filter,
  onChangeFilter,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { searchText, selectedValues, sortOrder } = filter;

  // Obtenemos todos los valores únicos de la columna (para checkboxes)
  const uniqueValues = Array.from(
    new Set(allData.map((item) => String(item[columnKey])))
  );

  // Filtramos esa lista según el searchText
  const filteredValues = uniqueValues.filter((val) =>
    val.toLowerCase().includes(searchText.toLowerCase())
  );

  // Determinar si "Seleccionar todo" está activo para los valores filtrados
  const allSelected = filteredValues.every((val) =>
    selectedValues.includes(val)
  );

  // Para cerrar el menú al hacer clic afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onChangeFilter({ isOpen: false });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onChangeFilter]);

  const handleApply = () => {
    onChangeFilter({ isOpen: false });
  };

  const handleCancel = () => {
    onChangeFilter({ isOpen: false });
  };

  const toggleSortOrder = (order: boolean) => {
    onChangeFilter({
      sortOrder: sortOrder === order ? undefined : order,
    });
  };

  // Al cambiar "Seleccionar todo"
  const handleSelectAllChange = () => {
    if (allSelected) {
      // Si ya están todos seleccionados, se deseleccionan los filtrados
      const newSelected = selectedValues.filter(
        (val) => !filteredValues.includes(val)
      );
      onChangeFilter({ selectedValues: newSelected });
    } else {
      // Si no están todos seleccionados, se agregan los que no están
      const newSelected = Array.from(new Set([...selectedValues, ...filteredValues]));
      onChangeFilter({ selectedValues: newSelected });
    }
  };

  const toggleValue = (value: string) => {
    let newValues = [...(selectedValues || [])];
    if (newValues.includes(value)) {
      newValues = newValues.filter((v) => v !== value);
    } else {
      newValues.push(value);
    }
    onChangeFilter({ selectedValues: newValues });
  };

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        background: "#fff",
        border: "1px solid #ccc",
        padding: "8px",
        zIndex: 999,
        width: "200px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{columnHeader}</div>

      {/* Opciones de Ordenar */}
      <div style={{ marginBottom: "8px" }}>
        <div
          style={{ cursor: "pointer", marginBottom: "4px" }}
          onClick={() => toggleSortOrder(true)}
        >
          {sortOrder === true ? "✓ " : ""}Ordenar de A a Z
        </div>
        <div
          style={{ cursor: "pointer", marginBottom: "4px" }}
          onClick={() => toggleSortOrder(false)}
        >
          {sortOrder === false ? "✓ " : ""}Ordenar de Z a A
        </div>
      </div>

      <hr style={{ margin: "4px 0" }} />

      {/* Buscador de texto */}
      <input
        type="text"
        placeholder="Buscar..."
        value={searchText}
        onChange={(e) => onChangeFilter({ searchText: e.target.value })}
        style={{ width: "100%", marginBottom: "8px" }}
      />

      {/* Opción "Seleccionar todo" */}
      <div style={{ marginBottom: "8px" }}>
        <label style={{ cursor: "pointer", fontWeight: "bold" }}>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAllChange}
          />{" "}
          Seleccionar todo
        </label>
      </div>

      <div style={{ maxHeight: "120px", overflowY: "auto", marginBottom: "8px" }}>
        {/* Checkboxes de valores */}
        {filteredValues.map((val) => (
          <div key={val}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={selectedValues.includes(val)}
                onChange={() => toggleValue(val)}
              />
              {val}
            </label>
          </div>
        ))}
      </div>

      <hr style={{ margin: "4px 0" }} />

      {/* Botones */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleApply} style={{ marginRight: "8px" }}>
          Aceptar
        </button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};
