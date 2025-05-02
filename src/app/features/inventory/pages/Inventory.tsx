import { useState } from "react";
import "../../../shared/components/layout/Table/Table.css";
import { Table } from "../../../shared/components/layout/Table/Table.tsx";
import InventoryActions from "../../../shared/components/forms/actions/Actions.tsx";
import Layout from "../../../shared/components/layout/layout.tsx";
import { getFilteredInventory } from "../utils/filterInventoryData.ts";
import { useFetchInventory } from "../hooks/useFetchInventory.tsx";
import { ToggleSection } from "../../../shared/components/exportDocuments/TongleSelection.tsx";
import PieAnimation from "../../../shared/components/charts/piChart.tsx";



const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const { inventoryData, headers } = useFetchInventory();
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleStockFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStockFilter(e.target.value);
  };

  const filteredData = getFilteredInventory(
    inventoryData,
    searchTerm,
    stockFilter,
    sortOrder
  );

  return (
    <Layout title="Inventario">
       <ToggleSection
        title="información"
        onToggle={(visible) => setItemsPerPage(visible ? 5 : 10)}
      >
        <p style={{ fontSize: "0.8rem", marginLeft: 30 }}>
          Aquí puedes gestionar el inventario de productos farmacéuticos.
          <br />
          Puedes registrar nuevos productos, actualizar la información de los
          existentes y realizar un seguimiento del stock disponible.
        </p>

        <div style={{ marginRight: 20 }} className="chart-container">
          <PieAnimation/>
        </div>
      </ToggleSection>
      <InventoryActions
        inputLabel="+ Agregar medicamento"
        sortOrder={sortOrder}
        stockFilter={stockFilter}
        searchTerm={searchTerm}
        handleSort={handleSort}
        handleStockFilter={handleStockFilter}
        handleSearch={handleSearch}
      />
      <Table
        columns={headers}
        data={filteredData}
        itemsPerPage={itemsPerPage}
        linkColumn={{
          label: "✏️ Editar",
          path: "/producto",
          idKey: "id",
          type: "modal",
        }}
      />
    </Layout>
  );
};

export default Inventario;
