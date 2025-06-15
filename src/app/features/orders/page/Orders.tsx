import { useState } from "react";
import Layout from "../../../shared/components/layout/layout";
import { Table } from "../../../shared/components/layout/Table/Table";
import InventoryActions from "../../../shared/components/forms/actions/Actions";
import { ordersData } from "../data/ordersData";
import { headers } from "../headers/headers";
import EditModal from "../components/EditModal";
import "../styles/orders.css";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");  

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orders, setOrders] = useState(ordersData); // estado editable

  const openEditModal = (id: number) => {
    setSelectedOrderId(id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedOrderId(null);
    setIsEditModalOpen(false);
  };

  const handleEdit = (id: number) => {
    openEditModal(id);
  };

  const handleDelete = (id: number) => {
    console.log("Eliminar pedido con id:", id);
    // Aquí puedes mostrar confirmación y luego eliminar el pedido
  };

  const handleMarkAsReady = (id: number) => {
    console.log("Marcar como Listo pedido con id:", id);
    // Aquí actualizarías el estado del pedido para marcarlo como listo
  };

  const handleSaveEdit = (updatedOrder: typeof orders[0]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
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

  return (
    <Layout title="Lista de Pedidos">
      <div className="Table">
        <InventoryActions
          linkButton={{ ButtonLabel: "+ Registrar nuevo", type: "modal" }}
          sortOrder={sortOrder}
          searchTerm={searchTerm}
          handleSort={handleSort}
          handleSearch={handleSearch}
        />

        <Table
          columns={headers}
          data={filteredData}
          itemsPerPage={10}
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
      </div>

      {isEditModalOpen && selectedOrderId !== null && (
        <EditModal
          orderId={selectedOrderId}
          orderData={orders}
          onClose={closeEditModal}
          onSave={handleSaveEdit}
        />
      )}
    </Layout>
  );
};

export default Orders;
