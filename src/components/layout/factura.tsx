import logo from "../../assets/img/logo1.png";
import "../layout/factura.css";

interface Product {
  nombre: string;
  precio: number;
  cantidad: number;
  total: number;
}

interface SalesHistoItem {
  id: number;
  nombre: string;
  fechacompra: string;
  total: number;
}

interface FacturaModalProps {
  selectedSale: SalesHistoItem;
  saleDetails: Product[];
  montoPagado: number | null;
  onClose: () => void;
  onPrint: () => void;
}

const FacturaModal = ({
  selectedSale,
  saleDetails,
  montoPagado,
  onClose,
  onPrint,
}: FacturaModalProps) => {
  const subtotalVenta = saleDetails.reduce(
    (acc, producto) => acc + producto.total,
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
              <strong>No. Factura:</strong> {selectedSale.id}
            </p>
            <p>
              <strong>Fecha de emisión:</strong>{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="Info-Client">
            <p>
              <strong>Cliente:</strong> {selectedSale.nombre}
            </p>
            <p>
              <strong>Fecha de compra:</strong> {selectedSale.fechacompra}
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
              <strong>- Subtotal:</strong> C${subtotalVenta.toFixed(2)}
            </p>
            <p>
              <strong>- IVA (15%):</strong> C${iva.toFixed(2)}
            </p>
            <p>
              <strong>- Total a pagar:</strong> C${totalVenta.toFixed(2)}
            </p>

            <div className="inter">
              {montoPagado !== null && (
                <>
                  <p>
                    <strong>- Monto pagado:</strong> C${montoPagado.toFixed(2)}
                  </p>
                  <p>
                    <strong>- Cambio:</strong> C$
                    {(montoPagado - totalVenta).toFixed(2)}
                  </p>
                </>
              )}
              <p>
                <strong>- Forma de pago:</strong> Efectivo
              </p>
            </div>
          </div>

          <hr />
          {/* <p>________________________</p>
          <p>Firma y sello</p> */}
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

          <button className="print-button" onClick={onPrint}>
            Imprimir Factura
          </button>
          <button className="close-button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacturaModal;
