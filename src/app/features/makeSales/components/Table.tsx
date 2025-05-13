import { useEffect, useState } from "react";
import type { ColumnDefinition } from "../../../../types";
import { PaginationFooter } from "../../../shared/components/layout/Table/PaginationFooter";
import "./Table.css";
import '../../../shared/components/layout/Table/Table.css'
import { useCart } from "../hooks/useCart";

type TableProps<T> = {
  columns: ColumnDefinition<T>[];
  data: T[];
  itemsPerPage?: number;
};
export function Table<
  T extends {
    id: number;
    stock: number;
    descripcion: string;
    precioVenta: number;
  }
>({ columns, data, itemsPerPage = 10 }: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageData = data.slice(startIndex, startIndex + itemsPerPage);

  const { add } = useCart();

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowClick = (element: {
    id: number;
    stock: number;
    name: string;
    price: number;
  }) => {
    add(element);
    console.log(element);
  };

  useEffect(() => {
    if (pageData.length === 0) {
      setCurrentPage(1);
    }
  }, [pageData.length]);

  return (
    <div className="Table-MakeSales">
      <table className="inventory-table-I">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}
               className="bold-font"
              >{col.header}</th>
            ))}
          </tr>
        </thead>
      </table>

      <div className="table-body-scroll">
        <table className="inventory-table-I">
          <tbody>
            {pageData.map((row) => (
              <tr
                key={row.id}
                onClick={() =>
                  handleRowClick({
                    name: row.descripcion,
                    stock: row.stock,
                    id: row.id,
                    price: row.precioVenta,
                  })
                }
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
