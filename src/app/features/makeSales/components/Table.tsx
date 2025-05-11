import { useState } from "react";
import type { ColumnDefinition } from "../../../../types";
import { PaginationFooter } from "../../../shared/components/layout/Table/PaginationFooter";
import "./Table.css";


type TableProps<T> = {
  columns: ColumnDefinition<T>[];
  data: T[];
  itemsPerPage?: number;
handleData: (row: T, eliminated: false) => void;
};
export function Table<T extends { id: string | number }>({
  columns,
  data,
  itemsPerPage = 10,
  handleData,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowClick = (element: T) => {
    handleData(element, false);
    console.log(element);
  };

  return (
<div className="Table-MakeSales">
  <table className="custom-table">
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={String(col.key)}>{col.header}</th>
        ))}
      </tr>
    </thead>
  </table>

  <div className="table-body-scroll">
    <table className="custom-table">
      <tbody>
        {pageData.map((row) => (
          <tr
            key={row.id}
            onClick={() => handleRowClick(row)}
            style={{ cursor: "pointer" }}
          >
            {columns.map((col) => (
              <td key={String(col.key)}>
                {String(row[col.key as keyof T])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <PaginationFooter
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
  />
</div>
  );
}
