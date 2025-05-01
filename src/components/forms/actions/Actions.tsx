import React from "react";
import { Link } from "react-router-dom";

interface InventoryActionsProps {
  sortOrder: string;
  labelTitle: string;
  stockFilter?: string;
  searchTerm: string;
  handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleStockFilter?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InventoryActions: React.FC<InventoryActionsProps> = ({
  sortOrder,
  stockFilter,
  searchTerm,
  labelTitle,
  handleSort,
  handleStockFilter,
  handleSearch,
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "28px", margin: 0 , padding: 10}}>
          {labelTitle}
        </h1>

        {/* Filtros y Buscador */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <select
            className="filter-dropdown"
            value={sortOrder}
            onChange={handleSort}
          >
            <option value="">Filtrar por nombre</option>
            <option value="A-Z">A - Z</option>
          </select>
          {handleStockFilter && (
            <select
              className="filter-dropdown"
              value={stockFilter}
              onChange={handleStockFilter}
            >
              <option value="">Filtrar por estado de stock</option>
              <option value="disponible">Disponible</option>
              <option value="proximo">Próximo a agotarse</option>
              <option value="agotado">Agotado</option>
            </select>
          )}

          <input
            type="text"
            placeholder="Buscar rápido"
            className="search-bar"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <Link to={"/compras"} className="link" style={{ textDecoration: "none" }}>
        <button className="button-action">+ Agregar producto</button>
      </Link>
    </div>
  );
};

export default InventoryActions;
