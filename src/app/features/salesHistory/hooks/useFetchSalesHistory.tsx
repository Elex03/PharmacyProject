import { useEffect, useState } from "react";
import type { ColumnDefinition } from "../../../../types.d.ts";
import { getSalesHistoryData, getSalesPerWeek } from "../../../shared/api/services/Sales.ts";

interface SalesItem {
  id: number;
  cliente: string;
  fechaventa: string;
  total: number;
  [key: string]: unknown;
}
interface DayInventory {
    dia: string;
    esta_semana: number;
    anterior: number;
  }

export const useFetchSalesHistory = () => {
  const [salesHistoryData, setSalesHistoryData] = useState<SalesItem[]>([]);
  const [headers, setHeaders] = useState<ColumnDefinition<SalesItem>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSalesHistoryData().then((res) => {
      const { headers: hdrs, data } = res;
      setSalesHistoryData(data);
      const mappedHeaders = hdrs.map((h: { key: string; header: string }) => ({
        key: h.key as keyof SalesItem,
        header: h.header,
        isNumeric:
          h.key ===
          ["stock", "precioCompra", "precioVenta"].find((k) => k === h.key),
        isDate: h.key === "fechaVencimiento",
      }));
      setHeaders(mappedHeaders);
      setLoading(false);
    });
  }, []);
  return { salesHistoryData, headers, loading };
};


export const useFetchSalesChart = () => {
    const [salesHistoryDataChart, setSalesHistoryDataChart] = useState<DayInventory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      getSalesPerWeek().then((data) => {
        setSalesHistoryDataChart(data);
        setLoading(false);
      });
    }, []);

    return { salesHistoryDataChart, loading };
}