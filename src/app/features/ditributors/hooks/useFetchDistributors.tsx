import { useEffect, useState } from "react";
import type { ColumnDefinition } from "../../../../types.d.ts";
import {
  getDistributors,
  getDistributorsCompany,
} from "../../../shared/api/services/Distributors.ts";

interface labelI {
  label: string;
  value: string;
  id: number;
}

interface DistributorItem {
  id: number;
  nombre: string;
  empresa: string;
  telefono: string;
  ultimoPedido: string;
  [key: string]: unknown;
}

export const useFetchDistributors = () => {
  const [distributorData, setDistributorsData] = useState<DistributorItem[]>(
    []
  );
  const [headers, setHeaders] = useState<ColumnDefinition<DistributorItem>[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDistributors().then((res) => {
      const { headers: hdrs, data } = res;
      setDistributorsData(data);
      const mappedHeaders = hdrs.map((h: { key: string; header: string }) => ({
        key: h.key as keyof DistributorItem,
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
  return { distributorData, headers, loading };
};

export const useFetchCompanies = () => {
  const [companiesData, setCompaniesData] = useState<labelI[]>([]);

  useEffect(() => {
    getDistributorsCompany().then((res) => {
      setCompaniesData(res);
    });
  }, []);

  return {
    companiesData,
  };
};
