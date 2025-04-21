import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // O de next/router si estás en Next.js
import FacturaModal from "./factura";


interface Product {
  nombre: string;
  precio: number;
  cantidad: number;
  total: number;
}

interface ProductoItem {
    nombre: string;
    precio: number; // en Córdobas
    cantidad: number;
  }

interface SalesHistoItem {
  id: number;
  nombre: string;
  fechacompra: string;
  total: number;
}

export const FacturaPage = () => {
  const { id } = useParams(); // 👈 obtiene el ID de la URL
  const [saleData, setSaleData] = useState<SalesHistoItem | null>(null);
  const [saleDetails, setSaleDetails] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const response = await fetch(`http://localhost:3000/apiFarmaNova/orders/getSales/${id}`);
        const data = await response.json();

        // Asumiendo que el endpoint devuelve un objeto con la venta y sus productos
        setSaleData({
          id: data.id,
          nombre: data.cliente,
          fechacompra: data.fecha,
          total: data.total,
        });

        // Convertimos los detalles
        const detallesConvertidos = data.productos.map((item: ProductoItem) => ({
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
          total: item.precio * item.cantidad,
        }));

        setSaleDetails(detallesConvertidos);
      } catch (error) {
        console.error("Error al obtener la factura:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFactura();
  }, [id]);

  const handleClose = () => {
    window.history.back();
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) return <p>Cargando factura...</p>;
  if (!saleData) return <p>No se encontró la factura.</p>;

  return (
    <FacturaModal
      selectedSale={saleData}
      saleDetails={saleDetails}
      montoPagado={saleData.total}
      onClose={handleClose}
      onPrint={handlePrint}
    />
  );
};
