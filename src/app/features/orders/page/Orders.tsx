import { useState, useEffect } from "react";
import Layout from "../../../shared/components/layout/layout";
import { Table } from "../../../shared/components/layout/Table/Table";
import InventoryActions from "../../../shared/components/forms/actions/Actions";
import { ordersData } from "../data/ordersData";
import { headers } from "../headers/headers";
import { useNavigate } from "react-router-dom";
import "../styles/orders.css";
/* import { useParams } from "react-router-dom"; */

const Orders = () => {
  /* const { id } = useParams(); */

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [orders, setOrders] = useState(ordersData); // estado editable

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState("pendiente");

  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const nuevosPedidos = localStorage.getItem("nuevosPedidos");

    if (nuevosPedidos) {
      const { subpedidos, fechaProgramada, estado } = JSON.parse(nuevosPedidos);

      const pedidoId = subpedidos[0]?.pedidoId;
      if (!pedidoId) return;

      const total = subpedidos.reduce(
        (acc: number, s: { subtotal: number }) => acc + (s.subtotal || 0),
        0
      );

      const nuevoPedido = {
        id: pedidoId,
        nombre: `Pedido #${pedidoId}`,
        total,
        fechaProgramada: fechaProgramada || "Sin fecha",
        estado: estado || "Pendiente",
      };

      setOrders((prev) => {
        const yaExiste = prev.some((p) => p.id === pedidoId);

        if (yaExiste) {
          // Si el pedido ya existe, lo actualizamos
          setMensaje("Pedido actualizado");
          setTimeout(() => setMensaje(""), 3000); // desaparece en 3 segundos
          return prev.map((p) =>
            p.id === pedidoId ? { ...p, total, fechaProgramada, estado } : p
          );
        } else {
          // Si no existe, lo agregamos como nuevo
          setMensaje("Nuevo pedido creado");
          setTimeout(() => setMensaje(""), 3000); // desaparece en 3 segundos
          return [...prev, nuevoPedido];
        }
      });

      localStorage.removeItem("nuevosPedidos");
    }
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/subpedidos/${id}`);
  };

  const handleDelete = (id: number) => {
    // Aquí puedes mostrar confirmación y luego eliminar el pedido
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este pedido?"
    );
    if (confirmDelete) {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      console.log("Pedido eliminado con éxito. ID:", id);
    }
  };

  const handleMarkAsReady = (id: number) => {
    setSelectedOrderId(id);
    const currentOrder = orders.find((order) => order.id === id);
    if (currentOrder) setNewStatus(currentOrder.estado);
    setIsModalOpen(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredData = orders
    .filter((order) => {
      const search = searchTerm.toLowerCase();
      return (
        order.nombre.toLowerCase().includes(search) ||
        order.fechaProgramada.toLowerCase().includes(search) ||
        order.estado.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.nombre.localeCompare(b.nombre);
      if (sortOrder === "Z-A") return b.nombre.localeCompare(a.nombre);
      return 0;
    });

  const confirmStatusChange = () => {
    if (selectedOrderId !== null) {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          const actualizado =
            order.id === selectedOrderId
              ? { ...order, estado: newStatus }
              : order;

          // Solo si el nuevo estado es Completado, agregamos al inventario
          if (order.id === selectedOrderId && newStatus === "Completado") {
            agregarAlInventarioDesdeSubpedidos(selectedOrderId);
          }

          return actualizado;
        })
      );
    }
    setIsModalOpen(false);
    setSelectedOrderId(null);
  };

  return (
    <Layout title="Listado de Pedidos">
      <div className="Table">
        <InventoryActions
          linkButton={{
            ButtonLabel: "Registrar nuevo",
            type: "link",
            to: `subpedido`,
          }}
          sortOrder={sortOrder}
          searchTerm={searchTerm}
          handleSort={handleSort}
          handleSearch={handleSearch}
        />
        {mensaje && <div className="mensaje-exito">{mensaje}</div>}
        <Table
          columns={headers}
          data={filteredData}
          itemsPerPage={15}
          linkColumn={{
            label: "acciones",
            idKey: "id",
            path: "/subpedidos",
            type: "buttons",
            onEdit: handleEdit,
            onDelete: handleDelete,
            onMarkAsReady: handleMarkAsReady,
          }}
        />

        {/* modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="modal-title">Cambiar estado del pedido</h2>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="modal-select"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Completado">Completado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
              <div className="modal-actions">
                <button className="btn-confirm" onClick={confirmStatusChange}>
                  Confirmar
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;

const agregarAlInventarioDesdeSubpedidos = (pedidoId: number) => {
  const pedidosGuardados = localStorage.getItem("nuevosPedidos");
  if (!pedidosGuardados) return;

  const { subpedidos } = JSON.parse(pedidosGuardados);

  const subpedidosDelPedido = subpedidos.filter(
    (s: any) => s.pedidoId === pedidoId
  );

  const inventario = JSON.parse(localStorage.getItem("inventario") || "[]");

  const nuevoInventario = [...inventario, ...subpedidosDelPedido];

  localStorage.setItem("inventario", JSON.stringify(nuevoInventario));

  console.log(` Subpedidos del pedido #${pedidoId} agregados al inventario.`);

  alert("Pedido agregado al inventario");
};
