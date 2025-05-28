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
    onClick?: (nombre: string) => void;
    label: string;
    path?: string;
    idKey?: keyof T;
    type: "modal" | "linked" | "button";
  };
  onOpenModal?: (id: number) => void;
};

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

const emojiByLabel: Record<string, string> = {
  Disponible: "✅",
  "Próximo a agotarse": "⚠️",
  Agotado: "❌",
};

const highlightStyles = [
  {
    labels: ["Disponible", "COMPLETADO"],
    className: "highlight-bubble",
    backgroundColor: "#e0f8e0",
    color: "#317a3e",
  },
  {
    labels: ["Agotado", "EXPIRADO"],
    className: "highlight-bubble",
    backgroundColor: "#fdecea",
    color: "#b91c1c",
  },
  {
    labels: ["Próximo a agotarse"],
    className: "highlight-bubble",
    backgroundColor: "#fff8dc",
    color: "#b57f00",
  },
];

const getHighlightStyle = (label: string) =>
  highlightStyles.find((s) => s.labels.includes(label));

const shouldHighlight = <T,>(col: ColumnDefinition<T>, row: T) =>
  col.isHighlight && Boolean(row[col.key]);

const SetLabelTruncate = ({
  label,
  isHighlight,
}: {
  label: string;
  isHighlight: boolean;
}) => {
  const emoji = emojiByLabel[label] || "";
  const style = isHighlight ? undefined : getHighlightStyle(label);
  return (
    <span
      className={style?.className}
      style={{
        backgroundColor: style?.backgroundColor,
        color: style?.color,
      }}
    >
      {emoji} {truncateText(label, 50)}
    </span>
  );
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

  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);

  useEffect(() => {
    if (columns.length > 0) {
      setVisibleColumns(columns.map((h) => String(h.key)));
    }
  }, [columns]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      e.key === "Escape" && setImagenSeleccionada(null);

    if (imagenSeleccionada) document.addEventListener("keydown", handleKeyDown);

    if (pageData.length === 0) setCurrentPage(1);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    imagenSeleccionada,
    pageData.length,
    setCurrentPage,
    setImagenSeleccionada,
  ]);

  const maxHeight = itemsPerPage === 10 ? "15rem" : "30rem";

  return (
    <div className="table-container">
      <InfoQuantityData QuantityData={filteredData.length} />
      <table className="inventory-table-I">
        <thead>
          <tr>
            {columns
              .filter((col) => visibleColumns.includes(String(col.key)))
              .map((col) => (
                <th key={String(col.key)} className="header-cell">
                  <div className="header-content">
                    <span className="bold-font">{col.header}</span>
                    <button
                      onClick={() =>
                        handleChangeFilter(col.key as string, {
                          isOpen: !filters[col.key as string]?.isOpen,
                        })
                      }
                      className="filter-toggle-btn"
                    >
                      <div className="filter-toggle-icon">
                        <svg width="8" height="8" viewBox="0 0 8 8">
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
              <th className="export-column">
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
                  onColumnChange={setVisibleColumns}
                />
              </th>
            )}
          </tr>
        </thead>
      </table>

      <div
        className="table-body-scroll"
        style={{ maxHeight }} // este lo dejo inline porque depende de prop
      >
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
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: rowIdx * 0.1 }}
                      >
                        {col.key === "descripcion" ? (
                          <span className="descripcion-cell">
                            <img
                              src={`${API_URL}${row.imagenUrl}`}
                              alt="Imagen"
                              className="descripcion-image"
                              onClick={() =>
                                handleImagenClick(row.imagenUrl as string)
                              }
                            />
                            <SetLabelTruncate
                              label={String(row[col.key])}
                              isHighlight={!!shouldHighlight(col, row)}
                            />
                          </span>
                        ) : col.key === "telefono" ? (
                          <a
                            href={`https://wa.me/505${row[col.key]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="telefono-link"
                          >
                            <SetLabelTruncate
                              label={String(row[col.key])}
                              isHighlight={!!shouldHighlight(col, row)}
                            />
                          </a>
                        ) : (
                          <SetLabelTruncate
                            label={String(row[col.key])}
                            isHighlight={!!shouldHighlight(col, row)}
                          />
                        )}
                      </motion.td>
                    ))}
                  {linkColumn && (
                    <motion.td
                      className="link-column-cell"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
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
                          }
                          className="link-button"
                        >
                          {linkColumn.label}
                        </button>
                      ) : linkColumn.type === "button" ? (
                        <button
                          onClick={() =>
                            linkColumn.onClick &&
                            linkColumn.onClick(
                              row.nombre as string ?? "" // ← Aquí mandas la descripción directamente
                            )
                          }
                          className="link-button"
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
                          className="link-anchor"
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
                <td colSpan={columns.length} className="no-results-cell">
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {imagenSeleccionada && (
        <div onClick={cerrarModal} className="modal-overlay">
          <img
            src={imagenSeleccionada}
            alt="Vista ampliada"
            className="modal-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
