import { useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "../../../shared/components/layout/Table/Table";
import { subordersData } from "../data/subordersData";
import { subordersHeaders } from "../headers/subordersheader";
import Layout from "../../../shared/components/layout/layout";
import InventoryActions from "../../../shared/components/forms/actions/Actions";
import "../styles/suborders.css";

const Suborders = () => {
  const { id } = useParams();
  

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredData = subordersData
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
              <label>
                Fecha:{" "}
                <input type="date" className="suborders-date-input" />
              </label>
              
            </div>
          </div>
        </div>

        <InventoryActions
          linkButton={{ ButtonLabel: "Agregar nuevo", type: "link", to: `subpedidos/${id}/compras` }}
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
            label: "",
            idKey: "id",
            path: "/compras",
            type: "modal",
          }}
        />        
      </div>      

    </Layout>
  );
};

export default Suborders;