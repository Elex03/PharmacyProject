import { useEffect, useState } from "react";
import { getMakeSales } from "../../../shared/api/services/MakeSales";
import type { ColumnDefinition } from "../../../../types.d.ts";

export interface dataPreviewTableItem {
  id: number;
  descripcion: string;
  precioVenta: number;
  stock: number;
}

export const useFetchgetMakeSales = (dataChanged: boolean) => {
  const [makeSalesData, setMakeSalesData] = useState<dataPreviewTableItem[]>(
    []
  );
  const [headers, setHeaders] = useState<
    ColumnDefinition<dataPreviewTableItem>[]
  >([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMakeSales = async () => {
      await getMakeSales().then((res) => {
        const { headers: hdrs, data } = res.data;
        console.log(data);
        setMakeSalesData(data);
        const mappedHeaders = hdrs.map(
          (h: { key: string; header: string }) => ({
            key: h.key as keyof dataPreviewTableItem,
            header: h.header,
            isNumeric:
              h.key ===
              ["stock", "precioCompra", "precioVenta"].find((k) => k === h.key),
            isDate: h.key === "fechaVencimiento",
          })
        );
        setHeaders(mappedHeaders);
        setLoading(false);
      });
    };
    fetchMakeSales();
  },[dataChanged]);
  return {
    makeSalesData,
    headers,
    loading,
  };
};
