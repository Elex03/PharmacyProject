import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import "./Distributors.css";
import ApexChart from "../components/charts/apexChart";
import Formulario from "../components/forms/Distributors";
import { ColumnDefinition } from "../types";
import { Table } from "../components/layout/Table/Table";
import '../css/index.css'

interface DistributorItem {
  id: number;
  nombre: string;
  empresa: string;
  telefono: string;
  ultimoPedido: string;
  [key: string]: unknown; // <-- añade esta línea
}

const Distributors = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [distributorsData, setDistributorsData] = useState<DistributorItem[]>(
    []
  );
  const [headers, setHeaders] = useState<ColumnDefinition<DistributorItem>[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/distributors/")
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
            key: h.key as keyof DistributorItem,
            header: h.header,
            isNumeric:
              h.key ===
              ["stock", "precioCompra", "precioVenta"].find((k) => k === h.key),
            isDate: h.key === "fechaVencimiento",
          })
        );

        setHeaders(mappedHeaders);
        setDistributorsData(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const filteredData = distributorsData
    .filter((distributor) =>
      Object.values(distributor).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.nombre.localeCompare(b.nombre);
      return 0;
    });

  return (
    <div className="distributors-page" style={{ width: "90vw" }}>
      <div style={{ width: "90%" }}>
        <h2>Distribuidores</h2>
        <ApexChart />
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

          <button
            className="button-action"
            onClick={() => setIsModalOpen(true)}
          >
            Crear un proveedor
          </button>

          {/* Agregar AnimatePresence para animación del modal */}
          <AnimatePresence>
            {isModalOpen && <Formulario setIsOpen={setIsModalOpen} />}
          </AnimatePresence>
        </div>
        <center>
          <Table
            columns={headers}
            data={filteredData}
            itemsPerPage={5}
            linkColumn={{
              label: "Ver detalles",
              path: "/historial",
              idKey: "id",
            }}
          />
        </center>
      </div>
    </div>
  );
};

export default Distributors;
