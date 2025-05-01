import { useState } from "react";
import "./Distributors.css";
import { Table } from "../components/layout/Table/Table";
import "../css/index.css";
import InventoryActions from "../components/forms/actions/Actions";
import ApexChart from "../components/charts/apexChart";
import { useFetchDistributors } from "../hooks/useFetchDistributors";

const Distributors = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  // const [itemsPerPage, setItemsPerPage] = useState(5);

  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const {distributorData, headers} = useFetchDistributors();


  const filteredData = distributorData
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
    <div className="page-container">
      <div className="chart-container">
        <ApexChart />
      </div>
      {/* <div style={{ width: "95%" }}>
        <h2>Distribuidores</h2>
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

          <button
            className="button-action"
            onClick={() => setIsModalOpen(true)}
          >
            Crear un proveedor
          </button>

          <AnimatePresence>
            {isModalOpen && <Formulario setIsOpen={setIsModalOpen} />}
          </AnimatePresence>
        </div> */}
      <InventoryActions
        labelTitle="Distribuidores"
        sortOrder={sortOrder}
        searchTerm={searchTerm}
        handleSort={handleSort}
        handleSearch={handleSearch}
      />
      
      <Table
        columns={headers}
        data={filteredData}
        itemsPerPage={5}
        linkColumn={{
          label: "🔍 Ver detalles",
          path: "/historial",
          idKey: "id",
          type: "linked",
        }}
      />
    </div>
  );
};

export default Distributors;
