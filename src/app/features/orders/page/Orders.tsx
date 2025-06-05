import { useState } from "react";
import Layout from "../../../shared/components/layout/layout";
import { Table } from "../../../shared/components/layout/Table/Table";
import InventoryActions from "../../../shared/components/forms/actions/Actions";
import { ordersData } from "../data/ordersData";
import { headers } from "../headers/headers";
import "../styles/orders.css";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };
    
  const filteredData = ordersData
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
            label: "✏️",
            idKey: "id",
            path: "/subpedidos",
            type: "linked",
          }}
        />
      </div>      
    </Layout>
  );
};


export default Orders;