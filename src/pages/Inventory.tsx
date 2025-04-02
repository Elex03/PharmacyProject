import { useState } from "react";
import InventoryTable from "../components/layout/InventoryTable";
import "../pages/Inventory.css";
import data from "../data/data.json";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import PieChart from "../components/charts/piChart";

const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  // input de búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // manejo del filtro de ordenamiento
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  // manejo del filtro de estado de stock
  const handleStockFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStockFilter(e.target.value);
  };

  // estado de stock
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

  // Filtrado de datos
  const filteredData = data
    .map((item) => ({
      ...item,
      stock: getStockStatus(Number(item.inventario)),
    }))
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter((item) => {
      if (!stockFilter) return true;
      if (stockFilter === "disponible" && Number(item.inventario) > 10)
        return true;
      if (
        stockFilter === "proximo" &&
        Number(item.inventario) <= 10 &&
        Number(item.inventario) > 0
      )
        return true;
      if (stockFilter === "agotado" && Number(item.inventario) === 0)
        return true;
      return false;
    })
    .sort((a, b) => {
      if (sortOrder === "A-Z")
        return a.descripcion.localeCompare(b.descripcion);
      return 0;
    });

  return (
    <div className="inventory-page" style={{ width: "90vw" }}>
      <div style={{ width: "95%" }}>
        <h2>Inventario</h2>

        <PieChart />
        <div className="inventory-actions">
          <input
            type="text"
            placeholder="Buscar"
            className="buscar-bar"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className="filter-dropdown-nombre"
            style={{ backgroundColor: "white" }}
            value={sortOrder}
            onChange={handleSort}
          >
            <option value="">Filtrar por nombre</option>
            <option value="A-Z">A - Z</option>
          </select>

          {/* Nuevo filtro por estado de stock */}
          <select
            className="filter-dropdown-stock"
            value={stockFilter}
            onChange={handleStockFilter}
          >
            <option value="">Filtrar por estado de stock</option>
            <option value="disponible">Disponible</option>
            <option value="proximo">Próximo a agotarse</option>
            <option value="agotado">Agotado</option>
          </select>

          <Link to={"/compras"} className="link">
            <button className="registro-button">Registrar pedido</button>
          </Link>
        </div>
        <center>

        <InventoryTable data={filteredData} />
        </center>
      </div>
    </div>
  );
};

export default Inventario;
