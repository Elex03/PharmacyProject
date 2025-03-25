import { useState } from "react";
import DistributorsTable from "../components/layout/DistributorTable";
import "./Distributors.css";
import data from "../data/distributorsData.json"; 

const Distributors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredData = data
    .filter((distributor) =>
      Object.values(distributor).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.nombre.localeCompare(b.nombre);
      return 0;
    });

    return (
      <div className="distributors-page">
        <h2>Distribuidores</h2>
        <div className="distributors-actions">
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
          <button className="register-button">Crear un proveedor</button>
        </div>
        <DistributorsTable data={filteredData} />
      </div>
    );
  };
  
  export default Distributors;
  