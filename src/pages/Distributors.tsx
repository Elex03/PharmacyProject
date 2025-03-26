import { useState, useEffect } from "react";
import DistributorsTable from "../components/layout/DistributorTable";
import "./Distributors.css";
import ApexChart from "../components/charts/apexChart";

interface DistributorItem {
  id: number;
  nombre: string;
  empresa: string;
  telefono: string;
  ultimoPedido: string;
}

const Distributors = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [distributorsData, setDistributorsData] = useState<DistributorItem[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  // Fetching data from the API
  useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/distributors/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data: DistributorItem[]) => {
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
    <div className="distributors-page">
      <h2>Distribuidores</h2>
      <ApexChart />
      <div className="distributors-actions">
        <input
          type="text"
          placeholder="Buscar"
          className="search-bar"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select className="filter-dropdown" value={sortOrder} onChange={handleSort}>
          <option value="">Filtrar por nombre</option>
          <option value="A-Z">A - Z</option>
        </select>
        <button className="register-button">Crear un proveedor</button>
      </div>
      <DistributorsTable data={filteredData} />
    </div>
  );
};

export default Distributors;
