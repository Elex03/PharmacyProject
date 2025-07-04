import { useFieldArray, useForm } from "react-hook-form";
import { useCart } from "./useCart";
import { useEffect } from "react";
import { useNotifications } from "../../pedidos/hooks/useNotifications";
import { createMakeSales } from "../../../shared/api/services/MakeSales";
import { toast } from "react-toastify";

import type { Notificacion } from "../../../features/pedidos/hooks/useNotifications";
import { getItemPerCode } from "../../../shared/api/services/General";

interface FormValues {
  pagaCon: number;
  total: number;
  empleado_fk: number;
  detalle: {
    medicamento_fk: number;
    cantidad: number;
    descripcion?: string;
    precioVenta?: number;
    stock?: number;
  }[];
}

export interface VentaResponse {
  message: string;
  ventaId: number;
  total: number;
  detalle: DetalleVentaResponse[];
}

export interface DetalleVentaResponse {
  medicamento_fk: number;
  nombre: string;
  imageUrl: string;
  cantidadVendida: number;
  stockRestante: number;
}

export const useStateResumeLayout = (
  setDataChanged: (value: boolean | ((prev: boolean) => boolean)) => void
) => {
  const { items: cartItems, deleteItem, empty, add } = useCart();

  useEffect(() => {
    const socket = new WebSocket("ws://10.17.82.184:4000");

    const handleSearchItem = (code: string) => {
      if (code) {

        const settingsPromise = {
          position: "top-center" as const,
          autoClose: 1000,
        }
        const promise = getItemPerCode(Number(code));

       

        promise
          .then((response) => {
            const data = response.data;

            if (cartItems.some((item) => item.id === data.id)) {
              toast.error("Producto ya está en el carrito", {
                ...settingsPromise,
              });
              return;
            }
            if (data.stock <= 0) {
              toast.error("Producto sin stock", {
                ...settingsPromise,
              });
              return;
            }

            add({
              id: data.id,
              name: data.name,
              price: data.price,
              stock: data.stock,
            });
            toast.success("Producto agregado al carrito", {
              ...settingsPromise,
            });
          })
          .catch(() => {
            toast.error("Error en la búsqueda", {
              ...settingsPromise,
            });
          });
      }
    };

    socket.onopen = () => {
      console.log("✅ Conectado al servidor WebSocket");
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === "text") {
          console.log("📥 Código QR recibido en web:", message.data);

          handleSearchItem(message.data);
        }
      } catch (err) {
        console.error("❌ Error al parsear mensaje:", err);
      }
    };

    socket.onclose = () => {
      console.log("🔌 Conexión WebSocket cerrada");
    };

    socket.onerror = (err) => {
      console.error("🚨 Error WebSocket:", err);
    };

    return () => {
      socket.close();
    };
  }, [add, cartItems]);

  const { register, handleSubmit, control, watch, reset } = useForm<FormValues>(
    {
      defaultValues: {
        pagaCon: 0,
        total: 0,
        empleado_fk: 1,
        detalle: [],
      },
    }
  );

  const { fields, remove, update } = useFieldArray({
    control,
    name: "detalle",
  });

  useEffect(() => {
    const detalle = cartItems.map((item) => ({
      medicamento_fk: item.id,
      cantidad: 1,
      descripcion: item.name,
      precioVenta: item.price,
      stock: item.stock,
    }));
    reset({
      pagaCon: 0,
      empleado_fk: 1,
      detalle,
    });
  }, [cartItems, reset]);

  const handleCantidadChange = (
    index: number,
    cantidad: number,
    stock: number
  ) => {
    const nuevaCantidad = Math.max(1, Math.min(cantidad, stock));
    update(index, {
      ...fields[index],
      cantidad: nuevaCantidad,
    });
  };

  const calcularTotal = () => {
    return watch("detalle").reduce(
      (acc, item) => acc + item.cantidad * (item.precioVenta || 0),
      0
    );
  };

  const eliminarItem = (index: number, id: number) => {
    deleteItem(id);
    remove(index);
  };

  const handleCancelBotton = () => {
    empty();
    reset({
      pagaCon: 0,
      empleado_fk: 1,
      detalle: [],
    });
  };

  const { guardarNotificaciones } = useNotifications();

  const onSubmit = (data: FormValues) => {
    const payload = {
      pagaCon: data.pagaCon,
      empleado_fk: data.empleado_fk,
      detalle: data.detalle.map((d) => ({
        medicamento_fk: d.medicamento_fk,
        cantidad: d.cantidad,
      })),
      total: calcularTotal(),
    };

    toast
      .promise(
        createMakeSales(payload),
        {
          pending: "Procesando venta...",
          success: "Venta creada exitosamente",
          error: "Error al crear la venta",
        },
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      )
      .then((response) => {
        empty();
        setDataChanged((prev) => !prev);

        const notificacionesBajoStock: Notificacion[] = response.detalle
          .filter((item: DetalleVentaResponse) => item.stockRestante <= 10)
          .map((item: DetalleVentaResponse) => ({
            nombre: item.nombre,
            stock: item.stockRestante,
            tipoAviso: "stock",
            fechaProgramada: new Date().toISOString(),
            img: item.imageUrl,
            leido: false,
          }));
        if (notificacionesBajoStock.length > 0) {
          const notificacionesGuardadas: Notificacion[] = JSON.parse(
            localStorage.getItem("notificaciones") || "[]"
          );
          const nuevas = [
            ...notificacionesGuardadas,
            ...notificacionesBajoStock,
          ];
          guardarNotificaciones(nuevas);

          notificacionesBajoStock.forEach((noti) => {
            toast.warn(
              `"${noti.nombre}" está próximo a agotarse (stock: ${noti.stock})`,
              {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
              }
            );
          });
        }
      })
      .catch((error) => {
        console.error("Error al crear la venta:", error);
      });
  };

  return {
    onSubmit,
    eliminarItem,
    handleCancelBotton,
    handleCantidadChange,
    register,
    handleSubmit,
    calcularTotal,
    fields,
  };
};
