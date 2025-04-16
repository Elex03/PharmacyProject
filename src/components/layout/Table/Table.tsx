import { useEffect, useState } from "react";
import { FilterDropdown, ColumnFilterState } from "./Filter";
import "../Table.css";

type ColumnDefinition<T> = {
  key: keyof T;
  header: string;
  isNumeric?: boolean;
  isDate?: boolean;
};

type TableProps<T> = {
  columns: ColumnDefinition<T>[];
  data: T[];
  itemsPerPage?: number;
  linkColumn?: {
    label: string;
    path: string;
    idKey: keyof T;
  };
};

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  itemsPerPage = 5,
  linkColumn,
}: TableProps<T>) {
  const [filters, setFilters] = useState<Record<string, ColumnFilterState>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChangeFilter = (
    columnKey: string,
    newState: Partial<ColumnFilterState>
  ) => {
    setFilters((prev) => {
      const existing = prev[columnKey] || {
        searchText: "",
        selectedValues: [],
        sortOrder: undefined,
        isOpen: false,
      };

      return {
        ...prev,
        [columnKey]: { ...existing, ...newState },
      };
    });
  };

  const filteredData = data.filter((item) => {
    return columns.every((col) => {
      const f = filters[col.key as string];
      if (!f) return true;
      const value = String(item[col.key]);
      const matchSelected =
        f.selectedValues?.length === 0 || f.selectedValues.includes(value);
      const matchSearch = value
        .toLowerCase()
        .includes(f.searchText?.toLowerCase() || "");
      return matchSelected && matchSearch;
    });
  });

  const sortedData = [...filteredData];
  columns.forEach((col) => {
    const f = filters[col.key as string];
    if (f?.sortOrder !== undefined) {
      sortedData.sort((a, b) => {
        if (col.isNumeric) {
          const aNum = Number(a[col.key]);
          const bNum = Number(b[col.key]);
          return f.sortOrder ? aNum - bNum : bNum - aNum;
        } else if (col.isDate) {
          const dateA = new Date(a[col.key] as string | number).getTime();
          const dateB = new Date(b[col.key] as string | number).getTime();
          return f.sortOrder ? dateB - dateA : dateA - dateB;
        } else {
          const valA = String(a[col.key]).toLowerCase();
          const valB = String(b[col.key]).toLowerCase();
          return f.sortOrder
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
      });
    }
  });

  // Paginación
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(
    null
  );

  const handleImagenClick = (url: string) => {
    setImagenSeleccionada(url);
  };

  const cerrarModal = () => {
    setImagenSeleccionada(null);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setImagenSeleccionada(null);
      }
    };

    if (imagenSeleccionada) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [imagenSeleccionada]);

  return (
    <div className="inventory-container">
      <table className="inventory-table-I">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                style={{
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{col.header}</span>
                  <button
                    onClick={() =>
                      handleChangeFilter(col.key as string, {
                        isOpen: !filters[col.key as string]?.isOpen,
                      })
                    }
                    style={{
                      marginLeft: "8px",
                      fontSize: "12px",
                      backgroundColor: "#fff",
                      padding: "2px 4px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
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
                  </button>
                </div>
                {filters[col.key as string]?.isOpen && (
                  <FilterDropdown
                    columnKey={col.key as string}
                    columnHeader={col.header}
                    allData={data}
                    filter={
                      filters[col.key as string] || {
                        searchText: "",
                        selectedValues: [],
                      }
                    }
                    onChangeFilter={(newState) =>
                      handleChangeFilter(col.key as string, newState)
                    }
                    isNumeric={col.isNumeric}
                    isDate={col.isDate}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.length > 0 ? (
            pageData.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {col.key === "descripcion" ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={row.imagenUrl as string}
                          alt="Imagen"
                          style={{
                            marginRight: "8px",
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          className="w-8 h-8 rounded-full object-cover"
                          onClick={() =>
                            handleImagenClick(row.imagenUrl as string)
                          }
                        />
                        <span>{truncateText(String(row[col.key]), 50)}</span>
                      </div>
                    ) : (
                      truncateText(String(row[col.key]), 50)
                    )}
                  </td>
                ))}
                {linkColumn && (
                  <td
                  style={{ textAlign: "right" }}>
                    <a
                      href={`${linkColumn.path}/${row[linkColumn.idKey]}`}
                      style={{ color: "black", textDecoration: "underline" }}
                    >
                      Ver detalles
                    </a>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: "center", color: "gray" }}
              >
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="pagination" style={{ marginTop: "1rem" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
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
          style={{
            padding: "8px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Siguiente →
        </button>
      </div>
      {imagenSeleccionada && (
        <div
          onClick={cerrarModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            cursor: "zoom-out",
          }}
        >
          <img
            src={imagenSeleccionada}
            alt="Vista ampliada"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              transition: "transform 0.3s",
            }}
            onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic sobre la imagen
          />
        </div>
      )}
    </div>
  );
}
