import { useEffect, useRef } from "react";

export interface ColumnFilterState {
  searchText: string;
  selectedValues: string[];
  sortOrder?: boolean; // true = ASC (ascendente), false = DESC (descendente)
  isOpen?: boolean;
}

interface FilterDropdownProps {
  columnKey: string;
  columnHeader: string;
  allData: Record<string, unknown>[];
  filter: ColumnFilterState;
  onChangeFilter: (newState: Partial<ColumnFilterState>) => void;
  isNumeric?: boolean; // Si la columna es numérica
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  columnKey,
  columnHeader,
  allData,
  filter,
  onChangeFilter,
  isNumeric,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { searchText, selectedValues, sortOrder } = filter;

  const uniqueValues = Array.from(
    new Set(allData.map((item) => String(item[columnKey])))
  );

  const filteredValues = uniqueValues.filter((val) =>
    val.toLowerCase().includes(searchText.toLowerCase())
  );

  const allSelected = filteredValues.every((val) =>
    selectedValues.includes(val)
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onChangeFilter({ isOpen: false });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onChangeFilter]);

  const handleApply = () => {
    onChangeFilter({ isOpen: false });
  };

  const handleCancel = () => {
    onChangeFilter({ isOpen: false });
  };

  const toggleSortOrder = (order: boolean) => {
    onChangeFilter({
      sortOrder: sortOrder === order ? undefined : order,
    });
  };

  const handleSelectAllChange = () => {
    if (allSelected) {
      const newSelected = selectedValues.filter(
        (val) => !filteredValues.includes(val)
      );
      onChangeFilter({ selectedValues: newSelected });
    } else {
      const newSelected = Array.from(
        new Set([...selectedValues, ...filteredValues])
      );
      onChangeFilter({ selectedValues: newSelected });
    }
  };

  const toggleValue = (value: string) => {
    let newValues = [...(selectedValues || [])];
    if (newValues.includes(value)) {
      newValues = newValues.filter((v) => v !== value);
    } else {
      newValues.push(value);
    }
    onChangeFilter({ selectedValues: newValues });
  };

  return (
    <div
      ref={dropdownRef}
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        background: "#fff",
        border: "1px solid #ccc",
        padding: "8px",
        zIndex: 9999,
        width: "200px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
        {columnHeader}
      </div>

      <div style={{ marginBottom: "8px" }}>
        <div
          style={{ cursor: "pointer", marginBottom: "4px" }}
          onClick={() => toggleSortOrder(true)}
        >
          {sortOrder === true ? "✓ " : ""}
          {isNumeric ? "Ordenar de menor a mayor" : "Ordenar de A a Z"}
        </div>
        <div
          style={{ cursor: "pointer", marginBottom: "4px" }}
          onClick={() => toggleSortOrder(false)}
        >
          {sortOrder === false ? "✓ " : ""}
          {isNumeric ? "Ordenar de mayor a menor" : "Ordenar de Z a A"}
        </div>
      </div>

      <hr style={{ margin: "4px 0" }} />

      <input
        type="text"
        placeholder="Buscar..."
        value={searchText}
        onChange={(e) => onChangeFilter({ searchText: e.target.value })}
        style={{ width: "100%", marginBottom: "8px" }}
      />

      <div style={{ marginBottom: "8px" }}>
        <label style={{ cursor: "pointer", fontWeight: "bold" }}>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAllChange}
          />{" "}
          Seleccionar todo
        </label>
      </div>

      <div style={{ maxHeight: "120px", overflowY: "auto", marginBottom: "8px" }}>
        {filteredValues.map((val) => (
          <div key={val}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={selectedValues.includes(val)}
                onChange={() => toggleValue(val)}
              />
              {val}
            </label>
          </div>
        ))}
      </div>

      <hr style={{ margin: "4px 0" }} />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleApply} style={{ marginRight: "8px" }}>
          Aceptar
        </button>
        <button onClick={handleCancel}>Cancelar</button>
      </div>
    </div>
  );
};
