import React from "react";

interface InventoryActionsProps {
  sortOrder: string;
  stockFilter?: string;
  searchTerm: string;
  enableSecondButton?: boolean;
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
  enableSecondButton,
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
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 10px",
          }}
        >
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
        <div style={{ padding: "0 10px" }}>
          <div style={{ gap: 10, display: "flex" }}>
            {enableSecondButton && (
              <button
                className="button-action"
                style={{ backgroundColor: "white", color: "black" }}
              >
                Devolver producto
              </button>
            )}

            {linkButton.type === "link" && (
              <a
                href={`/${linkButton.to}`}
                className="link"
                style={{ textDecoration: "none" }}
              >
                <button className="button-action">
                  {linkButton.ButtonLabel}
                </button>
              </a>
            )}
            {linkButton.type === "modal" && (
              <button className="button-action" onClick={onOpenModal}>
                {linkButton.ButtonLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutActions;
