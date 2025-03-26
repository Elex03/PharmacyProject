import { useState } from "react";
import "./SalesHistory.css";
import data from "../data/saleshistorialData.json"; 
import SalesHistoTable from "../components/layout/SalesHistoTable";
import Example from "../components/charts/Chart";

const SalesHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredData = data
    .filter((SalesHistory) =>
      Object.values(SalesHistory).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.nombre.localeCompare(b.nombre);
      return 0;
    });

    return (
      <div className="SalesHistory-page">
        <h2>Historial de ventas</h2>
        <Example/>
        <div className="SalesHistory-actions">
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="search-SalesHistory"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select className="filter-SalesHistory" value={sortOrder} onChange={handleSort}>
            <option value="">Filtrar por nombre</option>
            <option value="A-Z">A - Z</option>
          </select>         
        </div>
        <SalesHistoTable data={filteredData} />
      </div>
    );
  };
  
  export default SalesHistory;
  