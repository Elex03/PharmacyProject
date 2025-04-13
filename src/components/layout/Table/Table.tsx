import React, { useState } from "react";
import { FilterDropdown, ColumnFilterState } from "./Filter";

type ColumnDefinition<T> = {
  key: keyof T;
  header: string;
  isNumeric?: boolean;
};

type TableProps<T> = {
  columns: ColumnDefinition<T>[];
  data: T[];
};

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
}: TableProps<T>) {
  const [filters, setFilters] = useState<Record<string, ColumnFilterState>>({});

  const handleChangeFilter = (
    columnKey: string,
    newState: Partial<ColumnFilterState>
  ) => {
    setFilters((prev) => {
      const existing = prev[columnKey] || {
        searchText: "",
        selectedValues: [],
        sortOrder: undefined,
        isOpen: false,
      };

      return {
        ...prev,
        [columnKey]: { ...existing, ...newState },
      };
    });
  };

  const filteredData = data.filter((item) => {
    return columns.every((col) => {
      const f = filters[col.key as string];
      if (!f) return true;
      const value = String(item[col.key]);
      const matchSelected =
        f.selectedValues?.length === 0 || f.selectedValues.includes(value);
      const matchSearch = value
        .toLowerCase()
        .includes(f.searchText?.toLowerCase() || "");
      return matchSelected && matchSearch;
    });
  });

  const sortedData = [...filteredData];
  columns.forEach((col) => {
    const f = filters[col.key as string];
    if (f?.sortOrder !== undefined) {
      sortedData.sort((a, b) => {
        if (col.isNumeric) {
          // Ordenamiento numérico
          const aNum = Number(a[col.key]);
          const bNum = Number(b[col.key]);
          return f.sortOrder ? aNum - bNum : bNum - aNum;
        } else {
          // Ordenamiento alfabético
          const valA = String(a[col.key]).toLowerCase();
          const valB = String(b[col.key]).toLowerCase();
          return f.sortOrder
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
      });
    }
  });

  return (
    <div style={{ position: "relative", overflow: "visible" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: "1px solid #ccc",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ccc",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{col.header}</span>
                  <button
                    onClick={() =>
                      handleChangeFilter(col.key as string, {
                        isOpen: !filters[col.key as string]?.isOpen,
                      })
                    }
                    style={{
                      marginLeft: "8px",
                      fontSize: "12px",
                      backgroundColor: "#eee",
                      padding: "2px 4px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Flecha hacia abajo (triángulo) */}
                      <path d="M0 2 L4 6 L8 2 Z" fill="#333" />
                    </svg>
                  </button>
                </div>
                {filters[col.key as string]?.isOpen && (
                  <FilterDropdown
                    columnKey={col.key as string}
                    columnHeader={col.header}
                    allData={data}
                    filter={
                      filters[col.key as string] || {
                        searchText: "",
                        selectedValues: [],
                      }
                    }
                    onChangeFilter={(newState) =>
                      handleChangeFilter(col.key as string, newState)
                    }
                    isNumeric={col.isNumeric}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              style={{
                backgroundColor: rowIdx % 2 ? "#fafafa" : "white",
              }}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
