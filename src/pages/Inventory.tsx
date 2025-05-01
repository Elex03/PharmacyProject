import { useState } from "react";
import "../pages/Inventory.css";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

import "../components/layout/Table.css";
import { Table } from "../components/layout/Table/Table";
import "../css/index.css";
import InventoryActions from "../components/forms/actions/Actions.tsx";
import { useFetchInventory } from "../hooks/useFetchInventory.tsx";

const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  // const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleStockFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStockFilter(e.target.value);
  };
  const { inventoryData, headers } = useFetchInventory();

  const getStockStatus = (cantidad: number) => {
    if (cantidad === 0)
      return (
        <span>
          <FaTimesCircle style={{ color: "red" }} /> Agotado
        </span>
      );
    if (cantidad <= 10)
      return (
        <span>
          <FaExclamationTriangle style={{ color: "orange" }} /> Próximo a
          agotarse
        </span>
      );
    return (
      <span>
        <FaCheckCircle style={{ color: "green" }} /> Disponible
      </span>
    );
  };

  const filteredData = inventoryData
    .map((item) => ({
      ...item,
      estadoStock:
        Number(item.stock) === 0
          ? "Agotado"
          : Number(item.stock) <= 10
          ? "Próximo a agotarse"
          : "Disponible",
      stockStatusElement: getStockStatus(Number(item.stock)),
    }))
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter((item) => {
      if (!stockFilter) return true;
      if (stockFilter === "disponible" && Number(item.stock) > 10) return true;
      if (
        stockFilter === "proximo" &&
        Number(item.stock) <= 10 &&
        Number(item.stock) > 0
      )
        return true;
      if (stockFilter === "agotado" && Number(item.stock) === 0) return true;
      return false;
    })
    .sort((a, b) => {
      if (sortOrder === "A-Z")
        return a.descripcion.localeCompare(b.descripcion);
      return 0;
    });
  return (
    <div className="page-container">
      <InventoryActions
        labelTitle="Inventario"
        sortOrder={sortOrder}
        stockFilter={stockFilter}
        searchTerm={searchTerm}
        handleSort={handleSort}
        handleStockFilter={handleStockFilter}
        handleSearch={handleSearch}
      />
      <div style={{alignSelf: "flex-start"}}>
        <p className="label">
          Se encontraron{" "}
          <span
            className="highlight-bubble"
            style={{ backgroundColor: "#A5DDFF" }}
          >
            15
          </span>{" "}
          elementos
        </p>
      </div>
      <Table
        columns={headers}
        data={filteredData}
        itemsPerPage={5}
        linkColumn={{
          label: "✏️ Editar",
          path: "/producto",
          idKey: "id",
          type: "modal",
        }}
      />
    </div>
  );
};

export default Inventario;
