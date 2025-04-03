import { useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
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
  const exportToExcel = () => {
    // Información de la empresa (será centrada)
    const companyInfo = [
      ["Farmacia Farmavalue"], 
      ["Cuidamos de ti, cada día."],
      ["De la farmacia San Benito 10 crs al sur 1/2 al oeste"], 
      ["Tel: 2255-4524"], 
      [""], // Espacio antes de la tabla
    ];
  
    // Encabezados de la tabla
    const headers = [["ID", "Distribuidor", "Empresa", "Teléfono", "Último Pedido"]];
  
    // Datos de la tabla
    const formattedData = data.map(({ id, nombre, empresa, telefono, ultimoPedido }) => [
      id, nombre, empresa, telefono, ultimoPedido
    ]);
  
    // Crear hoja de Excel con encabezados y datos
    const worksheet = XLSX.utils.aoa_to_sheet([...companyInfo, ...headers, ...formattedData]);
  
    // Ajustar el ancho de las columnas para mejor visualización
    worksheet["!cols"] = [
      { wch: 5 },  // ID
      { wch: 20 }, // Distribuidor
      { wch: 20 }, // Empresa
      { wch: 15 }, // Teléfono
      { wch: 18 }, // Último Pedido
    ];
  
    // Unir celdas para centrar la información de la empresa
    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }, // Farmacia Farmavalue
      { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } }, // Cuidamos de ti, cada día.
      { s: { r: 2, c: 0 }, e: { r: 2, c: 4 } }, // Dirección
      { s: { r: 3, c: 0 }, e: { r: 3, c: 4 } }, // Teléfono
    ];
  
    // Aplicar estilos
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "");
  
    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cell_address = XLSX.utils.encode_cell({ r: row, c: col });
  
        if (!worksheet[cell_address]) continue;
  
        // Estilo para la información de la empresa
        if (row < 4) {
          worksheet[cell_address].s = {
            alignment: { horizontal: "center", vertical: "center" },
            font: { bold: true, sz: 14 },
          };
        }
  
        // Estilo para los encabezados de la tabla
        if (row === 5) {
          worksheet[cell_address].s = {
            font: { bold: true, color: { rgb: "000000" } }, // Texto negro
            fill: { fgColor: { rgb: "ADD8E6" } }, // Fondo celeste
            alignment: { horizontal: "center", vertical: "center" },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          };
        }
  
        // Bordes para todas las celdas de la tabla
        if (row > 4) {
          worksheet[cell_address].s = {
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          };
        }
      }
    }
  
    // Crear libro y añadir hoja
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Distribuidores");
  
    // Generar y descargar el archivo Excel
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "Distribuidores.xlsx");
  };
  return (
    <div className="inventory-container">
      <button className="export-button" onClick={exportToExcel}>
        Exportar a Excel
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
                <td>{truncateText(item.nombre, 20)}</td>
                <td>{truncateText(item.empresa, 20)}</td>
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
