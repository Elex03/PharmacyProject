import React from "react";
import { useFetchSymptoms } from "../../../../features/inventory/hooks/useMedicineForm";
import DispositivoConBoton from "./DispositivoButton";
import "./Action.css";



interface InventoryActionsProps {
  sortOrder: string;
  stockFilter?: string;
  searchTerm: string;
  filterBySymptom?: boolean;
  enableSecondButton?: boolean;
  onOpenSecondModal?: () => void;
  onOpenModal?: () => void;
  handleSymptomChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  linkButton?: {
    type: "modal" | "link" | "scanner";
    ButtonLabel?: string;
    to?: string;
  };
  handleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleStockFilter?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LayoutActions: React.FC<InventoryActionsProps> = ({
  sortOrder,
  filterBySymptom = false,
  stockFilter,
  enableSecondButton,
  searchTerm,
  linkButton,
  handleSymptomChange,
  onOpenModal,
  onOpenSecondModal,
  handleStockFilter,
  handleSearch,
  handleSort,
}) => {
  const { symptoms } = useFetchSymptoms();

  return (
    <div className="step-actions">
      <div className="actions-container">
        <div className="filters">
          {filterBySymptom ? (
            <select className="filter-dropdown step-syntomps" onChange={handleSymptomChange}>
              <option value="">Filtrar por síntoma</option>
              {symptoms.map((symptom) => (
                <option key={symptom.id} value={symptom.text}>
                  {symptom.text}
                </option>
              ))}
            </select>
          ) : (
            <select
              className="filter-dropdown"
              value={sortOrder}
              onChange={handleSort}
            >
              <option value="">Filtrar por nombre</option>
              <option value="A-Z">A - Z</option>
            </select>
          )}

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

        <div className="buttons">
          {enableSecondButton && (
            <button
              className="button-action"
              style={{ backgroundColor: "white", color: "black" }}
              onClick={onOpenSecondModal}
            >
              Devolver producto
            </button>
          )}

          {linkButton?.type === "link" && (
            <a href={`/${linkButton.to}`} className="link" style={{ textDecoration: "none" }}>
              <button className="button-action">{linkButton.ButtonLabel}</button>
            </a>
          )}

          {linkButton?.type === "modal" && (
            <button className="button-action" onClick={onOpenModal}>
              {linkButton.ButtonLabel}
            </button>
          )}

          {linkButton?.type === "scanner" && <DispositivoConBoton />}
        </div>
      </div>
    </div>
  );
};

export default LayoutActions;
