import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import React from "react";

type HeaderItem = {
  key: string;
  header: string;
};

type ExportOptionProps = {
  filename?: string;
  headers: HeaderItem[];
  data: Record<string, unknown>[]; // arreglo de objetos
  titleInfo?: string[][];
};

const exportToExcel = async (
  headers: HeaderItem[],
  data: Record<string, unknown>[],
  filename: string = "Exportacion.xlsx",
  titleInfo: string[][] = []
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Datos");

  // Agregar cabecera (opcional)
  titleInfo.forEach((row, index) => {
    const rowData = worksheet.addRow(row);
    rowData.font = { bold: true, size: 14 };
    rowData.alignment = { horizontal: "center", vertical: "middle" };
    worksheet.mergeCells(`A${index + 1}:E${index + 1}`);
  });

  // Encabezados visibles
  const headerLabels = headers.map((h) => h.header);
  const headerRow = worksheet.addRow(headerLabels);

  headerRow.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "000000" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "ADD8E6" },
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
  });

  // Filas de datos
  data.forEach((item) => {
    const rowValues = headers.map((h) => item[h.key]);
    const row = worksheet.addRow(rowValues);
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
    });
  });

  worksheet.columns.forEach((col) => {
    col.width = 20;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, filename);
};

export const ExportOption: React.FC<ExportOptionProps> = ({
  headers,
  data,
  filename = "Exportacion.xlsx",
  titleInfo = [],
}) => {
  return (
    <button className="export-button" onClick={() => exportToExcel(headers, data, filename, titleInfo)}>
    {/* SVG de Menú Hamburguesa */}
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
  );
};
