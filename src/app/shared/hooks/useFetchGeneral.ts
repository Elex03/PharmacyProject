import { useEffect, useState } from "react";
import {
  getMedicineSales,
  getMedicineSelect,
  getMedicineStock,
} from "../api/services/Medicine";
import { ColumnDefinition } from "../../../types";
import { getDistributorsChart } from "../api/services/Distributors";

interface MedicineSelect {
  id: number;
  label: string;
  value: string;
  precio: number;
}

export const useFetchMedicineSelect = () => {
  const [medicineSelect, setMedicineSelect] = useState<MedicineSelect[]>([]);
  useEffect(() => {
    getMedicineSelect().then((res) => {
      setMedicineSelect(res);
    });
  }, []);

  return {
    medicineSelect,
  };
};

interface GrphicProps {
  descripcion: string;
  cantidad: number;
}

export const useFetchMedicineStock = () => {
  const [medicineStock, setMedicineStock] = useState<GrphicProps[]>([]);

  useEffect(() => {
    getMedicineStock().then((res) => {
      setMedicineStock(res);
    });
  }, []);

  return {
    medicineStock,
  };
};

export const useFetchdistributorQuantity = () => {
  const [distributorQuantity, setDistributorQuantity] = useState<GrphicProps[]>(
    []
  );
  useEffect(() => {
    getDistributorsChart().then((res) => {
      setDistributorQuantity(res);
    });
  }, []);

  return {
    distributorQuantity,
  };
};

export interface SalesReport {
  id: number;
  medicamentoId: number;
  descripcion: string;
  cantidadVendida: number;
}

export const useFetchSalesReport = (
  order: "asc" | "desc" = "desc",
  limit: number | "todos" = 10,
  filterByDate = false,
  from = "",
  enable = true,
  to = ""
) => {
  const [salesReport, setSalesReport] = useState<SalesReport[]>([]);

  const [headers, setHeaders] = useState<ColumnDefinition<SalesReport>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getMedicineSales(order, limit, filterByDate, from, to).then((res) => {
      const { headers: hdrs, data } = res;
      setSalesReport(data);
      const mappedHeaders = hdrs.map((h: { key: string; header: string }) => ({
        key: h.key as keyof SalesReport,
        header: h.header,
        isNumeric:
          h.key ===
          ["stock", "precioCompra", "precioVenta"].find((k) => k === h.key),
        isDate: h.key === "fechaVencimiento",
      }));
      setHeaders(mappedHeaders);
      setLoading(false);
    });
  }, [filterByDate, from, limit, order, to, enable]);

  return { salesReport, headers, loading };
};
