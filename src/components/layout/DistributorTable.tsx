import { useState } from "react";
import { Link } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import "./Table.css";

interface DistributorItem {
  id: number;
  nombre: string;
  empresa: string;
  telefono: string;
  ultimoPedido: string;
}

const DistributorsTable = ({ data }: { data: DistributorItem[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

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

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Distribuidores");

    const companyInfo = [
      ["Farmacia Farmavalue"],
      ["Cuidamos de ti, cada día."],
      ["De la farmacia San Benito 10 crs al sur 1/2 al oeste"],
      ["Tel: 2255-4524"],
      [""],
    ];

    companyInfo.forEach((row, index) => {
      const rowData = worksheet.addRow(row);
      rowData.font = { bold: true, size: 14 };
      rowData.alignment = { horizontal: "center", vertical: "middle" };
      worksheet.mergeCells(`A${index + 1}:E${index + 1}`);
    });

    const headers = [
      "ID",
      "Distribuidor",
      "Empresa",
      "Teléfono",
      "Último Pedido",
    ];
    const headerRow = worksheet.addRow(headers);

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

    data.forEach(({ id, nombre, empresa, telefono, ultimoPedido }) => {
      const row = worksheet.addRow([
        id,
        nombre,
        empresa,
        telefono,
        ultimoPedido,
      ]);

      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
      });
    });

    worksheet.columns = [
      { width: 5 }, // ID
      { width: 20 }, // Distribuidor
      { width: 20 }, // Empresa
      { width: 15 }, // Teléfono
      { width: 18 }, // Último Pedido
    ];

    // Guardar el archivo
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Distribuidores.xlsx");
  };

  return (
    <div className="inventory-container">
      <button className="export-button" onClick={exportToExcel}>
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
      <table className="inventory-table-I">
        <thead>
          <tr>
            <th>Nombre del distribuidor</th>
            <th>Empresa</th>
            <th>Teléfono</th>
            <th>Último pedido realizado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <tr key={item.id} className="elements">
                <td>{truncateText(item.nombre, 30)}</td>
                <td>{truncateText(item.empresa, 30)}</td>
                <td>{item.telefono}</td>
                <td>{item.ultimoPedido}</td>
                <td>
                  <Link to={`/historial/${item.id}`} className="action-link">
                    Ver historial
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", color: "gray" }}>
                No se encontraron resultados
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
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
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export default DistributorsTable;
