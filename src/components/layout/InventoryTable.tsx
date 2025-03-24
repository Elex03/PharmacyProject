import { useState } from "react";
import "./InventoryTable.css";

interface InventoryItem {
  id: number;
  descripcion: string;
  stock: string;
  inventario: string;
  distribuidor: string;
  vencimiento: string;
}

const InventoryTable = ({ data }: { data: InventoryItem[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calcular el índice inicial y final de los elementos visibles en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="inventory-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Estado de stock</th>
            <th>Inventario</th>
            <th>Distribuidor</th>
            <th>Fecha de vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.descripcion}</td>
                <td>{item.stock}</td>
                <td>{item.inventario}</td>
                <td>{item.distribuidor}</td>
                <td>{item.vencimiento}</td>
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

export default InventoryTable;
