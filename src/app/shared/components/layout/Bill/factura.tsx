import React from "react";

import CircularIndeterminate from "../../progress/CircularIndeterminate";
import { useFetchBill } from "../../../../features/salesHistory/hooks/useFechBill";


import logo from "../../../assets/img/logo1.png";
import "./factura.css";

interface propsBill {
  selectedSaleId: number;
  onClose: () => void;
}

const FacturaModal: React.FC<propsBill> = ({ selectedSaleId, onClose }) => {
  const {billData, billDetails, loading} = useFetchBill(selectedSaleId.toString());

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <CircularIndeterminate />
      </div>
    );
  }
  const subtotalVenta = billDetails.reduce(
    (acc, producto) => acc + (producto.total ?? 0),
    0
  );
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
            <p>
              <strong>RUC:</strong> 001-010101-000A
            </p>
            <p>
              <strong>Dirección:</strong> Calle Central No. 123, Managua
            </p>
            <p>
              <strong>Teléfono:</strong> 2250-0000
            </p>
          </div>

          <hr />

          <div className="receipt-header">
            <p>
              <strong>No. Factura:</strong> {billData?.id ?? "N/A"}
            </p>
            <p>
              <strong>Fecha de emisión:</strong>{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="Info-Client">
            <p>
              <strong>Cliente:</strong> {billData?.nombre ?? "N/A"}
            </p>
            <p>
              <strong>Fecha de compra:</strong> {billData?.fechacompra ?? "N/A"}
            </p>
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
              {billDetails.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.nombre}</td>
                  <td>C${producto.precio.toFixed(2)}</td>
                  <td>{producto.cantidad}</td>
                  <td>C${(producto.total ?? 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="summary">
            <p>
              <strong>- Subtotal:</strong> C${subtotalVenta.toFixed(2)}
            </p>
            <p>
              <strong>- IVA (15%):</strong> C${iva.toFixed(2)}
            </p>
            <p className="total-pagar">
              <strong>- Total a pagar:</strong>
              <span className="resaltado-total">
                {" "}
                C${totalVenta.toFixed(2)}
              </span>
            </p>
            <p>
              <strong>- Monto pagado:</strong> C$
              {billData?.montoPagado.toFixed(2)}
            </p>
            <p>
              <strong>- Total a regresar:</strong> C$
              {(billData ? billData.montoPagado - totalVenta : 0).toFixed(2)}
            </p>

            <div className="inter">
              <p>
                <strong>- Forma de pago:</strong> Efectivo
              </p>
            </div>
          </div>

          <hr />

          <p className="Nota">
            Precaución: Si el medicamento presenta daños o vencimiento, no lo
            consuma y repórtelo a la farmacia. No se aceptan devoluciones salvo
            indicación del MINSA.
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
