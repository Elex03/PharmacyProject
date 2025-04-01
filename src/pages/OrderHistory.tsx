import { useState } from "react";
import "./OrderHistory.css";
import OrderHistoryTable from "../components/layout/OrderHistoryTable";
import data from "../data/orderHistoryData.json";
import BarChart from "../components/charts/BarChart";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigator = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const dataBar = [45, 60, 80, 50, 90, 100, 75, 85, 95, 110, 120, 130];

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
    <div className="orderhistory-page">
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
      <h2>Historial de pedidos</h2>
      <BarChart data={dataBar} />;
      <div className="orderhistory-actions">
        <input
          type="text"
          placeholder="Buscar"
          className="search-bar-orderhistory"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          className="filter-dropdown-orderhistory"
          value={sortOrder}
          onChange={handleSort}
        >
          <option value="">Filtrar por nombre</option>
          <option value="A-Z">A - Z</option>
        </select>
        <button className="register-button-orderhistory">
          Levantar pedido
        </button>
      </div>
      <center>

      <OrderHistoryTable data={filteredData} />
      </center>
    </div>
  );
};

export default OrderHistory;
