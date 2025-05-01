import { useNavigate } from "react-router-dom";
import "./Sale.css";

const Sale = () => {
  const navigate = useNavigate();

  return (
    <div className="sale-page">
      <h2>Registrar Pedido</h2>
      <form className="sale-form">
        <label>
          Nombre del cliente:
          <input type="text" placeholder="Nombre" />
        </label>
        <label>
          Producto:
          <input type="text" placeholder="Medicamento" />
        </label>
        <label>
          Cantidad:
          <input type="number" placeholder="Cantidad" />
        </label>
        <button type="submit">Confirmar Pedido</button>
      </form>
      <button className="back-button" onClick={() => navigate("/")}>
        Volver al Inventario
      </button>
    </div>
  );
};

export default Sale;
