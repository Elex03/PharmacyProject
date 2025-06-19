import { useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "../../../shared/components/layout/Table/Table";
import { subordersData } from "../data/subordersData";
import { subordersHeaders } from "../headers/subordersheader";
import Layout from "../../../shared/components/layout/layout";
import InventoryActions from "../../../shared/components/forms/actions/Actions";
import "../styles/subOrders.css";

const Suborders = () => {
  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [suborders, setSuborders] = useState(subordersData); // editable

  const handleEdit = (id: number) => {
    console.log("Editar subpedido con id:", id);
    // Aquí abrirías modal de edición si lo tienes
  };

  const handleDelete = (id: number) => {
    console.log("Eliminar subpedido con id:", id);
    setSuborders((prev) => prev.filter((item) => item.id !== id.toString()
));
  };

  const handleMarkAsReady = (id: number) => {
    console.log("Marcar como Listo subpedido con id:", id);
    // Aquí actualizarías estado de ese subpedido
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredData = suborders
    .filter((item) => {
      const search = searchTerm.toLowerCase();
      return (
        item.id.toLowerCase().includes(search) ||
        item.distribuidor.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.distribuidor.localeCompare(b.distribuidor);
      if (sortOrder === "Z-A") return b.distribuidor.localeCompare(a.distribuidor);
      return 0;
    });

  return (
    <Layout title="Detalles Pedidos">
      <div className="suborders-container">
        <div className="suborders-header-block">
          <div className="suborders-header-row">
            <p className="suborders-header">Pedido número {id}</p>
            <div className="suborders-controls">
              <div className="suborders-date-group">
                <label htmlFor="fecha" className="suborders-date-label">Fecha Programada</label>
                <input type="date" id="fecha" className="suborders-date-input" />
              </div>
            </div>
          </div>
        </div>

        <InventoryActions
          linkButton={{
            ButtonLabel: "Agregar nuevo",
            type: "link",
            to: `subpedidos/${id}/compras`,
          }}
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          handleSearch={handleSearch}
          handleSort={handleSort}
        />

        <Table
          columns={subordersHeaders}
          data={filteredData}
          itemsPerPage={5}
          linkColumn={{
            label: "Acciones",
            idKey: "id",
            path: "/compras",
            type: "buttons",
            onEdit: handleEdit,
            onDelete: handleDelete,
            onMarkAsReady: handleMarkAsReady,
          }}
        />
      </div>
    </Layout>
  );
};

export default Suborders;
