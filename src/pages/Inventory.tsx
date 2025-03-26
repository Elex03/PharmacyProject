import { useState } from "react";
import InventoryTable from "../components/layout/InventoryTable";
import "./Inventory.css";
import data from "../data/data.json";
import PieAnimation from "../components/charts/piChart";

const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Manejo del input de búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Manejo del filtro de ordenamiento
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  // Filtrado de datos
  const filteredData = data
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.descripcion.localeCompare(b.descripcion);
      return 0;
    });

  return (
    <div className="inventory-page">
      <h2>Inventario</h2>
      <PieAnimation/>

      <div className="inventory-actions">
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
        <button className="register-button">Registrar pedido</button>
      </div>
      <InventoryTable data={filteredData} />      
    </div>
  );
};

export default Inventario;