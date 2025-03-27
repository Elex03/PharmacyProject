import React, { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import Select from "react-select";

interface Producto {
  id: number;
  descripcion: string;
  distribuidor: string;
  cantidad: number;
  precio: number;
  precioCompra: number;
  subtotal: number;
  maxCantidad: number;
  presentacion: string;
  categoria: string;
  imagen: File | null;
}


interface CategoryItem {
  id: string;
  value: string;
  label: string;
}
interface DistributorItem {
  id: string;
  value: string;
  label: string;
}

const Shopping: React.FC = () => {
  const [totalCompra, setTotalCompra] = useState<number>(0);
  const [productosTemporal, setProductosTemporal] = useState<Producto[]>([]); // Productos temporalmente agregados
  const [productosSeleccionados, setProductosSeleccionados] = useState<Producto[]>([]); // Productos guardados al final
  const [productoNuevo, setProductoNuevo] = useState({
    descripcion: "",
    precioVenta: 0,
    precioCompra: 0,
    distribuidor: "",
    categoria: "",
    imagen: null as File | null,
  });
  const [presentacionSeleccionada, setPresentacionSeleccionada] = useState<string>("");
  const [cantidadTabletas, setCantidadTabletas] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [distributors, setDistributors] = useState<DistributorItem[]>([]);
  useEffect(() => {
    const total = productosTemporal.reduce((acc, item) => acc + item.subtotal, 0);
    setTotalCompra(total);
  }, [productosTemporal]);

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductoNuevo({ ...productoNuevo, imagen: e.target.files[0] });
    }
  };
  useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/inventory/getCategories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar los datos");
      }
      return response.json();
    })
    .then((data: CategoryItem[]) => {
      setCategories(data); 
    });
  }, [])

  useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/distributors/List")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar los datos");
      }
      return response.json();
    })
    .then((data: DistributorItem[]) => {
      setDistributors(data); 
    });
  }, [])


  const handleAgregarProductoNuevo = () => {
    if (
      !productoNuevo.descripcion ||
      productoNuevo.precioVenta <= 0 ||
      productoNuevo.precioCompra <= 0 ||
      !productoNuevo.distribuidor ||
      !productoNuevo.categoria
    ) {
      setErrorMessage("Por favor, completa todos los campos requeridos.");
      return;
    }

    setErrorMessage(""); // Limpiar mensaje de error si todos los campos están completos

    const cantidad = presentacionSeleccionada === "Tabletas" ? cantidadTabletas : 1;

    // Validar que la cantidad no sea mayor a la cantidad máxima
    if (cantidad <= 0 || cantidad > 10) {
      setErrorMessage("La cantidad debe estar entre 1 y 10.");
      return;
    }

    // Crear el objeto Producto temporal
    const nuevoProducto: Producto = {
      id: new Date().getTime(), // Usamos el timestamp como ID único
      descripcion: productoNuevo.descripcion,
      distribuidor: productoNuevo.distribuidor,
      cantidad,
      precio: productoNuevo.precioVenta,
      precioCompra: productoNuevo.precioCompra,
      subtotal: productoNuevo.precioVenta * cantidad,
      maxCantidad: 10, // Definir la cantidad máxima que se puede agregar
      presentacion: presentacionSeleccionada,
      categoria: productoNuevo.categoria,
      imagen: productoNuevo.imagen,
    };

    // Actualizar la lista de productos temporalmente
    setProductosTemporal((prevProductos) => [...prevProductos, nuevoProducto]);

    // Limpiar los campos después de agregar el producto
    setProductoNuevo({ descripcion: "", precioVenta: 0, precioCompra: 0, distribuidor: "", categoria: "", imagen: null });
    setPresentacionSeleccionada("");
    setCantidadTabletas(1);
  };

  const handleCantidadChange = (id: number, newCantidad: number) => {
    if (newCantidad <= 0 || newCantidad > 10) return; // Evitar que la cantidad sea negativa, cero o mayor a 10

    const updatedProductos = productosTemporal.map((producto) =>
      producto.id === id
        ? { ...producto, cantidad: newCantidad, subtotal: producto.precio * newCantidad }
        : producto
    );
    setProductosTemporal(updatedProductos);
  };

  const handleGuardarVenta = async () => {
    // Crear el objeto FormData con los productos seleccionados
    const formData = new FormData();
    productosTemporal.forEach((producto) => {
      formData.append("productos[]", JSON.stringify({
        nombre: producto.descripcion,
        distribuidor: producto.distribuidor,
        cantidad: producto.cantidad,
        precioVenta: producto.precio,
        precioCompra: producto.precioCompra,
        subtotal: producto.subtotal,
        categoria: producto.categoria,
        presentacion: producto.presentacion,
      }));

      if (producto.imagen) {
        formData.append("imagenes[]", producto.imagen);
      }
    });

    // Enviar la solicitud a la API para guardar la venta
    try {
      const response = await fetch("http://localhost:3000/apiFarmaNova/inventory/medicine", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Venta guardada correctamente:", data);

        // Almacenamos los productos permanentemente en la lista de productos seleccionados
        setProductosSeleccionados([...productosSeleccionados, ...productosTemporal]);

        // Limpiar la lista temporal después de guardar
        setProductosTemporal([]);
        setTotalCompra(0); // Resetear el total después de guardar
      } else {
        const errorData = await response.json();
        console.error("Error al guardar la venta:", errorData);
        setErrorMessage("Hubo un error al guardar la venta.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setErrorMessage("Hubo un error al conectar con el servidor.");
    }
  };

  const columns: TableColumn<Producto>[] = [
    { name: "Descripción", selector: (row) => row.descripcion, sortable: true },
    { name: "Distribuidor", selector: (row) => row.distribuidor, sortable: true },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad.toString(),
      cell: (row) => (
        <input
          type="number"
          value={row.cantidad}
          onChange={(e) => handleCantidadChange(row.id, parseInt(e.target.value, 10))}
          min="1"
          max={row.maxCantidad}
        />
      ),
      sortable: true,
    },
    { name: "Precio Venta", selector: (row) => `$${row.precio.toFixed(2)}`, sortable: true },
    { name: "Precio Compra", selector: (row) => `$${row.precioCompra.toFixed(2)}`, sortable: true },
    { name: "Subtotal", selector: (row) => `$${row.subtotal.toFixed(2)}`, sortable: true },
    { name: "Categoría", selector: (row) => row.categoria, sortable: true },
  ];

  return (
    <div>
      <h2>Realizar venta</h2>
      <Select
        options={distributors}
        onChange={(option) => setProductoNuevo({ ...productoNuevo, distribuidor: option?.value || "" })}
        placeholder="Selecciona Distribuidor"
      />
      <Select
        options={categories}
        onChange={(option) => setProductoNuevo({ ...productoNuevo, categoria: option?.value || "" })}
        placeholder="Selecciona Categoría"
      />

      <input
        type="text"
        placeholder="Descripción del producto"
        value={productoNuevo.descripcion}
        onChange={(e) => setProductoNuevo({ ...productoNuevo, descripcion: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio de Compra"
        value={productoNuevo.precioCompra}
        onChange={(e) => setProductoNuevo({ ...productoNuevo, precioCompra: parseFloat(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Precio de Venta"
        value={productoNuevo.precioVenta}
        onChange={(e) => setProductoNuevo({ ...productoNuevo, precioVenta: parseFloat(e.target.value) })}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidadTabletas}
        onChange={(e) => setCantidadTabletas(parseInt(e.target.value, 10))}
      />

      <input type="file" onChange={handleImagenChange} />
      <button onClick={handleAgregarProductoNuevo}>Agregar Producto</button>

      {/* Mostrar mensaje de error si hay campos vacíos */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <DataTable title="Lista de Productos" columns={columns} data={productosTemporal} />
      <h3>Total: ${totalCompra.toFixed(2)}</h3>
      <button onClick={handleGuardarVenta}>Guardar Venta</button>
    </div>
  );
};

export default Shopping;
