import { useState } from "react";
import "../layout/Table.css";
import salesData from "../../data/salesDetails.json";
import FacturaModal from "../layout/factura";

interface SalesHistoItem {
  id: number;
  nombre: string;
  fechacompra: string;
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
  montoPagado?: number;
}

const SalesHistoTable = ({ data }: { data: SalesHistoItem[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [selectedSale, setSelectedSale] = useState<SalesHistoItem | null>(null);
  const [saleDetails, setSaleDetails] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [montoPagado, setMontoPagado] = useState<number | null>(null);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleShowDetails = (item: SalesHistoItem) => {
    setSelectedSale(item);
    const details = salesData.find(
      (sale: SaleDetail) => sale.saleId === item.id
    );
    setSaleDetails(details ? details.productos : []);
    setMontoPagado(details?.montoPagado ?? null);
    setIsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedSale(null);
    setSaleDetails([]);
    setIsModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="inventory-container">
      <table className="inventory-table">
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
                <td>{item.nombre}</td>
                <td>{item.fechacompra}</td>
                <td>C${item.total.toFixed(2)}</td>
                <td>
                  <a
                    className="action-link"
                    href="#"
                    onClick={() => handleShowDetails(item)}
                  >
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

      {isModalOpen && selectedSale && (
        <FacturaModal
          selectedSale={selectedSale}
          saleDetails={saleDetails}
          montoPagado={montoPagado}
          onClose={handleCloseDetails}
          onPrint={handlePrint}
        />
      )}
    </div>
  );
};

export default SalesHistoTable;