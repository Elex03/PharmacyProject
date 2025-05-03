import { useEffect, useState } from "react";
import { getBillData } from "../../../shared/api/services/Sales";

interface BillItem {
  id: number;
  nombre: string;
  fechacompra: string;
  total: number;
  montoPagado: 0;
}

interface ProductoItem {
  nombre: string;
  precio: number;
  cantidad: number;
  total?: number;
}

export const useFetchBill = (id: string) => {
  const [billData, setBillData] = useState<BillItem>();
  const [loading, setLoading] = useState(true);
  const [billDetails, setSbillDetails] = useState<ProductoItem[]>([]);


  useEffect(() => {
    getBillData(Number(id)).then((data) => {
      setBillData({
        id: data.id,
        nombre: data.cliente,
        fechacompra: data.fecha,
        total: data.total,
        montoPagado: 0,
      });

      console.log(data);

      const detallesConvertidos = data.productos.map((item: ProductoItem) => ({
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        total: item.precio * item.cantidad,
      }));

      setSbillDetails(detallesConvertidos);
      setLoading(false);
    });
  }, [id]);

  return { billData,billDetails, loading };
};
