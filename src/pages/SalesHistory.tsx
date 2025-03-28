import { useState, useEffect } from "react";
import "./SalesHistory.css";
import SalesHistoTable from "../components/layout/SalesHistoTable";
import Example from "../components/charts/Chart";

interface SalesItem {
  id: number;
  cliente: string;
  fechaventa: string;
  total: number;
}

const SalesHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [data, setData] = useState<SalesItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/orders/getSales") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data: SalesItem[]) => {
        setData(data); 
      });
  }, []);

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
      if (sortOrder === "A-Z") return a.cliente.localeCompare(b.cliente);
      return 0;
    });

  return (
    <div className="SalesHistory-page">
      <h2>Historial de ventas</h2>
      <Example />
      <div className="SalesHistory-actions">
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="search-SalesHistory"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          className="filter-SalesHistory"
          value={sortOrder}
          onChange={handleSort}
        >
          <option value="">Filtrar por nombre</option>
          <option value="A-Z">A - Z</option>
        </select>
      </div>
      <SalesHistoTable data={filteredData} />
    </div>
  );
};

export default SalesHistory;
