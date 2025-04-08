import { useState, useEffect } from "react";
import "./OrderHistory.css";
import OrderHistoryTable from "../components/layout/OrderHistoryTable";
import BarChart from "../components/charts/BarChart";
import { useNavigate, useParams } from "react-router-dom";

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
  }

  const [data, setData] = useState<OrderHistory[]>([]); // Estado para almacenar los datos de la API
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const { id } = useParams();
  const dataBar = [45, 60, 80, 50, 90, 100, 75, 85, 95, 110, 120, 130];

  // 📌 Petición a la API para obtener datos
  useEffect(() => {
    fetch(`https://farmanova-api.onrender.com/apiFarmaNova/orders/details/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los datos");
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Error al cargar los datos.");
        setLoading(false);
      });
  }, []);

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
          {/* 📌 Mensajes de carga y error */}
          {loading ? (
            <p>Cargando datos...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <OrderHistoryTable data={filteredData} />
          )}
        </center>
      </div>
    </div>
  );
};

export default OrderHistory;
