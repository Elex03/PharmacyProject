import { useEffect, useState } from "react";
import type { ColumnDefinition } from "../../../../types.d.ts";
import { getInventoryData } from "../../../shared/api/services/Iventory.ts";

type InventoryItem = {
  id: string;
  descripcion: string;
  stock: number;
  distribuidor: string;
  fechaVencimiento: string;
  precioCompra: number;
  precioVenta: number;
  empresa: string;
  EstadoMedicamentoExpirado: string;
  utilidadBruta: number;
  imagenUrl: string;
};

export const useFetchInventory = () => {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [headers, setHeaders] = useState<ColumnDefinition<InventoryItem>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventoryData = async () => {
      getInventoryData().then((res) => {
        const { headers: hdrs, data } = res.data;
        setInventoryData(data);
        const mappedHeaders = hdrs.map(
          (h: { key: string; header: string }) => ({
            key: h.key as keyof InventoryItem,
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

    fetchInventoryData();
  }, []);

  return { inventoryData, headers, loading };
};
