import { useState, useEffect } from "react";
import { exportToExcel } from "./exportToExcel";
import { exportToPDF } from "./exportToPdf";
import pdfIcon from "../../../assets/img/pdf-icon.svg";
import xlsIcon from "../../../assets/img/xls-icon.svg";

type HeaderItem = {
  key: string;
  header: string;
};

type ExportOptionProps = {
  filename?: string;
  headers: HeaderItem[];
  data: Record<string, unknown>[];
  titleInfo?: string[][];
  onColumnChange?: (visibleColumns: string[]) => void; // NUEVO
};

export const ExportOption: React.FC<ExportOptionProps> = ({
  headers,
  data,
  filename = "Exportacion",
  titleInfo = [],
  onColumnChange, // NUEVO
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [submenu, setSubmenu] = useState<"exportar" | "mostrar" | null>(null);
  const [selectedHeaders, setSelectedHeaders] = useState<string[]>(
    headers.map((h) => h.key)
  );

  // Comunicar cambios de columnas visibles
  useEffect(() => {
    if (onColumnChange) {
      onColumnChange(selectedHeaders);
    }
  }, [selectedHeaders, onColumnChange]);

  return (
    <>
      <button
        className="export-button"
        onClick={() => {
          setShowMenu((prev) => !prev);
          setSubmenu(null);
        }}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: "#6e8192" }}
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M3 18h18v-2H3v2m0-5h18v-2H3v2m0-7v2h18V6H3z" />
        </svg>
      </button>

      {showMenu && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "4px",
            gap: "8px",
          }}
        >
          <div
            onMouseEnter={() => setSubmenu("mostrar")}
            onClick={() => setSubmenu("mostrar")}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Mostrar
          </div>
          <div
            onMouseEnter={() => setSubmenu("exportar")}
            onClick={() => setSubmenu("exportar")}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Exportar
          </div>

          {/* Submenú exportar */}
          {submenu === "exportar" && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "100%",
                transform: "translateY(-50%)",
                marginRight: "8px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                minWidth: "180px",
                zIndex: 1001,
              }}
            >
              <div
                onClick={() => {
                  const filteredHeaders = headers.filter((h) =>
                    selectedHeaders.includes(h.key)
                  );

                  const filteredData = data.map((row) => {
                    const filteredRow: Record<string, unknown> = {};
                    selectedHeaders.forEach((key) => {
                      filteredRow[key] = row[key];
                    });
                    return filteredRow;
                  });

                  exportToExcel(
                    filteredHeaders,
                    filteredData,
                    `${filename}`,
                    titleInfo
                  );
                  setShowMenu(false);
                }}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src={xlsIcon}
                  alt=""
                  style={{
                    width: "20px",
                    height: "20px",
                    paddingRight: "10px",
                  }}
                />
                Exportar a Excel
              </div>

              <div
                onClick={() => {
                  const filteredHeaders = headers.filter((h) =>
                    selectedHeaders.includes(h.key)
                  );

                  const filteredData = data.map((row) => {
                    const filteredRow: Record<string, unknown> = {};
                    selectedHeaders.forEach((key) => {
                      filteredRow[key] = row[key];
                    });
                    return filteredRow;
                  });

                  exportToPDF(
                    filteredHeaders,
                    filteredData,
                    `${filename}`,
                    titleInfo
                  );
                  setShowMenu(false);
                }}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                <img
                  src={pdfIcon}
                  alt=""
                  style={{
                    width: "20px",
                    height: "20px",
                    paddingRight: "10px",
                  }}
                />
                Exportar a PDF
              </div>
            </div>
          )}

          {/* Submenú mostrar */}
          {submenu === "mostrar" && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "100%",
                transform: "translateY(-50%)",
                marginRight: "8px",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                minWidth: "180px",
                zIndex: 1001,
              }}
            >
              <label style={{ fontWeight: "bold" }}>
                <input
                  type="checkbox"
                  checked={selectedHeaders.length === headers.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedHeaders(headers.map((h) => h.key));
                    } else {
                      setSelectedHeaders([]);
                    }
                  }}
                  style={{ marginRight: "8px" }}
                />
                Todas las columnas
              </label>
              {headers.map((header) => (
                <label key={header.key}>
                  <input
                    type="checkbox"
                    checked={selectedHeaders.includes(header.key)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedHeaders((prev) =>
                        checked
                          ? [...prev, header.key]
                          : prev.filter((key) => key !== header.key)
                      );
                    }}
                    style={{ marginRight: "8px" }}
                  />
                  {header.header}
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
