import { useState } from "react";
import "../layout/Table.css";

interface SalesItem {
  id: number;
  cliente: string;
  fechaventa: string;
  total: number;
}
interface Product {
  nombre: string;
  precio: number;
  cantidad: number;
  total: number;
}

interface SaleDetail {
  saleId: number;
  productos: Product[];
}

const SalesHistoTable = ({ data }: { data: SalesItem[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [selectedSale, setSelectedSale] = useState<SalesItem | null>(null);
  const [saleDetails, setSaleDetails] = useState<Product[]>([]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  // Paginación
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Mostrar detalles de la venta seleccionada
  const handleShowDetails = (item: SalesItem) => {
    setSelectedSale(item);
    fetch(`http://localhost:3000/apiFarmaNova/orders/getSales/${item.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data: SaleDetail) => {
        setSaleDetails(data.productos);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la venta:", error);
      });
  };
  const handleCloseDetails = () => {
    setSelectedSale(null);
    setSaleDetails([]);
  };

  // Calcular totales
  const totalVenta = saleDetails.reduce((acc, producto) => acc + producto.total, 0);
  const totalGanancias = saleDetails.reduce((acc, producto) => acc + producto.total * 0.3, 0); // Ganancia del 30%

  return (
    <div className="inventory-container">
      <table className="inventory-table-H">
        <thead>
          <tr>
            <th>Nombre del cliente</th>
            <th>Fecha de la compra</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.cliente}</td>
                <td>{item.fechaventa}</td>
                <td>${item.total.toFixed(2)}</td>
                <td>
                  <a className="action-link" href="#" onClick={() => handleShowDetails(item)}>
                    Ver detalles
                  </a>
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

      {/* Popup del recibo */}
      {selectedSale && (
        <div className="receipt-popup">
          <h3>Recibo de compra</h3>
          <table className="details-table">
            <thead>
              <tr>
                <th>Nombre del producto</th>
                <th>Precio unitario</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {saleDetails.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.nombre}</td>
                  <td>C${producto.precio.toFixed(2)}</td>
                  <td>{producto.cantidad}</td>
                  <td>C${producto.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>          
          <div className="summary">
            <p>
              <strong>Total de ventas:</strong> C${totalVenta.toFixed(2)}
            </p>
            <p>
              <strong>Total de ganancias:</strong> C${totalGanancias.toFixed(2)}
            </p>
          </div>

          <button className="bottom-out" onClick={handleCloseDetails}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default SalesHistoTable;
