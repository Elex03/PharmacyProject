import React from "react";
import "./DashBoard.css";
import {
  FaMoneyBill,
  FaArrowAltCircleUp,
  FaChartLine,
  FaBoxes,
} from "react-icons/fa"; // Importa los íconos que necesitas

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as AreaTooltip,
  Legend as AreaLegend,
  ResponsiveContainer as AreaResponsiveContainer,
} from "recharts";

const inventoryData = [
  {
    id: 1,
    descripcion: "Paracetamol 500mg",
    precioVenta: 10.0,
    precioCompra: 5.0,
    utilidad: 5.0,
  },
  {
    id: 2,
    descripcion: "Ibuprofeno 400mg",
    precioVenta: 15.0,
    precioCompra: 8.0,
    utilidad: 7.0,
  },
  {
    id: 3,
    descripcion: "Amoxicilina 500mg",
    precioVenta: 22.0,
    precioCompra: 12.0,
    utilidad: 10.0,
  },
  {
    id: 4,
    descripcion: "Loratadina 10mg",
    precioVenta: 9.0,
    precioCompra: 4.0,
    utilidad: 5.0,
  },
];

const data = [
  { name: "Costo", value: 20000, color: "#e6cefe" }, // Rojo
  { name: "Ingreso", value: 40000, color: "#64bbf1" }, // Verde azulado
];

const areaData = [
  { month: "Ene", year: 2023, costo: 11000, ingreso: 19000 },
  { month: "Feb", year: 2023, costo: 16000, ingreso: 24000 },
  { month: "Mar", year: 2023, costo: 24000, ingreso: 41000 },
  { month: "Abr", year: 2023, costo: 15500, ingreso: 26500 },
  { month: "May", year: 2023, costo: 18000, ingreso: 29000 },
  { month: "Jun", year: 2023, costo: 12000, ingreso: 21000 },
];

const utilidadData = [
  { month: "Ene", year: 2023, utilidad: 19000 - 11000 },
  { month: "Feb", year: 2023, utilidad: 24000 - 16000 },
  { month: "Mar", year: 2023, utilidad: 41000 - 24000 },
  { month: "Abr", year: 2023, utilidad: 26500 - 15500 },
  { month: "May", year: 2023, utilidad: 29000 - 18000 },
  { month: "Jun", year: 2023, utilidad: 21000 - 12000 },
];

const dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="top-boxes">
        <div className="box">
          <div className="box-content">
            <div className="big-text">20 mil</div>
            <div className="small-text">Costo</div>
            <div className="icon-container">
              <FaMoneyBill />
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <div className="big-text">40 mil</div>
            <div className="small-text">Ingreso</div>
            <div className="icon-container">
              <FaArrowAltCircleUp />
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <div className="big-text">20 mil</div>
            <div className="small-text">Utilidad Bruta</div>
            <div className="icon-container">
              <FaChartLine />
            </div>
          </div>
        </div>
        <div className="box">
          <div className="box-content">
            <div className="big-text">4.5 mil</div>
            <div className="small-text">Total Stock</div>
            <div className="icon-container">
              <FaBoxes />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <div className="half">
          <div className="sub-half">
            <div className="sub-half-vertical">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={70}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="sub-half-vertical">
              <div className="sub-half-vertical2">
                <svg className="background-chart" viewBox="0 0 300 150">
                  <polygon
                    points="0,150 0,110 50,90 100,100 150,60 200,40 250,70 300,30 300,150"
                    fill="rgba(50, 205, 50, 0.5)"
                  />
                  <polyline
                    points="0,110 50,90 100,100 150,60 200,40 250,70 300,30"
                    fill="none"
                    stroke="limegreen"
                    strokeWidth="4"
                  />
                </svg>
              </div>
              <div className="big-text2">20 mil</div>
            </div>
          </div>
          <div className="sub-half">
            <div className="inventory-container">
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th>Precio Venta</th>
                    <th>Precio Compra</th>
                    <th>Utilidad bruta</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.length > 0 ? (
                    inventoryData.map((item) => (
                      <tr key={item.id} className="elements">
                        <td>{item.descripcion}</td>
                        <td>{item.precioVenta}</td>
                        <td>{item.precioCompra}</td>
                        <td>{item.utilidad}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        style={{ textAlign: "center", color: "gray" }}
                      >
                        No se encontraron resultados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="half">
          <div className="sub-half">
            <AreaResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="costo"
                  stroke="#e6cefe"
                  fill="#e6cefe"
                  fillOpacity={0.4}
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="ingreso"
                  stroke="#e4f2ff"
                  fill="#e4f2ff"
                  fillOpacity={0.4}
                  strokeWidth={3}
                />
                <AreaTooltip />
                <AreaLegend />
              </AreaChart>
            </AreaResponsiveContainer>
          </div>
          <div className="sub-half">
            <AreaResponsiveContainer width="100%" height="100%">
              <AreaChart data={utilidadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="utilidad"
                  stroke="#ffdabd"
                  fill="#ffdabd"
                  fillOpacity={0.4}
                  strokeWidth={3}
                />
                <AreaTooltip />
                <AreaLegend />
              </AreaChart>
            </AreaResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
