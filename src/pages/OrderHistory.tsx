import { useState } from "react";
import "./OrderHistory.css";
import OrderHistoryTable from "../components/layout/OrderHistoryTable";
import data from "../data/orderHistoryData.json";


const OrderHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

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
        <h2>Historial de pedidos</h2>
        <div className="orderhistory-actions">
          <input
            type="text"
            placeholder="Buscar"
            className="search-bar-orderhistory"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select className="filter-dropdown-orderhistory" value={sortOrder} onChange={handleSort}>
            <option value="">Filtrar por nombre</option>
            <option value="A-Z">A - Z</option>
          </select>
          <button className="register-button-orderhistory">Levantar pedido</button>
        </div>
        <OrderHistoryTable data={filteredData} />
      </div>
    );
};

export default OrderHistory;
