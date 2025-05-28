import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Header } from "../../../../shared/components/layout/Header";
import { useCart } from "../../hooks/useCart";
import "../../../../shared/components/layout/Table/Table.css";
import { createMakeSales } from "../../../../shared/api/services/MakeSales";
import { toast } from "react-toastify";
import { useNotifications } from "../../../pedidos/hooks/useNotifications";

import type { Notificacion } from "../../../pedidos/hooks/useNotifications";

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

export const ResumeSaleLayout = () => {
  const { items: cartItems, deleteItem, empty } = useCart();

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
        // Supongamos que `response.detalle` contiene el stock actual después de la venta
        const notificacionesBajoStock: Notificacion[] = response.detalle
          .filter((item: DetalleVentaResponse) => item.stockRestante < 10) // Ajusta el nombre del campo si es diferente
          .map((item: DetalleVentaResponse) => ({
            nombre: item.nombre, // nombre del medicamento
            stock: item.cantidadVendida,
            tipoAviso: "stock",
            fechaProgramada: new Date().toISOString(),
            fechaVencimiento: "", 
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
          console.log('Se guardo');
        }
      })
      .catch((error) => {
        console.error("Error al crear la venta:", error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ border: "1px solid #000", padding: "10px" }}
    >
      <Header title="Resumen de venta" size="1.2rem" />

      <p style={{ fontSize: "12px" }}>
        Aquí se muestran los medicamentos que ha seleccionado para comprar.
        Puede ajustar la cantidad de cada producto o eliminarlo si lo desea.
      </p>

      <table className="inventory-table-I">
        <thead>
          <tr>
            <th className="bold-font" style={{ padding: "0px" }}>
              Descripción
            </th>
            <th className="bold-font" style={{ padding: "0px" }}>
              Cantidad
            </th>
            <th className="bold-font" style={{ padding: "0px" }}>
              SubTotal
            </th>
            <th className="bold-font" style={{ padding: "0px" }}>
              Acciones
            </th>
          </tr>
        </thead>
      </table>

      <div className="table-body-scroll" style={{ maxHeight: "20rem" }}>
        <table className="inventory-table-I">
          <tbody>
            {fields.map((item, index) => (
              <tr key={item.id}>
                <td>{item.descripcion}</td>
                <td>
                  <input
                    type="number"
                    value={item.cantidad}
                    min={1}
                    onChange={(e) =>
                      handleCantidadChange(
                        index,
                        parseInt(e.target.value),
                        item.stock || 1
                      )
                    }
                    style={{ width: "60px" }}
                  />
                </td>
                <td>
                  C${(item.cantidad * (item.precioVenta || 0)).toFixed(2)}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => eliminarItem(index, item.medicamento_fk)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "10px" }}>
        <label style={{ fontWeight: "bold", fontSize: "13px" }}>
          ¿Con cuánto paga el cliente?
        </label>
        <input
          type="number"
          {...register("pagaCon", { required: true, min: 0 })}
          style={{ width: "100%", padding: "5px", marginTop: "5px" }}
        />
      </div>

      <p style={{ fontWeight: "bold", marginTop: "10px" }}>
        Total de la venta: C${calcularTotal().toFixed(2)}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          justifyContent: "space-between",
        }}
      >
        <button type="button" className="cancelar" onClick={handleCancelBotton}>
          Cancelar venta
        </button>
        <button type="submit" className="guardar">
          Confirmar venta
        </button>
      </div>
    </form>
  );
};
