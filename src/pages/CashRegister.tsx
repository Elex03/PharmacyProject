import React, { useState, useEffect } from 'react';
import './CashRegister.css';
import DataTable, { TableColumn } from 'react-data-table-component';

interface Producto {
  id: number;
  descripcion: string;
  distribuidor: string;
  cantidad: number;
  precio: number;
  subtotal: number;
  maxCantidad: number; // Agregar el campo maxCantidad
}

const CashRegister: React.FC = () => {
  const [data, setData] = useState<Producto[]>([]);

  useEffect(() => {
    fetch('/data.json') // Si el JSON está en `public`
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error('Error cargando datos:', error));
  }, []);

  // Definimos la función handleCantidadChange dentro del componente
  const handleCantidadChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newCantidad = parseInt(e.target.value);

    // Obtener el producto para obtener su maxCantidad
    const product = data.find((item) => item.id === id);
    if (product && newCantidad > product.maxCantidad) {
      alert(`La cantidad máxima permitida para este producto es ${product.maxCantidad}`);
      return;
    }

    // Actualizamos la cantidad y el subtotal
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, cantidad: newCantidad } : item
    );

    const updatedDataWithSubtotal = updatedData.map((item) => ({
      ...item,
      subtotal: item.precio * item.cantidad,
    }));

    setData(updatedDataWithSubtotal);
  };

  // Definir columnas dentro del componente para que puedan acceder a la función handleCantidadChange
  const columns: TableColumn<Producto>[] = [
    { name: 'Descripción', selector: (row) => row.descripcion, sortable: true },
    { name: 'Distribuidor', selector: (row) => row.distribuidor, sortable: true },
    {
      name: 'Cantidad',
      selector: (row) => row.cantidad,
      sortable: true,
      right: true,
      cell: (row) => (
        <input
          type="number"
          value={row.cantidad}
          onChange={(e) => handleCantidadChange(e, row.id)} // Usamos handleCantidadChange aquí
          className="input-cantidad"
          min="0" // No permitir números negativos
          max={row.maxCantidad} // Establecer el límite máximo desde el JSON
        />
      ),
    },
    {
      name: 'Precio',
      selector: (row) => row.precio,
      sortable: true,
      right: true,
      format: (row) => `$${row.precio.toFixed(2)}`,
    },
    {
      name: 'Subtotal',
      selector: (row) => row.subtotal,
      sortable: true,
      right: true,
      format: (row) => `$${row.subtotal.toFixed(2)}`,
    },
  ];

  return (
    <div>
      <h2>Cash Register</h2>
      <div className="fullscreen-table-wrapper">
        <div className="table-container">
          <DataTable
            title="Lista de Productos"
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            striped
            responsive
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 100px)"
          />
        </div>
      </div>
    </div>
  );
};

export default CashRegister;
