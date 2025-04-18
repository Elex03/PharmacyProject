import { useState, useEffect } from "react";
import "../pages/Inventory.css";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import PieChart from "../components/charts/piChart";
import type { ColumnDefinition } from "../types.d.ts";

import { Table } from "../components/layout/Table/Table";
import PharmacyApi from "../api/PharmacyApi";
import '../css/index.css'


type InventoryItem = {
  id: string;
  descripcion: string;
  stock: number;
  distribuidor: string;
  fechaVencimiento: string;
  precioCompra: number;
  precioVenta: number;
  empresa: string;
  EstadoMedicamentoExpirado: string;
  utilidadBruta: number;
  imagenUrl: string;
};

const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleStockFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStockFilter(e.target.value);
  };

  const [headers, setHeaders] = useState<ColumnDefinition<InventoryItem>[]>([]);
  const [data, setData] = useState<InventoryItem[]>([]);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataP = await PharmacyApi.get("/inventory/getInventoryData").then(
          (response) => {
            if (!response) throw new Error("Error al cargar los datos");
            return response.data;
          }
        );
        console.log(PharmacyApi.getUri());
        const { headers: hdrs, data } = dataP;

        const mappedHeaders = hdrs.map(
          (h: { key: string; header: string }) => ({
            key: h.key as keyof InventoryItem,
            header: h.header,
            isNumeric:
              h.key ===
              ["stock", "precioCompra", "precioVenta"].find((k) => k === h.key),
            isDate: h.key === "fechaVencimiento",
          })
        );

        setHeaders(mappedHeaders);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
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

  const filteredData = data
    .map((item) => ({
      ...item,
      estadoStock:
        Number(item.stock) === 0
          ? "Agotado"
          : Number(item.stock) <= 10
          ? "Próximo a agotarse"
          : "Disponible",
      stockStatusElement: getStockStatus(Number(item.stock)),
    }))
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter((item) => {
      if (!stockFilter) return true;
      if (stockFilter === "disponible" && Number(item.stock) > 10) return true;
      if (
        stockFilter === "proximo" &&
        Number(item.stock) <= 10 &&
        Number(item.stock) > 0
      )
        return true;
      if (stockFilter === "agotado" && Number(item.stock) === 0) return true;
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
        <button
          onClick={() => setShowInfo((prev) => !prev)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            alignItems: "center",
            gap: "5px",
            marginLeft: "24px",
          }}
        >
          {showInfo ? "Ocultar" : "Mostrar"} información
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: showInfo ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div
          style={{
            maxHeight: showInfo ? 300 : 0,
            overflow: "hidden",
            transition: "max-height 0.5s ease",
          }}
        >
          <p style={{ fontSize: "0.8rem", marginLeft: 30 }}>
            Aquí puedes gestionar el inventario de productos farmacéuticos.
            <br />
            Puedes registrar nuevos productos, actualizar la información de los
            existentes y realizar un seguimiento del stock disponible.
            <br />
          </p>
          <PieChart />
        </div>
        <div className="actions">
          <input
            type="text"
            placeholder="Buscar"
            className="search-bar"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className="filter-dropdown"
            value={sortOrder}
            onChange={handleSort}
          >
            <option value="">Filtrar por nombre</option>
            <option value="A-Z">A - Z</option>
          </select>

          {/* Nuevo filtro por estado de stock */}
          <select
            className="filter-dropdown"
            value={stockFilter}
            onChange={handleStockFilter}
          >
            <option value="">Filtrar por estado de stock</option>
            <option value="disponible">Disponible</option>
            <option value="proximo">Próximo a agotarse</option>
            <option value="agotado">Agotado</option>
          </select>

          <Link to={"/compras"} className="link">
            <button className="button-action">Registrar pedido</button>
          </Link>
        </div>
        <center>
          <Table
            columns={headers}
            data={filteredData}
            itemsPerPage={5}
            //  linkColumn={{
            //   label: "Ver detalles",
            //   path: "/producto",
            //   idKey: "id",
            // }}
          />
        </center>
      </div>
    </div>
  );
};

export default Inventario;
