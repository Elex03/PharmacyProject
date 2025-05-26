import { useEffect, useState } from "react";
import { FilterDropdown } from "./Filter";
import { ExportOption } from "../../exportDocuments/exports/Option";
import { motion } from "framer-motion";

import "./Table.css";
import { InfoQuantityData } from "../infoQuantityData";
import { PaginationFooter } from "./PaginationFooter";
import { useTableState } from "./hooks/useTableState";
import { API_URL } from "../../config";

type ColumnDefinition<T> = {
  key: keyof T;
  header: string;
  isNumeric?: boolean;
  isDate?: boolean;
  isHighlight?: true;
};

type TableProps<T> = {
  columns: ColumnDefinition<T>[];
  data: T[];
  itemsPerPage?: number;
  linkColumn?: {
    label: string;
    path?: string;
    idKey?: keyof T;
    type: "modal" | "linked";
  };
  onOpenModal?: (id: number) => void;
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  itemsPerPage = 5,
  linkColumn,
  onOpenModal,
}: TableProps<T>) {
  const {
    handleChangeFilter,
    handleImagenClick,
    handlePageChange,
    cerrarModal,
    imagenSeleccionada,
    setImagenSeleccionada,
    pageData,
    sortedData,
    filteredData,
    filters,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useTableState(columns, data, itemsPerPage);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setImagenSeleccionada(null);
      }
    };

    if (imagenSeleccionada) {
      document.addEventListener("keydown", handleKeyDown);
    }

    if (pageData.length === 0) {
      setCurrentPage(1);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    imagenSeleccionada,
    pageData.length,
    setCurrentPage,
    setImagenSeleccionada,
  ]);

  const maxHeight = itemsPerPage === 5 ? "15rem" : "30rem";
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((h) => String(h.key))
  );

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <InfoQuantityData QuantityData={filteredData.length} />

      <table className="inventory-table-I">
        <thead>
          <tr>
            {columns
              .filter((col) => visibleColumns.includes(String(col.key)))
              .map((col) => (
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
                    <span className="bold-font">{col.header}</span>
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
                          border: "1px solid #ccc",
                          borderRadius: "4px", // Esquinas ligeramente redondeadas (opcional)
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
            {linkColumn && (
              <div className="export-column">
                <ExportOption
                  filename="Distribuidores"
                  headers={columns.map((col) => ({
                    ...col,
                    key: String(col.key),
                  }))}
                  data={sortedData}
                  titleInfo={[
                    ["Farmacia Farmavalue"],
                    ["Cuidamos de ti, cada día."],
                    ["De la farmacia San Benito 10 crs al sur 1/2 al oeste"],
                    ["Tel: 2255-4524"],
                    [""],
                  ]}
                  onColumnChange={setVisibleColumns} // NUEVO
                />
              </div>
            )}
          </tr>
        </thead>
      </table>
      <div className="table-body-scroll" style={{ maxHeight: `${maxHeight}` }}>
        <table className="inventory-table-I">
          <tbody>
            {pageData.length > 0 ? (
              pageData.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {columns
                    .filter((col) => visibleColumns.includes(String(col.key)))
                    .map((col) => (
                      <motion.td
                        key={String(col.key)}
                        initial={{ opacity: 0, x: -10 }}
                        viewport={{ once: true }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: rowIdx * 0.1 }}
                      >
                        {col.key === "descripcion" ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                          >
                            <img
                               src={`${API_URL}${row.imagenUrl}`}
                              alt="Imagen"
                              style={{
                                marginRight: "8px",
                                width: "40px",
                                height: "40px",
                                cursor: "pointer",
                                objectFit: "cover",
                              }}
                              className="w-8 h-8 rounded-full object-cover"
                              onClick={() =>
                                handleImagenClick(`${API_URL}${row.imagenUrl}`)
                              }
                            />
                            <SetLabelTrucate
                              label={String(row[col.key])}
                              isHighlight={shouldHighlight(col, row)}
                            />
                          </span>
                        ) : col.key === "telefono" ? (
                          <a
                            href={`https://wa.me/505${row[col.key]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "black",
                              textDecoration: "underline",
                            }}
                          >
                            <SetLabelTrucate
                              label={String(row[col.key])}
                              isHighlight={shouldHighlight(col, row)}
                            />
                          </a>
                        ) : (
                          <SetLabelTrucate
                            label={String(row[col.key])}
                            isHighlight={shouldHighlight(col, row)}
                          />
                        )}
                      </motion.td>
                    ))}
                  {linkColumn && (
                    <motion.td
                      style={{ textAlign: "right" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: pageData.length * 0.05,
                      }}
                    >
                      {linkColumn.type === "modal" ? (
                        <button
                          onClick={() =>
                            onOpenModal &&
                            onOpenModal(
                              linkColumn.idKey
                                ? Number(row[linkColumn.idKey])
                                : 0
                            )
                          } // Llamamos la función para abrir el modal
                          style={{
                            color: "black",
                            textDecoration: "underline",
                            background: "none",
                            border: "none",
                          }}
                        >
                          {linkColumn.label}
                        </button>
                      ) : (
                        <a
                          href={
                            linkColumn.idKey
                              ? `${linkColumn.path}/${row[linkColumn.idKey]}`
                              : "#"
                          }
                          style={{
                            color: "black",
                            textDecoration: "underline",
                          }}
                        >
                          {linkColumn.label}
                        </a>
                      )}
                    </motion.td>
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
      </div>

      {/* Paginación */}
      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
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
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

interface propsHighlight {
  label: string;
  isHighlight: boolean;
}

const SetLabelTrucate: React.FC<propsHighlight> = ({ label, isHighlight }) => {
  const emojiByLabel: Record<string, string> = {
    Disponible: "✅",
    "Próximo a agotarse": "⚠️",
    Agotado: "❌",
  };

  const emoji = emojiByLabel[label] || "";
  const redHighlight = [
    {
      states: [
        {
          green: {
            className: "highlight-bubble",
            labels: ["Disponible", "COMPLETADO"],
            backgroundColor: "#e0f8e0",
            color: "#317a3e",
          },
          red: {
            className: "highlight-bubble",
            labels: ["Agotado", "EXPIRADO"],
            backgroundColor: "#fdecea",
            color: "#b91c1c",
          },
          yellow: {
            className: "highlight-bubble",
            labels: ["Próximo a agotarse"],
            backgroundColor: "#fff8dc", // amarillo claro
            color: "#b57f00", // texto mostaza oscuro
            icon: "",
          },
        },
      ],
    },
  ];

  const getHighlightStyle = (
    label: string
  ):
    | { className: string; backgroundColor: string; color: string }
    | undefined => {
    for (const group of redHighlight) {
      for (const state of group.states) {
        for (const key in state) {
          const status = state[key as "green" | "red" | "yellow"];
          if (status.labels.includes(label)) {
            return {
              className: status.className,
              backgroundColor: status.backgroundColor,
              color: status.color,
            };
          }
        }
      }
    }
    return undefined;
  };
  const style = isHighlight ? undefined : getHighlightStyle(String(label));

  return (
    <span
      className={style?.className}
      style={{
        backgroundColor: style?.backgroundColor,
        color: style?.color,
      }}
    >
      {emoji} {truncateText(String(label), 50)}
    </span>
  );
};

const shouldHighlight = <T,>(col: ColumnDefinition<T>, row: T) => {
  return col.isHighlight === true && Boolean(row[col.key]);
};
