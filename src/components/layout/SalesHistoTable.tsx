import { useState } from "react";
import "../layout/Table.css";


interface SalesHistoItem {
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

const SalesHistoTable = ({ data }: { data: SalesHistoItem[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [selectedSale, setSelectedSale] = useState<SalesHistoItem | null>(null);
  const [saleDetails, setSaleDetails] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 

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
    fetch(`http://localhost:3000/apiFarmaNova/orders/getSales/${item.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data: SaleDetail) => {
        setSaleDetails(data.productos);
        setIsModalOpen(true); 
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la venta:", error);
      });
  };

  const handleCloseDetails = () => {
    setSelectedSale(null);
    setSaleDetails([]);
    setIsModalOpen(false); 
  };

  const handlePrint = () => {
    window.print();
  };

  const subtotalVenta = saleDetails.reduce((acc, producto) => acc + producto.total, 0);
  const iva = subtotalVenta * 0.15;
  const totalVenta = subtotalVenta + iva;

  return (
    <div className="inventory-container">
      <table className="inventory-table-I">
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
                <td>C${item.total.toFixed(2)}</td>
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
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Siguiente →
        </button>
      </div>
      
      {isModalOpen && selectedSale && (
        <div className="modal-overlay">
          <div className="receipt-popup">
            <div className="receipt-content">
              <h2 className="receipt-title">FarmaNova</h2>
              <p><strong>RUC:</strong> 001-010101-000A</p>
              <p><strong>Dirección:</strong> Calle Central No. 123, Managua</p>
              <p><strong>Teléfono:</strong> 2250-0000</p>
              <hr />

              <div className="receipt-header">
                <p><strong>Número de factura:</strong> {selectedSale.id}</p> 
                <p><strong>Fecha de emisión:</strong> {new Date().toLocaleDateString()}</p> 
              </div>

              <p><strong>Cliente:</strong> {selectedSale.cliente}</p>
              <p><strong>Fecha de compra:</strong> {selectedSale.fechaventa}</p>
              <hr />                              

              <table className="details-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
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
                <p><strong>Subtotal:</strong> C${subtotalVenta.toFixed(2)}</p>
                <p><strong>IVA (15%):</strong> C${iva.toFixed(2)}</p>
                <p><strong>Total a pagar:</strong> C${totalVenta.toFixed(2)}</p>
              </div>

              <p><strong>Forma de pago:</strong> Efectivo</p>
              <hr />
              <p>________________________</p>
              <p>Firma y sello</p>
              <p className="thank-you">¡Gracias por su compra!</p>

              <button className="print-button" onClick={handlePrint}>
                Imprimir Factura
              </button>
              <button className="close-button" onClick={handleCloseDetails}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesHistoTable;
