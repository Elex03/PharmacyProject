import { useState } from "react";
import { exportToExcel } from "./exportToExcel";
import { exportToPDF } from "./exportToPdf";
import pdfIcon from "../../assets/img/pdf-icon.svg";
import xlsIcon from "../../assets/img/xls-icon.svg";
type HeaderItem = {
  key: string;
  header: string;
};

type ExportOptionProps = {
  filename?: string;
  headers: HeaderItem[];
  data: Record<string, unknown>[];
  titleInfo?: string[][];
};

export const ExportOption: React.FC<ExportOptionProps> = ({
  headers,
  data,
  filename = "Exportacion",
  titleInfo = [],
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <button
        className="export-button"
        onClick={() => setShowMenu((prev) => !prev)}
        style={{ background: "transparent", border: "none", cursor: "pointer" }}
      >
        {/* Icono de menú hamburguesa */}
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
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", 
          padding: "4px",
          gap: "8px",
        }}
        >
          <div
            onClick={() => {
              exportToExcel(headers, data, `${filename}`, titleInfo);
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
              style={{ width: "20px", height: "20px", paddingRight: "10px"}}
            />
            Exportar a Excel
          </div>
          <div
            onClick={() => {
              exportToPDF(headers, data, `${filename}`, titleInfo);
              setShowMenu(false);
            }}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <img src={pdfIcon} 
            alt=""
            style={{ width: "20px", height: "20px", paddingRight: "10px" }} />
            Exportar a PDF
          </div>
        </div>
      )}
    </>
  );
};
