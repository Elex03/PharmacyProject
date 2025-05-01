import { useState } from "react";
import { Table } from "../../../shared/components/layout/Table/Table";
import '../../../shared/styles/shared.css'
import InventoryActions from "../../../shared/components/forms/actions/Actions";
import ApexChart from "../../../shared/components/charts/apexChart";
import { getFilteredDistributors } from "../utils/filterDistributorData";
import Layout from "../../../shared/components/layout/layout";
import { useFetchDistributors } from "../hooks/useFetchDistributors";


const Distributors = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const { distributorData, headers } = useFetchDistributors();


  // const [itemsPerPage, setItemsPerPage] = useState(5);
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };


  const filteredData = getFilteredDistributors(
    distributorData,
    searchTerm,
    sortOrder
  );

  return (
    <Layout title="Distribuidores" totalItems={filteredData.length}>
      <div className="chart-container">
        <ApexChart />
      </div>
      <InventoryActions
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
    </Layout>
  );
};

export default Distributors;
