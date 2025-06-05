import { useState } from "react";

import { ResumeSaleLayout } from "../components/layout/ResumeSaleLayout";
import Actions from "../../../shared/components/forms/actions/Actions";
import Layout from "../../../shared/components/layout/layout";

import "../../../shared/styles/shared.css";
import "../css/makeSales.css";
import { useCart } from "../hooks/useCart";
import { useFetchgetMakeSales } from "../hooks/useFetchMakeSales";
import { ToastContainer } from "react-toastify";
import { Table } from "../components/Table";

const Distributors = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [dataChanged, setDataChanged] = useState(false);

  const { makeSalesData, headers } = useFetchgetMakeSales(dataChanged);

  const { items: selectedItems } = useCart();

  const selectedIds = new Set(selectedItems.map((item) => item.id));

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredData = makeSalesData.filter(
    (item) => !selectedIds.has(item.id)
  );

  return (
    <div className="container-makeSale">
      <div className="main-content">
        <Layout title="Realizar venta">
          <Actions
            filterBySymptom={true}
            linkButton={{
              ButtonLabel: "Escanear",
              type: "scanner",
            }}
            sortOrder={sortOrder}
            searchTerm={searchTerm}
            handleSort={handleSort}
            handleSearch={handleSearch}
          />
          <Table itemsPerPage={10} data={filteredData} columns={headers} />
        </Layout>
      </div>

      <div className="resumeSale">
        <ResumeSaleLayout setDataChanged={setDataChanged}/>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Distributors;
