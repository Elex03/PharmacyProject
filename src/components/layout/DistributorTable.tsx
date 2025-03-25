import { useState } from "react";
import { Link } from "react-router-dom"; 
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

  return (
    <div className="inventory-container">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Nombre del distribuidor</th>
            <th>Empresa</th>
            <th>Teléfono</th>
            <th>Último pedido realizado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.empresa}</td>
                <td>{item.telefono}</td>
                <td>{item.ultimoPedido}</td>
                <td>
                  {/* Cambiar botones a enlaces */}
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
