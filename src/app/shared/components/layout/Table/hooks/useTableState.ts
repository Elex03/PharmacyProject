import { useState } from "react";
import { ColumnFilterState } from "../Filter";
import { ColumnDefinition } from "../../../../../../types";
import { API_URL } from "../../../config";

export function useTableState<T>(
  columns: ColumnDefinition<T>[],
  data: T[],
  itemsPerPage: number
) {
  const [filters, setFilters] = useState<Record<string, ColumnFilterState>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

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
          const aNum = Number(a[col.key]);
          const bNum = Number(b[col.key]);
          return f.sortOrder ? aNum - bNum : bNum - aNum;
        } else if (col.isDate) {
          const dateA = new Date(a[col.key] as string | number).getTime();
          const dateB = new Date(b[col.key] as string | number).getTime();
          return f.sortOrder ? dateB - dateA : dateA - dateB;
        } else {
          const valA = String(a[col.key]).toLowerCase();
          const valB = String(b[col.key]).toLowerCase();
          return f.sortOrder
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
      });
    }
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(
    null
  );

  const handleImagenClick = (url: string) => {
    setImagenSeleccionada(`${API_URL}${url}`);
  };

  const cerrarModal = () => {
    setImagenSeleccionada(null);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return {
    handleChangeFilter,
    handlePageChange,
    cerrarModal,
    handleImagenClick,
    pageData,
    imagenSeleccionada,
    setImagenSeleccionada,
    setCurrentPage,
    sortedData,
    filteredData,
    filters,
    currentPage,
    totalPages,
  };
}
