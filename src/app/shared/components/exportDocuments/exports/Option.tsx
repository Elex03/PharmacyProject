import { useState, useEffect, useRef } from "react";
import { exportToExcel } from "./exportToExcel";
import { exportToPDF } from "./exportToPdf";
import pdfIcon from "../../../assets/img/pdf-icon.svg";
import xlsIcon from "../../../assets/img/xls-icon.svg";
import "./Option.css";

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

  const handleExport = (type: "excel" | "pdf") => {
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

    if (type === "excel") {
      exportToExcel(filteredHeaders, filteredData, filename, titleInfo);
    } else {
      exportToPDF(filteredHeaders, filteredData, filename, titleInfo);
    }

    setShowMenu(false);
  };

  useEffect(() => {
    if (onColumnChange) {
      onColumnChange(selectedHeaders);
    }
  }, [selectedHeaders, onColumnChange]);

  //ocultar menu, al tocar fuera de el pao pao pao
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
        setSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        className="export-button"
        onClick={() => {
          setShowMenu((prev) => !prev);
          setSubmenu(null);
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
        <div className="container-menu" ref={menuRef}>
          <div
            className="sub-menu-content"
            onMouseEnter={() => setSubmenu("mostrar")}
            onClick={() => setSubmenu("mostrar")}
          >
            Mostrar
          </div>
          <div
            className="sub-menu-content"
            onMouseEnter={() => setSubmenu("exportar")}
            onClick={() => setSubmenu("exportar")}
          >
            Exportar
          </div>

          {/* Submenú exportar */}
          {submenu === "exportar" && (
            <div className="sub-menu">
              <div
                className="sub-menu-content"
                onClick={() => handleExport("excel")}
              >
                <img src={xlsIcon} alt="" />
                Exportar a Excel
              </div>
              <div
                className="sub-menu-content"
                onClick={() => handleExport("pdf")}
              >
                <img src={pdfIcon} alt="" />
                Exportar a PDF
              </div>
            </div>
          )}

          {/* Submenú mostrar */}
          {submenu === "mostrar" && (
            <div className="sub-menu">
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
