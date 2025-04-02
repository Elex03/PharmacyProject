import { useState } from "react";
import "./Table.css";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Importa los iconos
import orderData from "../../data/orderDetails.json";

interface OrderHistoryItem {
  id: number;
  nombre: string;
  empresa: string;
  fechaPedido: string;
  estado: string;
  total: number;
  fechaEntrega: string;
}

interface Product {
  nombre: string;
  precio: number;
  cantidad: number;
  total: number;
}

interface OrderDetail {
  orderId: number;
  productos: Product[];
}

const OrderHistoryTable = ({ data }: { data: OrderHistoryItem[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const [selectedOrder, setSelectedOrder] = useState<OrderHistoryItem | null>(null);
  const [orderDetails, setOrderDetails] = useState<Product[]>([]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleShowDetails = (item: OrderHistoryItem) => {
    setSelectedOrder(item);
    const details = orderData.find((order: OrderDetail) => order.orderId === item.id);
    setOrderDetails(details ? details.productos : []);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
    setOrderDetails([]);
  };

  const totalVenta = orderDetails.reduce((acc, producto) => acc + producto.total, 0);

  const determinarEstado = (pedido: OrderHistoryItem) => {
    if (pedido.fechaEntrega) {
      return "Realizado";
    }
    if (pedido.total === 0) {
      return "Cancelado";
    }
    return "Pendiente";
  };

  // Función para asignar iconos según el estado
  
  const getStatusIcon = (estado: string) => {
    if (estado === "Pendiente") return <FaClock style={{ color: "orange" }} />;
    if (estado === "Realizado") return <FaCheckCircle style={{ color: "green" }} />;
    if (estado === "Cancelado") return <FaTimesCircle style={{ color: "red" }} />;
    return null;
  };

  return (
    <div className="inventory-container">
      <table className="inventory-table-I">
        <thead>
          <tr>
            <th>Nombre del distribuidor</th>
            <th>Empresa</th>
            <th>Fecha del pedido</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Fecha de entrega</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.empresa}</td>
                <td>{item.fechaPedido}</td>
                {/* <td>{item.estado}</td> */}
                <td>
  {getStatusIcon(determinarEstado(item))} {determinarEstado(item)}
</td>

                <td>C${item.total.toFixed(2)}</td>
                <td>{item.fechaEntrega}</td>
                <td style={{textAlign: 'right'}}>
                  <a className="action-link" href="#" onClick={() => handleShowDetails(item)}>
                    Ver detalles
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", color: "gray" }}>
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
          <button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Siguiente →
        </button>
      </div>

      {/* Popup del recibo */}
      {selectedOrder && (
        <div className="receipt-popup">
          <h3>Recibo de Pedido</h3>
          <p><strong>Distribuidor:</strong> {selectedOrder.nombre}</p>
          <p><strong>Empresa:</strong> {selectedOrder.empresa}</p>
          
          <table className="details-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio Unitario</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((producto, index) => (
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
            <p><strong>Total de la Orden:</strong> C${totalVenta.toFixed(2)}</p>
          </div>

          <button className="bottom-out" onClick={handleCloseDetails}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryTable;
