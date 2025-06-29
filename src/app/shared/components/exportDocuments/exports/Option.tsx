import { useState, useEffect, useRef } from "react";
import { exportToExcel } from "./exportToExcel";
import { exportToPDF } from "./exportToPdf";
import "./Option.css";
import { ShowChartSide } from "../charts/ShowChartSide";

export type HeaderItem = {
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
  const [showChartMenu, setShowChartMenu] = useState(false);
  const [submenu, setSubmenu] = useState<"exportar" | "mostrar" | null>(null);
  const [selectedHeaders, setSelectedHeaders] = useState<string[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && headers.length > 0) {
      setSelectedHeaders(headers.map((h) => h.key));
      initialized.current = true;
    }
  }, [headers]);

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

  // Comunicar cambios de columnas visibles
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
          setShowChartMenu((prev) => !prev);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          style={{ width: 45, height: 45, fill: "#6e8192" }}
        >
          <path d="M148.483 95.598h-42.2c-1.1 0-1.6-.8-1.6-1.9v-40.4c0-1.1.7-2 1.8-2 27.7 0 44.101 15.8 44.101 42.3-.001 1.1-1.001 2-2.101 2zm-39.801-4h37.7c-.7-22-14.7-35.6-37.7-36.3v36.3z" />
          <path d="M94.382 148.098c-24.8 0-44.3-19.2-44.3-43.7 0-26.9 18.6-45 46.3-45 1.1 0 2 .9 2 2v30.6c0 .5-.2 1.1-.6 1.4-.4.4-.9.6-1.5.5h-.5c-5.1 0-9.1 4.1-9.1 9 0 5 4.1 9.1 9.1 9.1s9.1-4.1 9.1-9.1c0-.3 0-.6-.1-.8-.1-.6.1-1.2.5-1.7.4-.4.9-.8 1.5-.8h30c1.1 0 2 .9 2 2-.099 27.9-17.9 46.5-44.4 46.5zm0-84.6c-24.2.8-40.3 17.1-40.3 40.9 0 22.6 17.3 39.6 40.3 39.6 23.8 0 39.5-15.8 40.3-40.3h-25.9c-.4 6.9-6.1 12.3-13 12.3-7.2 0-13.1-5.9-13.1-13.1 0-6.8 5.1-12.3 11.7-13v-26.4z" />
        </svg>
      </button>
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
      {showChartMenu && <ShowChartSide setShowChartMenu={setShowChartMenu} showChartMenu={showChartMenu} headers={headers}
      data={data}
      />}
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
                <img src={"./logo.svg"} alt="" />
                Exportar a Excel
              </div>
              <div
                className="sub-menu-content"
                onClick={() => handleExport("pdf")}
              >
                <img src={"./logo.svg"} alt="" />
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
