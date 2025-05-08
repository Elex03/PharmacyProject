import { useState } from "react";


import { Table } from "../../../shared/components/layout/Table/Table";
import { ResumeSaleLayout } from "../components/layout/ResumeSaleLayout";
import { useFetchInventory } from "../../inventory/hooks/useFetchInventory";

import InventoryActions from "../../../shared/components/forms/actions/Actions";
import Layout from "../../../shared/components/layout/layout";

import "../../../shared/styles/shared.css";
import "../css/makeSales.css";

const Distributors = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const {inventoryData, headers} = useFetchInventory();


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="container-makeSale">
      <div className="main-content">
        <Layout title="Realizar venta">
          <InventoryActions
            linkButton={{
              ButtonLabel: "Crear distribuidor",
              type: "modal",
            }}
            sortOrder={sortOrder}
            searchTerm={searchTerm}
            handleSort={handleSort}
            handleSearch={handleSearch}
          />

          <Table
            columns={headers}
            data={inventoryData}
            itemsPerPage={5}
            linkColumn={{
              label: "🔍 Ver detalles",
              path: "/historial",
              idKey: "id",
              type: "linked",
            }}
          />
        </Layout>
      </div>

      <div className="resumeSale">
        <ResumeSaleLayout/>
      </div>
    </div>
  );
};

export default Distributors;
