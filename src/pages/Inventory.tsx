import { useState, useEffect } from "react";
import InventoryTable from "../components/layout/InventoryTable";
import "./Inventory.css";
import PieAnimation from "../components/charts/piChart";
import { Link } from "react-router-dom";

interface InventoryItem {
  id: string;
  descripcion: string;
  inventario: number;
  stock: string;
  distribuidor: string;
  vencimiento: string;
  imagen: string; // Campo para la URL de la imagen
  [key: string]: string | number;
}

const Inventario = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [data, setData] = useState<InventoryItem[]>([]); // Datos del inventario

  // Obtener los datos con fetch
  useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/inventory/getInventory") // Cambia esta URL por la ubicación de tu archivo JSON o API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data: InventoryItem[]) => {
        setData(data); // Actualizamos el estado con los datos recibidos
      });
  }, []);
  // Manejo del input de búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Manejo del filtro de ordenamiento
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  // Filtrado de datos
  const filteredData = data
    .filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "A-Z")
        return a.descripcion.localeCompare(b.descripcion);
      return 0;
    });

  return (
    <div className="inventory-page">
      <h2>Inventario</h2>
      <p className="p">
        Grafica que muestra las categorias de productos mas vendidos
      </p>
      <PieAnimation />
      <div className="inventory-actions">
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
        <Link to={"/compras"}>
          <button className="register-button">Registrar pedido</button>
        </Link>
      </div>
      <InventoryTable data={filteredData} />
    </div>
  );
};

export default Inventario;
