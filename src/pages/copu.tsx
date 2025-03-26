import React, { useState, useEffect } from "react";
import "./CashRegister.css";
import DataTable, { TableColumn } from "react-data-table-component";

interface Producto {
  id: number;
  descripcion: string;
  distribuidor: string;
  cantidad: number;
  precio: number;
  subtotal: number;
  maxCantidad: number;
  presentacion: string;
  categoria: string[];
  formaCompra: string;
  tipoMedicamento: string;
  cantidadCompra: number;
  precioUnidad: number;
  precioVentaSugerido: number;
}

const Shopping: React.FC = () => {
  const [data, setData] = useState<Producto[]>([]);
  const [totalCompra, setTotalCompra] = useState<number>(0);
  const [nombreCliente, setNombreCliente] = useState<string>("");

  const [presentaciones, setPresentaciones] = useState<string[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [formasCompra, setFormasCompra] = useState<string[]>([]);
  const [tiposMedicamentos, setTiposMedicamentos] = useState<string[]>([]);

  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto>({
    id: 0,
    descripcion: "",
    distribuidor: "",
    cantidad: 0,
    precio: 0,
    subtotal: 0,
    maxCantidad: 10,
    presentacion: "",
    categoria: [],
    formaCompra: "",
    tipoMedicamento: "",
    cantidadCompra: 0,
    precioUnidad: 0,
    precioVentaSugerido: 0,
  });

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error cargando datos:", error));

    fetch("/opciones.json")
      .then((response) => response.json())
      .then((json) => {
        setPresentaciones(json.presentaciones);
        setCategorias(json.categorias);
        setFormasCompra(json.formasCompra);
        setTiposMedicamentos(json.tiposMedicamentos);
      })
      .catch((error) => console.error("Error cargando opciones:", error));
  }, []);

  const handleCantidadChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newCantidad = parseInt(e.target.value);
    const productoIndex = data.findIndex((item) => item.id === id);

    if (productoIndex === -1) return;

    const producto = data[productoIndex];

    if (newCantidad > producto.maxCantidad) {
      alert(
        `La cantidad máxima permitida para ${producto.descripcion} es ${producto.maxCantidad}`
      );
      return;
    }

    const updatedData = [...data];
    updatedData[productoIndex] = {
      ...producto,
      cantidad: newCantidad,
      subtotal: newCantidad * producto.precio,
    };
    setData(updatedData);
  };

  const agregarProducto = () => {
    if (productoSeleccionado.descripcion === "") {
      alert("Por favor, ingresa una descripción para el producto.");
      return;
    }

    const updatedData = [
      ...data,
      {
        ...productoSeleccionado,
        subtotal: productoSeleccionado.precio * productoSeleccionado.cantidadCompra,
      },
    ];
    setData(updatedData);

    // Resetea el producto seleccionado a valores predeterminados después de agregarlo
    setProductoSeleccionado({
      id: 0,
      descripcion: "",
      distribuidor: "",
      cantidad: 0,
      precio: 0,
      subtotal: 0,
      maxCantidad: 10,
      presentacion: "",
      categoria: [],
      formaCompra: "",
      tipoMedicamento: "",
      cantidadCompra: 0,
      precioUnidad: 0,
      precioVentaSugerido: 0,
    });
  };

  const handleGuardarVenta = () => {
    if (totalCompra === 0) {
      alert("No has registrado ningun medicamento");
    } else {
      const ventaData = data.map((producto) => ({
        id: producto.id,
        descripcion: producto.descripcion,
        distribuidor: producto.distribuidor,
        cantidad: producto.cantidad,
        precio: producto.precio,
        subtotal: producto.subtotal,
      }));
      console.log(ventaData);
    }
  };

  const eliminarProducto = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const columns: TableColumn<Producto>[] = [
    { name: "Descripción", selector: (row) => row.descripcion, sortable: true },
    { name: "Distribuidor", selector: (row) => row.distribuidor, sortable: true },
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
          min="1"
          max={row.maxCantidad}
          className="cantidad-input"
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
        <button onClick={() => eliminarProducto(row.id)} className="eliminar-btn">
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
      <h2>Registrar nuevo medicamento</h2>

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

      <div className="input-container">
        <input
          type="text"
          placeholder="Nombre del medicamento"
          value={productoSeleccionado.descripcion}
          onChange={(e) =>
            setProductoSeleccionado({ ...productoSeleccionado, descripcion: e.target.value })
          }
        />
      </div>

      <div className="input-container">
        <select
          value={productoSeleccionado.presentacion}
          onChange={(e) =>
            setProductoSeleccionado({ ...productoSeleccionado, presentacion: e.target.value })
          }
        >
          <option value="">Selecciona una presentación</option>
          {presentaciones.map((presentacion, index) => (
            <option key={index} value={presentacion}>
              {presentacion}
            </option>
          ))}
        </select>
      </div>

      <div className="input-container">
        <select
          multiple
          value={productoSeleccionado.categoria}
          onChange={(e) => {
            const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
            setProductoSeleccionado({ ...productoSeleccionado, categoria: selectedCategories });
          }}
        >
          {categorias.map((categoria, index) => (
            <option key={index} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      <div className="input-container">
        <select
          value={productoSeleccionado.formaCompra}
          onChange={(e) =>
            setProductoSeleccionado({ ...productoSeleccionado, formaCompra: e.target.value })
          }
        >
          <option value="">Selecciona una forma de compra</option>
          {formasCompra.map((forma, index) => (
            <option key={index} value={forma}>
              {forma}
            </option>
          ))}
        </select>
      </div>

      <div className="input-container">
        <select
          value={productoSeleccionado.tipoMedicamento}
          onChange={(e) =>
            setProductoSeleccionado({ ...productoSeleccionado, tipoMedicamento: e.target.value })
          }
        >
          <option value="">Selecciona un tipo de medicamento</option>
          {tiposMedicamentos.map((tipo, index) => (
            <option key={index} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
      </div>

      <div className="input-container">
        <input
          type="number"
          placeholder="Cantidad a comprar"
          value={productoSeleccionado.cantidadCompra}
          onChange={(e) =>
            setProductoSeleccionado({
              ...productoSeleccionado,
              cantidadCompra: parseInt(e.target.value),
            })
          }
        />
      </div>

      <div className="input-container">
        <input
          type="number"
          placeholder="Precio por unidad"
          value={productoSeleccionado.precioUnidad}
          onChange={(e) =>
            setProductoSeleccionado({
              ...productoSeleccionado,
              precioUnidad: parseFloat(e.target.value),
            })
          }
        />
      </div>

      <div className="input-container">
        <input
          type="number"
          placeholder="Precio de venta sugerido"
          value={productoSeleccionado.precioVentaSugerido}
          onChange={(e) =>
            setProductoSeleccionado({
              ...productoSeleccionado,
              precioVentaSugerido: parseFloat(e.target.value),
            })
          }
        />
      </div>

      <div className="input-container">
        <button onClick={agregarProducto}>Agregar Producto</button>
      </div>

      <div className="fullscreen-table-wrapper">
        <div className="table-container">
          <DataTable
            title="Lista de Productos"
            columns={columns}
            data={data}
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
