import React, { useState, useEffect } from "react";
import "./CashRegister";
import DataTable, { TableColumn } from "react-data-table-component";

import Select from "react-select";

interface Producto {
  id: number;
  descripcion: string;
  distribuidor: string;
  cantidad: number;
  precio: number;
  precioCompra: number; // Añadido precio de compra
  subtotal: number;
  maxCantidad: number;
}

const Shopping: React.FC = () => {
  const [totalCompra, setTotalCompra] = useState<number>(0);
  const [productosSeleccionados, setProductosSeleccionados] = useState<
    Producto[]
  >([]);
  const [nombreCliente, setNombreCliente] = useState<string>("");
  const [productoNuevo, setProductoNuevo] = useState<{
    descripcion: string;
    precioVenta: number;
    precioCompra: number;
  }>({
    descripcion: "",
    precioVenta: 0,
    precioCompra: 0,
  });

  useEffect(() => {
    const total = productosSeleccionados.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );
    setTotalCompra(total);
  }, [productosSeleccionados]);

  const handleCantidadChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newCantidad = parseInt(e.target.value);
    const producto = productosSeleccionados.find((item) => item.id === id);
    if (producto && newCantidad > producto.maxCantidad) {
      alert(
        `La cantidad máxima permitida para ${producto.descripcion} es ${producto.maxCantidad}`
      );
      return;
    }
    const updatedData = productosSeleccionados.map((item) =>
      item.id === id ? { ...item, cantidad: newCantidad } : item
    );
    const updatedDataWithSubtotal = updatedData.map((item) => ({
      ...item,
      subtotal: item.precio * item.cantidad,
    }));
    setProductosSeleccionados(updatedDataWithSubtotal);
  };

  const eliminarProducto = (id: number) => {
    const updatedData = productosSeleccionados.filter((item) => item.id !== id);
    setProductosSeleccionados(updatedData);
  };

  const handleGuardarVenta = () => {
    if (totalCompra == 0) {
      alert("No has registrado ningun medicamento");
    } else {
      const ventaData = productosSeleccionados.map((producto) => ({
        id: producto.id,
        descripcion: producto.descripcion,
        distribuidor: producto.distribuidor,
        cantidad: producto.cantidad,
        precio: producto.precio,
        subtotal: producto.subtotal,
      }));

      console.log("Nombre del Cliente:", nombreCliente);
      console.log(ventaData);
    }
  };

  const handleAgregarProductoNuevo = () => {
    if (
      !productoNuevo.descripcion ||
      productoNuevo.precioVenta <= 0 ||
      productoNuevo.precioCompra <= 0
    ) {
      alert("Por favor ingresa todos los datos del producto.");
      return;
    }

    const nuevoProducto: Producto = {
      id: new Date().getTime(), // Genera un ID único basado en la fecha
      descripcion: productoNuevo.descripcion,
      distribuidor: "Distribuidor X", // Aquí puedes añadir la lógica para obtenerlo
      cantidad: 1,
      precio: productoNuevo.precioVenta,
      precioCompra: productoNuevo.precioCompra,
      subtotal: productoNuevo.precioVenta,
      maxCantidad: 10, // Max cantidad ejemplo
    };

    setProductosSeleccionados([...productosSeleccionados, nuevoProducto]);
    setProductoNuevo({ descripcion: "", precioVenta: 0, precioCompra: 0 });
  };

  const colourOptions = [
    { value: "red", label: "Red" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "purple", label: "Purple" },
  ];
  const columns: TableColumn<Producto>[] = [
    { name: "Descripción", selector: (row) => row.descripcion, sortable: true },
    {
      name: "Distribuidor",
      selector: (row) => row.distribuidor,
      sortable: true,
    },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad,
      sortable: true,
      right: true,
      cell: (row) => (
        <input
          type="number"
          value={row.cantidad}
          onChange={(e) => handleCantidadChange(e, row.id)}
          className="input-cantidad"
          min="0"
          max={row.maxCantidad}
        />
      ),
    },
    {
      name: "Precio de venta",
      selector: (row) => row.precio,
      sortable: true,
      right: true,
      format: (row) => `$${row.precio.toFixed(2)}`,
    },
    {
      name: "Precio de compra",
      selector: (row) => row.precioCompra,
      sortable: true,
      right: true,
      format: (row) => `$${row.precioCompra.toFixed(2)}`,
    },
    {
      name: "Subtotal",
      selector: (row) => row.subtotal,
      sortable: true,
      right: true,
      format: (row) => `$${row.subtotal.toFixed(2)}`,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => eliminarProducto(row.id)}
          className="eliminar-btn"
        >
          Eliminar
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="container-main">
      <h2>Realizar venta</h2>

      {/* Input para el nombre del cliente */}
      <div className="customer-name-container">
        <label htmlFor="customerName" className="customer-name-label">
          Nombre del cliente (opcional):
        </label>
        <input
          type="text"
          id="customerName"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
          placeholder="Ingresa el nombre del cliente"
          className="customer-name-input"
        />
      </div>
      <Select
        defaultValue={[colourOptions[2], colourOptions[3]]} // Selecciona por defecto Green y Yellow
        isMulti
        name="colors"
        options={colourOptions}
        className="basic-multi-select"
        classNamePrefix="select"
      />

      {/* Input para agregar nuevo producto */}
      <div className="nuevo-producto-container">
        <input
          type="text"
          placeholder="Descripción"
          value={productoNuevo.descripcion}
          onChange={(e) =>
            setProductoNuevo({ ...productoNuevo, descripcion: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Precio de venta"
          value={productoNuevo.precioVenta}
          onChange={(e) =>
            setProductoNuevo({ ...productoNuevo, precioVenta: +e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Precio de compra"
          value={productoNuevo.precioCompra}
          onChange={(e) =>
            setProductoNuevo({
              ...productoNuevo,
              precioCompra: +e.target.value,
            })
          }
        />
        <button onClick={handleAgregarProductoNuevo}>Agregar Producto</button>
      </div>

      <div className="fullscreen-table-wrapper">
        <div className="table-container">
          <DataTable
            title="Lista de Productos"
            columns={columns}
            data={productosSeleccionados}
            highlightOnHover
            striped
            responsive
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 100px)"
          />
        </div>
        <div className="total-container">
          <h3>Total de la compra: ${totalCompra.toFixed(2)}</h3>
        </div>
        <div className="guardar-venta-btn-container">
          <button onClick={handleGuardarVenta} className="guardar-venta-btn">
            Guardar Venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shopping;
