import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "../../../shared/components/layout/Table/Table";
/* import { subordersData } from "../data/subordersData"; */
import { subordersHeaders } from "../headers/subordersheader";
import Layout from "../../../shared/components/layout/layout";
import InventoryActions from "../../../shared/components/forms/actions/Actions";
import "../styles/subOrders.css";

interface Suborder {
  id: number;
  nombre: string;
  distribuidor: string;
  subtotal: string;
  telefono: string;
  [key: string]: unknown;
}

const Suborders = () => {
  const { id } = useParams(); // id del pedido general desde la URL

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  /* const [suborders, setSuborders] = useState<Suborder[]>(subordersData); */
  const [suborders, setSuborders] = useState<Suborder[]>([]);

  const handleEdit = (id: number) => {
    console.log("Editar subpedido con id:", id);
    // lógica de edición aquí
  };

  const handleDelete = (idToDelete: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este subpedido?"
    );
    if (confirmDelete) {
      setSuborders((prevOrders) =>
        prevOrders.filter((order) => order.id !== idToDelete)
      );
      console.log("Pedido eliminado con éxito. ID:", idToDelete);
    }
  };

  const handleMarkAsReady = (id: number) => {
    console.log("Marcar como Listo subpedido con id:", id);
    // lógica de estado aquí
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
        item.nombre.toLowerCase().includes(search) ||
        item.distribuidor.toLowerCase().includes(search) ||
        item.id.toString().includes(search)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "A-Z")
        return a.distribuidor.localeCompare(b.distribuidor);
      if (sortOrder === "Z-A")
        return b.distribuidor.localeCompare(a.distribuidor);
      return 0;
    });

  useEffect(() => {
    const nuevos = localStorage.getItem("nuevosPedidos");
    if (nuevos) {
      const pedidos = JSON.parse(nuevos);
      if (Array.isArray(pedidos.subpedidos)) {
        const nuevosSuborders: Suborder[] = pedidos.subpedidos.map(
          (p: any, i: number) => ({
            id: Date.now() + i,
            nombre: p.nombreMedicamento,
            distribuidor: p.nombreDistribuidor,
            subtotal: p.total.toString(),
            telefono: "N/A",
          })
        );

        setSuborders((prev) => [...prev, ...nuevosSuborders]);
      }
      localStorage.removeItem("nuevosPedidos");
    }
  }, []);

  return (
    <Layout title="Detalles Pedidos">
      <div className="suborders-container">
        <div className="suborders-header-block">
          <div className="suborders-header-row">
            <p className="suborders-header">Pedido número {id}</p>
            <div className="suborders-controls">
              <div className="suborders-date-group">
                <label htmlFor="fecha" className="suborders-date-label">
                  Fecha Programada
                </label>
                <input
                  type="date"
                  id="fecha"
                  className="suborders-date-input"
                />
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
            idKey: "id", // debe coincidir con el campo numérico en los datos
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
