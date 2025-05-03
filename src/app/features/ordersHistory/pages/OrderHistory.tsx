import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "../../../shared/components/layout/Table/Table";
import { ToggleSection } from "../../../shared/components/exportDocuments/TongleSelection";
import InventoryActions from "../../../shared/components/forms/actions/Actions";
import BarChart from "../../../shared/components/charts/BarChart";
import Layout from "../../../shared/components/layout/layout";
import {
  useFetchOrderDetailsGraph,
  useFetchOrderDetailsHistory,
} from "../hooks/useFetchOrderHistory";
import '../../../shared/styles/shared.css'
import '../styles/OrderHistory.css'


const OrderHistory = () => {
  const navigator = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { id } = useParams();
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { data, loading, headers, error } = useFetchOrderDetailsHistory(
    Number(id)
  );
  const { dataBar } = useFetchOrderDetailsGraph(Number(id));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredData = data
    .filter((orderhistory) =>
      Object.values(orderhistory).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.nombre.localeCompare(b.nombre);
      return 0;
    });

  return (
    <Layout title="Historial de pedidos">
      <div className="arrow-container" onClick={() => navigator(-1)}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </div>

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
        <div className="chart-container">
          <BarChart data={dataBar} />
        </div>
      </ToggleSection>

      <InventoryActions
      linkButton={{
        ButtonLabel: "Registrar nuevo pedido",
        type: "link",
      }}
        sortOrder={sortOrder}
        searchTerm={searchTerm}
        handleSort={handleSort}
        handleSearch={handleSearch}
      />
      {loading ? (
        <p>Cargando datos...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div style={{ width: "100%" }}>
          <Table
            data={filteredData}
            columns={headers}
            itemsPerPage={itemsPerPage}
            linkColumn={{
              label: "Ver detalles",
              path: "/historial",
              idKey: "id",
              type: "modal",
            }}
          />
        </div>
      )}
    </Layout>
  );
};

export default OrderHistory;
