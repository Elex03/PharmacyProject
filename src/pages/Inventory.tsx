import { useState, useEffect } from "react";
import "../pages/Inventory.css";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import type { ColumnDefinition } from "../types.d.ts";

import { Table } from "../components/layout/Table/Table";

import "../css/index.css";
import { getInventoryData } from "../api/components/Iventory.ts";

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
  // const [itemsPerPage, setItemsPerPage] = useState(5);

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
  // const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    getInventoryData().then((res) => {
      const { headers: hdrs, data } = res.data;

      const mappedHeaders = hdrs.map((h: { key: string; header: string }) => ({
        key: h.key as keyof InventoryItem,
        header: h.header,
        isNumeric:
          h.key ===
          ["stock", "precioCompra", "precioVenta"].find((k) => k === h.key),
        isDate: h.key === "fechaVencimiento",
      }));
      setHeaders(mappedHeaders);
      setData(data);
    });
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
        <div
          style={{
            width: "95%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <center>

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 0",
            }}
          >
            {/* Título + Filtros */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {/* Título grande */}
              <h1 style={{ fontWeight: "bold", fontSize: "28px", margin: 0 }}>
                Inventario
              </h1>
    
              {/* Filtros y Buscador */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <select
                  className="filter-dropdown"
                  value={sortOrder}
                  onChange={handleSort}
                >
                  <option value="">Filtrar por nombre</option>
                  <option value="A-Z">A - Z</option>
                </select>
    
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
    
                <input
                  type="text"
                  placeholder="Buscar rápido"
                  className="search-bar"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
    
            <Link to={"/compras"} className="link" style={{ textDecoration: "none" }}>
              <button
                className="button-action"
              >
                + Agregar producto
              </button>
            </Link>
          </div>
    
          <Table
            columns={headers}
            data={filteredData}
            itemsPerPage={5}
            linkColumn={{
              label: "✏️ Editar",
              path: "/producto",
              idKey: "id",
              type: "modal",
            }}
            />
            </center>
        </div>
      </div>
    );
    
};

export default Inventario;
