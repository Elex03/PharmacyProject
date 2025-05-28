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
import { useFetchMedicineSelect } from "../../../shared/hooks/useFetchGeneral";

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

  const { distributorData: distributors } = useFetchDistributors();

  const { medicineSelect } = useFetchMedicineSelect();



  return (
    <Layout title="Distribuidores">
      <ToggleSection title="información">
        <p style={{ fontSize: "0.8rem", padding: "0 10px" }}>
          Aquí puedes gestionar el inventario de productos farmacéuticos.
          <br />
          Puedes registrar nuevos productos, actualizar la información de los
          existentes y realizar un seguimiento del stock disponible.
        </p>
        <div className="chart-container">
          <ApexChart />
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

      <select>
        {distributors.map((res) => (
          <option value={res.id}> {res.nombre + res.empresa  }</option>
        ))}
      </select>

      <select>
        {medicineSelect.map((res) => (
          <option value={res.value}>{res.label + res.precio}</option>
        ))}
      </select>

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
