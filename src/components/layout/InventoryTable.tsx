import { JSX, useState } from "react";
import "./Table.css";

interface InventoryItem {
  id: number;
  descripcion: string;
  stock: string | JSX.Element;
  inventario: string | number;
  distribuidor: string;
  vencimiento: string;
  nombreComercial: string;
  nombreGenerico: string;
  formaFarmaceutica: string;
  concentracion: string;
  presentacion: string;
  laboratorio: string;
  precioCompra: number;
  precioVenta: number;
  margenUtilidad: number;
}

const InventoryTable = ({ data }: { data: InventoryItem[] }) => {
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

  return (
    <div className="inventory-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Forma Farmacéutica</th>
            <th>Presentación</th>
            <th>Laboratorio</th>
            <th>Estado de stock</th>
            <th>En inventario</th>
            <th>Fecha de vencimiento</th>
            <th>Precio Compra</th>
            <th>Precio Venta</th>
            <th>Margen de Utilidad</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <tr key={item.id} className="elements">
                <td>{truncateText(item.descripcion, 20)}</td>{" "}
                {/* Truncar si es largo */}
                <td>{item.formaFarmaceutica}</td>
                <td>{item.presentacion}</td>
                <td>{item.laboratorio}</td>
                <td>{item.stock}</td>
                <td>{item.inventario}</td>
                <td>{item.vencimiento}</td>
                <td>{item.precioCompra}</td>
                <td>{item.precioVenta}</td>
                <td>{item.margenUtilidad}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={14} style={{ textAlign: "center", color: "gray" }}>
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

export default InventoryTable;
