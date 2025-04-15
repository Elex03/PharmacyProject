import { useEffect, useRef, useState } from "react";

export interface ColumnFilterState {
  searchText: string;
  selectedValues: string[];
  sortOrder?: boolean;
  isOpen?: boolean;
}

interface FilterDropdownProps {
  columnKey: string;
  columnHeader: string;
  allData: Record<string, unknown>[];
  filter: ColumnFilterState;
  onChangeFilter: (newState: Partial<ColumnFilterState>) => void;
  isNumeric?: boolean;
  isDate?: boolean;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  columnKey,
  columnHeader,
  allData,
  filter,
  onChangeFilter,
  isNumeric,
  isDate,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { searchText, selectedValues, sortOrder } = filter;

  const [expandedYears, setExpandedYears] = useState<string[]>([]);
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);

  const uniqueValues = Array.from(
    new Set(
      allData
        .map((item) => item[columnKey])
        .filter(Boolean)
        .map((val) => String(val))
    )
  );
  
  if (sortOrder !== undefined) {
    uniqueValues.sort((a, b) => {
      if (isDate) {
        const dateA = new Date(a).getTime();
        const dateB = new Date(b).getTime();
        return sortOrder ? dateB - dateA : dateA - dateB;
      }
  
      if (isNumeric) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        return sortOrder ? numA - numB : numB - numA;
      }
  
      return sortOrder
        ? a.localeCompare(b) // A-Z
        : b.localeCompare(a); // Z-A
    });
  }

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onChangeFilter]);

  const toggleSortOrder = (order: boolean) => {
    onChangeFilter({
      sortOrder: sortOrder === order ? undefined : order,
    });
  };

  const toggleValue = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChangeFilter({ selectedValues: newValues });
  };

  const handleSelectAllChange = () => {
    const newSelected = allSelected
      ? selectedValues.filter((val) => !filteredValues.includes(val))
      : Array.from(new Set([...selectedValues, ...filteredValues]));

    onChangeFilter({ selectedValues: newSelected });
  };

  const toggleYear = (year: string) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const toggleMonth = (monthKey: string) => {
    setExpandedMonths((prev) =>
      prev.includes(monthKey) ? prev.filter((m) => m !== monthKey) : [...prev, monthKey]
    );
  };

  const renderDateFilter = () => {
    const dateTree: Record<string, Record<string, string[]>> = {};

    filteredValues.forEach((val) => {
      const date = new Date(val);
      if (!isNaN(date.getTime())) {
        const year = String(date.getFullYear());
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        if (!dateTree[year]) dateTree[year] = {};
        if (!dateTree[year][month]) dateTree[year][month] = [];
        dateTree[year][month].push(`${year}-${month}-${day}`);
      }
    });

    return (
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {Object.entries(dateTree).map(([year, months]) => (
          <div key={year}>
            <div style={{ display: "flex", alignItems: "center", fontWeight: "bold" }}>
              <span
                style={{ cursor: "pointer", marginRight: "8px" }}
                onClick={() => toggleYear(year)}
              >
                {expandedYears.includes(year) ? "−" : "+"}
              </span>
              <label>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(year)}
                  onChange={() => toggleValue(year)}
                />{" "}
                {year}
              </label>
            </div>
            {expandedYears.includes(year) && (
              <div style={{ marginLeft: "1rem" }}>
                {Object.entries(months).map(([month, days]) => {
                  const monthKey = `${year}-${month}`;
                  return (
                    <div key={monthKey}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{ cursor: "pointer", marginRight: "8px" }}
                          onClick={() => toggleMonth(monthKey)}
                        >
                          {expandedMonths.includes(monthKey) ? "−" : "+"}
                        </span>
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedValues.includes(monthKey)}
                            onChange={() => toggleValue(monthKey)}
                          />{" "}
                          {month}
                        </label>
                      </div>
                      {expandedMonths.includes(monthKey) && (
                        <div style={{ marginLeft: "1rem" }}>
                          {days.map((dayVal) => (
                            <label key={dayVal} style={{ display: "block" }}>
                              <input
                                type="checkbox"
                                checked={selectedValues.includes(dayVal)}
                                onChange={() => toggleValue(dayVal)}
                              />{" "}
                              {dayVal.split("-")[2]}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderDefaultFilter = () => (
    <div style={{ maxHeight: "150px", overflowY: "auto", marginBottom: "8px" }}>
      {filteredValues.map((val) => (
        <label key={val} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={selectedValues.includes(val)}
            onChange={() => toggleValue(val)}
          />{" "}
          {val}
        </label>
      ))}
    </div>
  );

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
        width: "240px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        borderRadius: "4px",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "8px" }}>{columnHeader}</div>

      <div style={{ marginBottom: "8px" }}>
        <div
          style={{ cursor: "pointer", marginBottom: "4px" }}
          onClick={() => toggleSortOrder(true)}
        >
          {sortOrder === true ? "✓ " : ""}
          {isNumeric ? "Ordenar de menor a mayor" : isDate ? "Ordenar de más reciente a más antiguo" : "Ordenar de A a Z"}
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => toggleSortOrder(false)}
        >
          {sortOrder === false ? "✓ " : ""}
          {isNumeric ? "Ordenar de mayor a menor" : isDate? "Ordenar del mas antiguo al mas reciente" :"Ordenar de Z a A"}
        </div>
      </div>

      <hr style={{ margin: "6px 0" }} />

      <input
        type="text"
        placeholder="Buscar..."
        value={searchText}
        onChange={(e) => onChangeFilter({ searchText: e.target.value })}
        style={{ width: "100%", marginBottom: "8px" }}
      />

      <div style={{ marginBottom: "8px" }}>
        <label>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAllChange}
          />{" "}
          Seleccionar todo
        </label>
      </div>

      {isDate ? renderDateFilter() : renderDefaultFilter()}

      <hr style={{ margin: "6px 0" }} />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => onChangeFilter({ isOpen: false })} style={{ marginRight: "8px" }}>
          Aceptar
        </button>
        <button onClick={() => onChangeFilter({ isOpen: false })}>
          Cancelar
        </button>
      </div>
    </div>
  );
};
