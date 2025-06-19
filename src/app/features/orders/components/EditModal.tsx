// EditModal.tsx
import { useState } from "react";
import "../components/EditModal.css"

type Order = {
  id: number;
  nombre: string;
  estado: string;
  // otros campos si tienes
};

type EditModalProps = {
  orderId: number;
  orderData: Order[];
  onClose: () => void;
  onSave: (updatedOrder: Order) => void;
};

const EditModal = ({ orderId, orderData, onClose, onSave }: EditModalProps) => {
  const order = orderData.find((o) => o.id === orderId);
  const [nombre, setNombre] = useState(order?.nombre || "");
  const [estado, setEstado] = useState(order?.estado || "");

  if (!order) return null;

  const handleSave = () => {
    onSave({ ...order, nombre, estado });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Editar Pedido</h2>
        <label>
          Nombre:
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
          />
        </label>
        <label>
          Estado:
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="Pendiente">Pendiente</option>
            <option value="Listo">Listo</option>
            <option value="En Proceso">En Proceso</option>
          </select>
        </label>

        <button onClick={handleSave}>Guardar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditModal;
