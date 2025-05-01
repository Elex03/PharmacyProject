import React, { useEffect, useState } from "react";
import logo from "../../assets/img/logo1.png";
import "../layout/factura.css";
import CircularIndeterminate from "../progress/CircularIndeterminate";
import { message } from "antd";
import { getBillData } from "../../api/services/Sales";

interface Product {
  nombre: string;
  precio: number;
  cantidad: number;
  total: number;
}

interface ProductoItem {
  nombre: string;
  precio: number;
  cantidad: number;
}

interface SalesHistoItem {
  id: number;
  nombre: string;
  fechacompra: string;
  total: number;
}

interface propsBill {
  selectedSaleId: number
  onClose: () => void;
}
const FacturaModal: React.FC<propsBill> = ({
  selectedSaleId,
  onClose
}) => {
  const [saleData, setSaleData] = useState<SalesHistoItem | null>(null);
  const [saleDetails, setSaleDetails] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    getBillData(selectedSaleId)
      .then((data) => {
        setSaleData({
          id: data.id,
          nombre: data.cliente,
          fechacompra: data.fecha,
          total: data.total,
        });

        console.log(data);

        const detallesConvertidos = data.productos.map((item: ProductoItem) => ({
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
          total: item.precio * item.cantidad,
        }));

        setSaleDetails(detallesConvertidos);
      })
      .catch(() => {
        message.error("No se ha encontrado la factura");
      })
      .finally(() => {
        setIsLoading(false);
      });
   

  }, [selectedSaleId]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <CircularIndeterminate />
      </div>
    );
  }
  

  const subtotalVenta = saleDetails.reduce((acc, producto) => acc + producto.total, 0);
  const iva = subtotalVenta * 0.15;
  const totalVenta = subtotalVenta + iva;

  return (
    <div className="modal-overlay">
      <div className="receipt-popup">
        <div className="receipt-content">
          <div className="receipt-header-logo">
            <img src={logo} alt="Logo de FarmaNova" className="receipt-logo" />
            <h2 className="receipt-title">FarmaNova</h2>
          </div>

          <div className="datos-empresa">
            <p><strong>RUC:</strong> 001-010101-000A</p>
            <p><strong>Dirección:</strong> Calle Central No. 123, Managua</p>
            <p><strong>Teléfono:</strong> 2250-0000</p>
          </div>

          <hr />

          <div className="receipt-header">
            <p><strong>No. Factura:</strong> {saleData?.id ?? "N/A"}</p>
            <p><strong>Fecha de emisión:</strong> {new Date().toLocaleDateString()}</p>
          </div>

          <div className="Info-Client">
            <p><strong>Cliente:</strong> {saleData?.nombre ?? "N/A"}</p>
            <p><strong>Fecha de compra:</strong> {saleData?.fechacompra ?? "N/A"}</p>
          </div>

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
            <p><strong>- Subtotal:</strong> C${subtotalVenta.toFixed(2)}</p>
            <p><strong>- IVA (15%):</strong> C${iva.toFixed(2)}</p>
            <p><strong>- Total a pagar:</strong> C${totalVenta.toFixed(2)}</p>

            <div className="inter">
              <p><strong>- Forma de pago:</strong> Efectivo</p>
            </div>
          </div>

          <hr />

          <p className="Nota">
            Precaución: Si el medicamento presenta daños o vencimiento, no lo consuma y repórtelo a la farmacia. No se aceptan devoluciones salvo indicación del MINSA.
          </p>

          <hr />

          <div className="thank-you">
            <p>¡Gracias por su compra!</p>
            <p>Comprometidos con su salud, hoy y siempre.</p>
          </div>

          <button className="print-button" onClick={() => window.print()}>
            Imprimir Factura
          </button>
          <button className="close-button" onClick={() => onClose()}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacturaModal;
