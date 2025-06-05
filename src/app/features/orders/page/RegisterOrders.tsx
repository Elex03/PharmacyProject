import { useState } from "react";
import Layout from "../../../shared/components/layout/layout";
import { Table } from "../../../shared/components/layout/Table/Table";

import "../styles/registerOrders.css";

import "../../../shared/styles/shared.css";

const Pedidos = () => {
  const headers = [
    { header: "Descripción", key: "nombre" },
    { header: "Laboratorio", key: "laboratorio" },
    { header: "Cantidad", key: "cantidad" },
    { header: "Precio", key: "precio" },
    { header: "Subtotal", key: "subtotal" },
  ];

  const [filteredData] = useState([
    {
      nombre: "Paracetamol 500mg",
      laboratorio: "Mechnikov Nicaragua",
      cantidad: 10,
      precio: "$ 1.25",
      subtotal: "$ 12.50",
    },
    {
      nombre: "Ibuprofeno 400mg",
      laboratorio: "Roval Nicaragua",
      cantidad: 5,
      precio: "$ 2.00",
      subtotal: "$ 10.00",
    },
    {
      nombre: "Amoxicilina 500mg",
      laboratorio: "Xolotlan Pharma",
      cantidad: 12,
      precio: "$ 1.80",
      subtotal: "$ 21.60",
    },
    {
      nombre: "Omeprazol 20mg",
      laboratorio: "Farinter Nicaragua",
      cantidad: 20,
      precio: "$ 0.75",
      subtotal: "$ 15.00",
    },
    {
      nombre: "Loratadina 10mg",
      laboratorio: "Laboratorios Ramos",
      cantidad: 8,
      precio: "$ 1.50",
      subtotal: "$ 12.00",
    },
    {
      nombre: "Metformina 850mg",
      laboratorio: "Mechnikov Nicaragua",
      cantidad: 15,
      precio: "$ 1.10",
      subtotal: "$ 16.50",
    },
    {
      nombre: "Salbutamol Inhalador",
      laboratorio: "Roval Nicaragua",
      cantidad: 6,
      precio: "$ 3.50",
      subtotal: "$ 21.00",
    },
    {
      nombre: "Azitromicina 500mg",
      laboratorio: "Xolotlan Pharma",
      cantidad: 4,
      precio: "$ 4.00",
      subtotal: "$ 16.00",
    },
    {
      nombre: "Diclofenaco Sódico 50mg",
      laboratorio: "Farinter Nicaragua",
      cantidad: 10,
      precio: "$ 1.30",
      subtotal: "$ 13.00",
    },
  ]);

  return (
    <Layout title="Registrar Subpedido">
      <div className="acyions1">
        <div className="pedido">
          <div>
            <div>
              <label className="customer-name-label">
                Nombre del proveedor
              </label>
            </div>
            <input
              type="text"
              className="customer-name-input"
              placeholder="Buscar proveedor"
            />
            <button className="button-action">Registrar nuevo</button>
          </div>
          <div className="right">
            <button className="button-action">Registrar nuevo</button>
          </div>

          <div>
            <label className="customer-name-label">
              Registrar medicamento existente
            </label>
          </div>

          <div>
            <input
              type="text"
              className="customer-name-input"
              placeholder="Buscar medicamento"
            />
            <input
              type="text"
              className="customer-name-input"
              placeholder="Ingresar codigo de barra"
            />
            <button className="button-action">Registrar nuevo</button>
          </div>
          <Table
            columns={headers}
            data={filteredData}
            itemsPerPage={8}
            linkColumn={{
              label: "✏️, 🗑️",
              idKey: "nombre",
              path: "/producto",
              type: "modal",
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Pedidos;