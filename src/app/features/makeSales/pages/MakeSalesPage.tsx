import { useState } from "react";

import { ResumeSaleLayout } from "../components/layout/ResumeSaleLayout";
import Actions from "../../../shared/components/forms/actions/Actions";
import Layout from "../../../shared/components/layout/layout";

import "../../../shared/styles/shared.css";
import "../css/makeSales.css";
import { Table } from "../components/Table";
import { useCart } from "../hooks/useCart";
import { useFetchgetMakeSales } from "../hooks/useFetchMakeSales";


const Distributors = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const { makeSalesData, headers } = useFetchgetMakeSales();

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
            linkButton={{
              ButtonLabel: "Escanear",
              type: "modal",
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
        <ResumeSaleLayout />
      </div>
    </div>
  );
};

export default Distributors;
