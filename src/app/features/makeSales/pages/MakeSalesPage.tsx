import { useState } from "react";

import { ResumeSaleLayout } from "../components/layout/ResumeSaleLayout";
import Actions from "../../../shared/components/forms/actions/Actions";
import Layout from "../../../shared/components/layout/layout";

import "../../../shared/styles/shared.css";
import "../css/makeSales.css";
import { Table } from "../components/Table";
import { useFetchInventory } from "../../inventory/hooks/useFetchInventory";

export interface dataPreviewTable {
  id: number;
  descripcion: string;
  precioVenta: number;
  stock: number;
}

const Distributors = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [data, setData] = useState<dataPreviewTable[]>([]);

  const { inventoryData, headers } = useFetchInventory();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleData = (element: dataPreviewTable, eliminated: boolean) => {
    console.log(eliminated);
    setData((prev) => {
      const existingItem = prev.find((item) => item.id === element.id);
      if (existingItem && eliminated) {
        const dataC = prev.filter(
          (registro) => registro.id !== existingItem.id
        );
        return dataC;
      }
      if (existingItem) {
        return prev.map((item) =>
          item.id === element.id ? { ...item, cantidad: item.stock + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            ...element,
            cantidad: 1,
          },
        ];
      }
    });
  };

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
          <Table
            itemsPerPage={10}
            data={inventoryData}
            columns={headers}
            handleData={handleData}
          />
        </Layout>
      </div>

      <div className="resumeSale">
        <ResumeSaleLayout data={data} handleData={handleData} />
      </div>
    </div>
  );
};

export default Distributors;
