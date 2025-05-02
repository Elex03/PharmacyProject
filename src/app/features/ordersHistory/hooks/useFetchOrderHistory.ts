import { useEffect, useState } from "react";
import {
  getOrdersDetailsData,
  getOrdersDetailsGraph,
} from "../../../shared/api/services/Orders";
import { ColumnDefinition } from "../../../../types";

interface OrderHistory {
  id: number;
  empresa: string;
  fechaPedido: string;
  estado: string;
  total: number;
  nombre: string;
  [key: string]: unknown;
}

export const useFetchOrderDetailsHistory = (id: number) => {
  const [data, setData] = useState<OrderHistory[]>([]);
  const [headers, setHeaders] = useState<ColumnDefinition<OrderHistory>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getOrdersDetailsData(id)
      .then((res) => {
        const { headers: hdrs, data } = res;
        setLoading(false);
        setData(data);
        const mappedHeaders = hdrs.map(
          (h: { key: string; header: string }) => ({
            key: h.key as keyof OrderHistory,
            header: h.header,
            isNumeric:
              h.key ===
              ["stock", "precioCompra", "precioVenta"].find((k) => k === h.key),
            isDate: h.key === "fechaVencimiento",
          })
        );
        setHeaders(mappedHeaders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Error al cargar los datos.");
        setLoading(false);
      });
  }, [id]);

  return { data, headers, loading, error };
};

export const useFetchOrderDetailsGraph = (id: number) => {
  const [dataBar, setDataBar] = useState<number[]>([]);

  useEffect(() => {
    getOrdersDetailsGraph(id)
      .then((data) => {
        setDataBar(data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [id]);

  return { dataBar };
};
