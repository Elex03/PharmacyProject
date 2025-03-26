import { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../data/dataHistorial.json"; 
import "../pages/Historial.css"
import HistorialTable from "../components/layout/HistoriaTable";

const Historial = () => {
  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredData = data
    .filter((historial) =>
      Object.values(historial).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.nombre.localeCompare(b.nombre);
      return 0;
    });

    return (
      <div className="historial-page">
        <h2 className="historial-title">Historial de pedidos {id}</h2>              
        <div className="historial-actions">
          <input
            type="text"
            placeholder="Buscar"
            className="search-bar"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select className="filter-dropdown" value={sortOrder} onChange={handleSort}>
            <option value="">Filtrar por nombre</option>
            <option value="A-Z">A - Z</option>
          </select>
          <button className="register-button-histo">Levantar pedido</button>
        </div>
        <HistorialTable data={filteredData} />
      </div>
    );
  };
    
export default Historial;
