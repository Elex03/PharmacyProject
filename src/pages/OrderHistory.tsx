import { useState, useEffect } from "react";
import "./OrderHistory.css";
import BarChart from "../components/charts/BarChart";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "../components/layout/Table/Table";

const OrderHistory = () => {
  const navigator = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
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
  const dataBar = [45, 60, 80, 50, 90, 100, 75, 85, 95, 110, 120, 130];

  useEffect(() => {
    fetch(`http://localhost:3000/apiFarmaNova/orders/details/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los datos");
        return response.json();
      })
      .then((data) => {
        setData(data.data);
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
        <BarChart data={dataBar} />;
        <div className="orderhistory-actions">
          <input
            type="text"
            placeholder="Buscar"
            className="search-bar-orderhistory"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select
            className="filter-dropdown-orderhistory"
            value={sortOrder}
            onChange={handleSort}
          >
            <option value="">Filtrar por nombre</option>
            <option value="A-Z">A - Z</option>
          </select>
          <button className="register-button-orderhistory">
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
            columns={[
              { header: "Empresa", key: "empresa" },
              { header: "Fecha de pedido", key: "fechaPedido" },
              { header: "Estado", key: "estado" },
              { header: "Total", key: "total" },
            ]}
            itemsPerPage={5}
            linkColumn={{
              label: "Ver detalles",
              path: "/historial",
              idKey: "id",
            }}
            />
          )}
        </center>
      </div>
    </div>
  );
};

export default OrderHistory;
