import React from "react";
import { Link } from "react-router-dom";

interface InventoryActionsProps {
  sortOrder: string;
  stockFilter?: string;
  searchTerm: string;
  onOpenModal?: () => void;
  linkButton: {
    type: "modal" | "link";
    ButtonLabel?: string;
    to?: string;
  };
  handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleStockFilter?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LayoutActions: React.FC<InventoryActionsProps> = ({
  sortOrder,
  stockFilter,
  searchTerm,
  linkButton,
  onOpenModal,
  handleSort,
  handleStockFilter,
  handleSearch,
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 10px", // opcional
        }}
      >
        {/* Filtros y búsqueda */}
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
        {linkButton.type === "link" && (
          <Link
            to={`/${linkButton.to}`}
            className="link"
            style={{ textDecoration: "none" }}
          >
            <button className="button-action">{linkButton.ButtonLabel}</button>
          </Link>
        )}
        {linkButton.type === "modal" && (
          <button className="button-action" onClick={onOpenModal}>{linkButton.ButtonLabel}</button>
        )}
      </div>
    </div>
  );
};

export default LayoutActions;
