import { useState, useEffect } from "react";
import { Table } from "../components/layout/Table/Table";
import Example from "../components/charts/Chart";
import { Link } from "react-router-dom";
import { ColumnDefinition } from "../types";
import { getSalesPerWeek } from "../api/components/Sales";

import "./SalesHistory.css";
import "../css/index.css";
import { ToggleSection } from "../feature/TongleSelection";

interface SalesItem {
  id: number;
  cliente: string;
  fechaventa: string;
  total: number;
  [key: string]: unknown;
}

interface DayInventory {
  dia: string;
  esta_semana: number;
  anterior: number;
}
const SalesHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [data, setData] = useState<SalesItem[]>([]);
  const [headers, setHeaders] = useState<ColumnDefinition<SalesItem>[]>([]);
  const [dataGraphic, setDdataGraphic] = useState<DayInventory[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  useEffect(() => {
    getSalesPerWeek()
      .then((response) => {
        setDdataGraphic(response);
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/orders/getSales")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((dataP) => {
        const { headers: hdrs, data } = dataP;

        const mappedHeaders = hdrs.map(
          (h: { key: string; header: string }) => ({
            key: h.key as keyof SalesItem,
            header: h.header,
            isNumeric:
              h.key ===
              ["stock", "precioCompra", "precioVenta"].find((k) => k === h.key),
            isDate: h.key === "fechaVencimiento",
          })
        );

        setHeaders(mappedHeaders);
        setData(data);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredData = data
    .filter((SalesHistory) =>
      Object.values(SalesHistory).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.cliente.localeCompare(b.cliente);
      return 0;
    });

  return (
    <div className="SalesHistory-page" style={{ width: "90vw" }}>
      <div style={{ width: "95%" }}>
        <h2>Historial de ventas</h2>
        <ToggleSection
          title="información"
          onToggle={(visible) => setItemsPerPage(visible ? 5 : 10)}
        >
          <p style={{ fontSize: "0.8rem", marginLeft: 30 }}>
            Aquí puedes gestionar el inventario de productos farmacéuticos.
            <br />
            Puedes registrar nuevos productos, actualizar la información de los
            existentes y realizar un seguimiento del stock disponible.
          </p>

          <Example data={dataGraphic} />
        </ToggleSection>
        <div className="actions">
          <input
            type="text"
            placeholder="Buscar por nombre"
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

          <Link to={"/compras"} className="link">
            <button className="button-action">Registrar pedido</button>
          </Link>
        </div>
        <center>
          <Table
            columns={headers}
            data={filteredData}
            itemsPerPage={itemsPerPage}
            linkColumn={{
              label: "📄 Ver factura",
              path: "/bill",
              idKey: "id",
            }}
          />
        </center>
      </div>
    </div>
  );
};

export default SalesHistory;
