import { useState, useEffect } from "react";
import InventoryTable from "../components/layout/InventoryTable";
import "../pages/Inventory.css";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import PieChart from "../components/charts/piChart";
import ReturnProduct from "../components/layout/ReturnProduct";
interface InventoryItem {
  id: number;
  descripcion: string;
  stock: string;
  inventario: number;
  distribuidor: string;
  vencimiento: string;
  nombreComercial: string;
  nombreGenerico: string;
  formaFarmaceutica: string;
  concentracion: string;
  presentacion: string;
  laboratorio: string;
  precioCompra: number;
  precioVenta: string;
  margenUtilidad: number;
}
const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [data, setData] = useState<InventoryItem[]>([]);

  // input de búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // manejo del filtro de ordenamiento
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  // manejo del filtro de estado de stock
  const handleStockFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStockFilter(e.target.value);
  };
  useEffect(() => {
    fetch("https://farmanova-api.onrender.com/apiFarmaNova/medicines/")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los datos");
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  // estado de stock
  const getStockStatus = (cantidad: number) => {
    if (cantidad === 0)
      return (
        <span>
          <FaTimesCircle style={{ color: "red" }} /> Agotado
        </span>
      );
    if (cantidad <= 10)
      return (
        <span>
          <FaExclamationTriangle style={{ color: "orange" }} /> Próximo a
          agotarse
        </span>
      );
    return (
      <span>
        <FaCheckCircle style={{ color: "green" }} /> Disponible
      </span>
    );
  };

  // Filtrado de datos
  const filteredData = data
    .map((item) => ({
      ...item,
      stock:
        Number(item.inventario) === 0
          ? "Agotado"
          : Number(item.inventario) <= 10
          ? "Próximo a agotarse"
          : "Disponible",
      stockStatusElement: getStockStatus(Number(item.inventario)),
    }))
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter((item) => {
      if (!stockFilter) return true;
      if (stockFilter === "disponible" && Number(item.inventario) > 10)
        return true;
      if (
        stockFilter === "proximo" &&
        Number(item.inventario) <= 10 &&
        Number(item.inventario) > 0
      )
        return true;
      if (stockFilter === "agotado" && Number(item.inventario) === 0)
        return true;
      return false;
    })
    .sort((a, b) => {
      if (sortOrder === "A-Z")
        return a.descripcion.localeCompare(b.descripcion);
      return 0;
    });

  return (
    <div className="inventory-page" style={{ width: "90vw" }}>
      <div style={{ width: "95%" }}>
        <h2>Inventario</h2>
        <p style={{ fontSize: "0.8rem", marginLeft: 30 }}>
          Aquí puedes gestionar el inventario de productos farmacéuticos.
          <br />
          Puedes registrar nuevos productos, actualizar la información de los
          existentes y realizar un seguimiento del stock disponible.
          <br />
          </p>
        <PieChart />
        <div className="inventory-actions">
          <input
            type="text"
            placeholder="Buscar"
            className="buscar-bar"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className="filter-dropdown-nombre"
            style={{ backgroundColor: "white" }}
            value={sortOrder}
            onChange={handleSort}
          >
            <option value="">Filtrar por nombre</option>
            <option value="A-Z">A - Z</option>
          </select>

          {/* Nuevo filtro por estado de stock */}
          <select
            className="filter-dropdown-stock"
            value={stockFilter}
            onChange={handleStockFilter}
          >
            <option value="">Filtrar por estado de stock</option>
            <option value="disponible">Disponible</option>
            <option value="proximo">Próximo a agotarse</option>
            <option value="agotado">Agotado</option>
          </select>

          <Link to={"/compras"} className="link">
            <button className="registro-button">Registrar pedido</button>
          </Link>

          <ReturnProduct
          
            medicines={data.map((item) => ({
              id: item.id,
              nombreComercial: item.nombreComercial,
            }))}
          />
        </div>
        <center>
          <InventoryTable data={filteredData} />
        </center>
      </div>
    </div>
  );
};

export default Inventario;
