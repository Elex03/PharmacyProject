import React, { useState, useEffect } from "react";
import "./CashRegister.css";
import DataTable, { TableColumn } from "react-data-table-component";
import { Button, Select, Modal, message } from "antd";

interface Producto {
  id: number;
  descripcion: string;
  empresa: string;
  cantidad: number;
  precio: number;
  subtotal: number;
  maxCantidad: number;
  requierePrescripcion: boolean;
}

const CashRegister: React.FC = () => {
  const [, setData] = useState<Producto[]>([]);
  const [totalCompra, setTotalCompra] = useState<number>(0);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState<
    Producto[]
  >([]);
  const [cedulaCliente, setCedulaCliente] = useState<string>("");
  const [selectedMedication, setSelectedMedication] = useState<string | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [productoPendiente, setProductoPendiente] = useState<Producto | null>(
    null
  );

  const [errorCedula, setErrorCedula] = useState<string | null>(null);

  const handleCedulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Eliminar cualquier caracter que no sea número o letra
    value = value.replace(/[^0-9A-Za-z]/g, "");

    // Expresión regular para validar y formatear la cédula
    const cedulaRegex = /^(\d{0,3})(\d{0,6})(\d{0,4})([A-Za-z]{0,1})$/;

    // Formatear el valor según el formato ###-######-###A
    const formattedCedula = value.replace(
      cedulaRegex,
      (_match, p1, p2, p3, p4) => {
        let result = p1 + (p1.length === 3 ? "-" : "") + p2;
        if (p2.length === 6) result += "-";
        result += p3 + p4;
        return result.toUpperCase();
      }
    );

    setCedulaCliente(formattedCedula);

    // Validar si el valor tiene el formato correcto
    const validCedula = /^(\d{3})-(\d{6})-(\d{4})([A-Z])$/;

    if (formattedCedula && !validCedula.test(formattedCedula)) {
      setErrorCedula("El formato de la cédula es incorrecto.");
    } else {
      setErrorCedula(null);
    }
  };

  const handleGuardarVenta = async () => {
    if (totalCompra === 0) {
      alert("No has registrado ningún medicamento");
      return;
    }
  
    const ventaData = {
      cliente: cedulaCliente || "", // Si no hay cédula, se envía una cadena vacía
      detalles: productosSeleccionados.map((producto) => ({
        id: producto.id,
        cantidad: producto.cantidad,
      })),
    };
  
    try {
      const response = await fetch(
        "http://localhost:3000/apiFarmaNova/medicines/createSales",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ventaData),
        }
      );
  
      if (response.ok) {
        message.success("Venta guardada con éxito");
        setProductosSeleccionados([]);
        setCedulaCliente("");
  
        // Recargar los medicamentos disponibles
        fetch("http://localhost:3000/apiFarmaNova/medicines/catalogMedicine")
          .then((response) => response.json())
          .then((json) => {
            const productosDisponibles = json.filter(
              (producto: { maxCantidad: number }) => Number(producto.maxCantidad) > 0
            );
            setData(productosDisponibles);
            setProductosFiltrados(productosDisponibles);
          })
          .catch((error) => {
            console.error("Error recargando datos:", error);
            message.error("Error al recargar los medicamentos");
          });
      } else {
        message.error("Error al guardar la venta");
      }
    } catch (error) {
      console.error("Error al realizar la venta:", error);
      message.error("Error al guardar la venta");
    }
  };
  
  useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/medicines/catalogMedicine")
      .then((response) => response.json())
      .then((json) => {
        const productosDisponibles = json.filter(
          (producto: { maxCantidad: number }) => producto.maxCantidad > 0
        );

        setData(productosDisponibles);
        setProductosFiltrados(productosDisponibles);
      })
      .catch((error) => console.error("Error cargando datos:", error));
  }, []);
  useEffect(() => {
    const total = productosSeleccionados.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );
    setTotalCompra(total);
  }, [productosSeleccionados]);

  const agregarProducto = (producto: Producto) => {
    if (producto.requierePrescripcion) {
      setProductoPendiente(producto); // Guarda temporalmente el producto
      setModalVisible(true); // Muestra el modal
      return;
    }
    agregarProductoFinal(producto);
  };
  const handleCantidadChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newCantidad = parseInt(e.target.value, 10);

    setProductosSeleccionados((prevProductos) =>
      prevProductos.map((item) =>
        item.id === id
          ? {
              ...item,
              cantidad: newCantidad,
              subtotal: newCantidad * item.precio,
            }
          : item
      )
    );
  };
  const agregarProductoFinal = (producto: Producto) => {
    const productoExistente = productosSeleccionados.find(
      (item) => item.id === producto.id
    );
    let updatedData;

    if (productoExistente) {
      updatedData = productosSeleccionados.map((item) =>
        item.id === producto.id
          ? {
              ...item,
              cantidad: item.cantidad + 1,
              subtotal: (item.cantidad + 1) * item.precio,
            }
          : item
      );
    } else {
      updatedData = [
        ...productosSeleccionados,
        { ...producto, cantidad: 1, subtotal: producto.precio },
      ];
    }
    setProductosSeleccionados(updatedData);
    setSelectedMedication(null);
  };

  const handleConfirmarPrescripcion = () => {
    if (productoPendiente) {
      agregarProductoFinal(productoPendiente);
      setProductoPendiente(null);
    }
    setModalVisible(false);
  };

  const handleCancelarPrescripcion = () => {
    setProductoPendiente(null);
    setModalVisible(false);
    setSelectedMedication(null);
  };

  const eliminarProducto = (id: number) => {
    const updatedData = productosSeleccionados.filter((item) => item.id !== id);
    setProductosSeleccionados(updatedData);
  };

  const columns: TableColumn<Producto>[] = [
    { name: "Descripción", selector: (row) => row.descripcion, sortable: true },
    { name: "Proveedor", selector: (row) => row.empresa, sortable: true },
    {
      name: "Cantidad",
      selector: (row) => row.cantidad,
      sortable: true,
      right: true,
      cell: (row) => (
        <input
          type="number"
          min="1"
          max={row.maxCantidad}
          value={row.cantidad}
          onChange={(e) => handleCantidadChange(e, row.id)}
          style={{ width: "60px", textAlign: "center" }}
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
    <div className="container-main">
      <h2>Realizar venta</h2>
      <div className="customer-name-container">
        <label htmlFor="customerName" className="customer-name-label">
          Nombre del cliente (opcional):
        </label>
        <input
          type="text"
          id="customerName"
          value={cedulaCliente}
          onChange={handleCedulaChange}
          placeholder="Ingresa la cédula del cliente"
          className="customer-name-input"
        />
        {errorCedula && (
          <p style={{ marginLeft: 30, color: "red" }}>{errorCedula}</p>
        )}
      </div>
      {/* Select para buscar o seleccionar medicamento */}
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          marginLeft: 30,
          gap: 50,
        }}
      >
        <Select
          showSearch
          allowClear
          options={productosFiltrados
            .filter(
              (producto) =>
                !productosSeleccionados.some((p) => p.id === producto.id)
            ) // Filtra los seleccionados
            .map((producto) => ({
              value: producto.descripcion,
              label: producto.descripcion,
            }))}
          style={{ flex: 1 }}
          placeholder="Buscar o seleccionar un medicamento"
          onChange={(value) => {
            const productoSeleccionado = productosFiltrados.find(
              (p) => p.descripcion === value
            );
            if (productoSeleccionado) agregarProducto(productoSeleccionado);
          }}
          value={selectedMedication || undefined}
          filterOption={(input, option) =>
            option?.value.toLowerCase().includes(input.toLowerCase()) || false
          }
        />
        <Button>Escanear productos</Button>
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

      {/* Modal de Advertencia para Medicamentos con Prescripción */}
      <Modal
        title="⚠️ Requiere Prescripción Médica"
        open={modalVisible}
        onCancel={handleCancelarPrescripcion}
        footer={[
          <Button key="cancel" onClick={handleCancelarPrescripcion}>
            Cancelar
          </Button>,
          <Button
            key="confirm"
            type="primary"
            onClick={handleConfirmarPrescripcion}
          >
            Aceptar
          </Button>,
        ]}
      >
        <p>
          El medicamento <strong>{productoPendiente?.descripcion}</strong>{" "}
          requiere una prescripción médica.
        </p>
        <p>¿Deseas continuar con la venta?</p>
      </Modal>
    </div>
  );
};

export default CashRegister;
