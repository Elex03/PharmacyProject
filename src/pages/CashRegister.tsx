import React, { useState, useEffect } from "react";
import "./CashRegister.css";
import DataTable, { TableColumn } from "react-data-table-component";
import { motion } from "framer-motion";

interface Producto {
  id: number;
  descripcion: string;
  distribuidor: string;
  cantidad: number;
  precio: number;
  subtotal: number;
  maxCantidad: number;
}

const CashRegister: React.FC = () => {
  const [data, setData] = useState<Producto[]>([]);
  const [totalCompra, setTotalCompra] = useState<number>(0);
  const [busqueda, setBusqueda] = useState<string>("");
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState<
    Producto[]
  >([]);
  const [mostrarResultados, setMostrarResultados] = useState<boolean>(false);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error cargando datos:", error));
  }, []);

  useEffect(() => {
    const total = productosSeleccionados.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );
    setTotalCompra(total);
  }, [productosSeleccionados]);

  useEffect(() => {
    const productosFiltrados = data.filter((producto) =>
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosFiltrados(productosFiltrados);
    setMostrarResultados(busqueda.length > 0);
  }, [busqueda, data]);

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

  const agregarProducto = (producto: Producto) => {
    const productoExistente = productosSeleccionados.find(
      (item) => item.id === producto.id
    );
    let updatedData;
    if (productoExistente) {
      updatedData = productosSeleccionados.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      updatedData = [
        ...productosSeleccionados,
        { ...producto, cantidad: 1, subtotal: producto.precio },
      ];
    }
    setProductosSeleccionados(updatedData);
  };

  const eliminarProducto = (id: number) => {
    const updatedData = productosSeleccionados.filter((item) => item.id !== id);
    setProductosSeleccionados(updatedData);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setMostrarResultados(false);
      setBusqueda("");
    }
  };

  const handleGuardarVenta = () => {
    const ventaData = productosSeleccionados.map((producto) => ({
      id: producto.id,
      descripcion: producto.descripcion,
      distribuidor: producto.distribuidor,
      cantidad: producto.cantidad,
      precio: producto.precio,
      subtotal: producto.subtotal,
    }));

    console.log(ventaData);
  };

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
      name: "Precio",
      selector: (row) => row.precio,
      sortable: true,
      right: true,
      format: (row) => `$${row.precio.toFixed(2)}`,
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
    <div>
      <h2>Registro de ventas</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar medicamento..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        {mostrarResultados && (
          <div className="search-results">
            {productosFiltrados.map((producto) => (
              <motion.div
                key={producto.id}
                className="search-result-item"
                onClick={() => agregarProducto(producto)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {producto.descripcion}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="fullscreen-table-wrapper">
        <div className="table-container">
          <DataTable
            title="Lista de Productos"
            columns={columns}
            data={productosSeleccionados}
            pagination
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

export default CashRegister;
