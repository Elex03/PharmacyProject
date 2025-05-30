import { useState } from "react";
import { Table } from "../../../shared/components/layout/Table/Table";
import "../../../shared/styles/shared.css";
import InventoryActions from "../../../shared/components/forms/actions/Actions";
import ApexChart from "../../../shared/components/charts/apexChart";
import { getFilteredDistributors } from "../utils/filterDistributorData";
import Layout from "../../../shared/components/layout/layout";
import { useFetchDistributors } from "../hooks/useFetchDistributors";
import { ToggleSection } from "../../../shared/components/exportDocuments/TongleSelection";
import CreateDistributorModal from "../components/CreateDistributorModal";
import { ToastContainer } from "react-toastify";
import { useFetchMedicineStock } from "../../../shared/hooks/useFetchGeneral";

const Distributors = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const { distributorData, headers } = useFetchDistributors();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [itemsPerPage, setItemsPerPage] = useState(5);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const filteredData = getFilteredDistributors(
    distributorData,
    searchTerm,
    sortOrder
  );

  const { medicineStock } = useFetchMedicineStock();

  return (
    <Layout title="Distribuidores" headerButton={true}>
      <ToggleSection title="Información">
        <p style={{ fontSize: "0.8rem", padding: "0 10px" }}>
          Administra de forma sencilla a los distribuidores de productos
          farmacéuticos desde esta sección.
          <br />
          Puedes añadir nuevos distribuidores, actualizar sus datos y verificar
          su actividad dentro del sistema.
        </p>
        <div className="chart-container">
          <ApexChart data={medicineStock} horizontal={true} />
        </div>
      </ToggleSection>

      <InventoryActions
        onOpenModal={onOpenModal}
        linkButton={{
          ButtonLabel: "Crear distribuidor",
          type: "modal",
        }}
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

      {isModalOpen && <CreateDistributorModal setIsOpen={closeModal} />}
      <ToastContainer />
    </Layout>
  );
};

export default Distributors;
