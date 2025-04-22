import { useState, useEffect } from "react";
import "./OrderHistory.css";
import "../css/index.css"
import BarChart from "../components/charts/BarChart";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "../components/layout/Table/Table";
import { ToggleSection } from "../feature/TongleSelection";
import { ColumnDefinition } from "../types";



const OrderHistory = () => {
  const navigator = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [headers, setHeaders] = useState<ColumnDefinition<OrderHistory>[]>([]);
  interface OrderHistory {
    id: number;
    empresa: string;
    fechaPedido: string;
    estado: string;
    total: number;
    nombre: string;
    [key: string]: unknown;
  }

  const [data, setData] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const [dataBar, setDataBar] = useState<number[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    fetch(`http://localhost:3000/apiFarmaNova/orders/details/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los datos");
        return response.json();
      })
      .then((data) => {
        const {data: dataP , headers: hdrs} = data
        const mappedHeaders = hdrs.map(
          (h: { key: string; header: string }) => ({
            key: h.key as keyof OrderHistory,
            header: h.header,
            isNumeric:
              h.key ===
              ["stock", "precioCompra", "precioVenta"].find((k) => k === h.key),
            isDate: h.key === "fechaVencimiento",
          })
        );
        
        setData(dataP);
        setHeaders(mappedHeaders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Error al cargar los datos.");
        setLoading(false);
      });

    fetch(`http://localhost:3000/apiFarmaNova/orders/getOrderGraph/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los datos");
        return response.json();
      })
      .then((data) => {
        setDataBar(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Error al cargar los datos.");
        setLoading(false);
      });
  }, [id]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredData = data
    .filter((orderhistory) =>
      Object.values(orderhistory).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.nombre.localeCompare(b.nombre);
      return 0;
    });

  return (
    <div className="orderhistory-page" style={{ width: "90vw" }}>
      <div style={{ width: "95%" }}>
        <div className="arrow-container" onClick={() => navigator(-1)}>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
        <h2 style={{ marginLeft: 30 }}>Historial de pedidos</h2>
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
          <BarChart data={dataBar} />
        </ToggleSection>
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
          <button className="button-action">
            Levantar pedido
          </button>
        </div>
        <center>
          {loading ? (
            <p>Cargando datos...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <Table
              data={filteredData}
              columns={headers}
              itemsPerPage={itemsPerPage}
              linkColumn={{
                label: "Ver detalles",
                path: "/historial",
                idKey: "id",
                type: "modal",
              }}
            />
          )}
        </center>
      </div>
    </div>
  );
};

export default OrderHistory;
