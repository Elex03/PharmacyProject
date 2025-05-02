import { useState } from "react";
import { Table } from "../../../shared/components/layout/Table/Table";
import Example from "../../../shared/components/charts/Chart";
import "../../../shared/styles/shared.css";
import { ToggleSection } from "../../../shared/components/exportDocuments/TongleSelection";
import FacturaModal from "../../../shared/components/layout/Bill/factura";
import InventoryActions from "../../../shared/components/forms/actions/Actions";
import {
  useFetchSalesChart,
  useFetchSalesHistory,
} from "../hooks/useFetchSalesHistory";
import Layout from "../../../shared/components/layout/layout";
import { getFilteredSalesHistory } from "../utils/filterSalesHistoryData";



const SalesHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null); // Guarda el ID de la venta seleccionada

  const { salesHistoryData, headers } = useFetchSalesHistory();
  const { salesHistoryDataChart } = useFetchSalesChart();

  const onOpenModal = (id: number) => {
    setSelectedItemId(id); // Establece el ID de la venta seleccionada
    setIsModalOpen(true); // Abre el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filteredData = getFilteredSalesHistory(
    salesHistoryData,
    searchTerm,
    sortOrder
  );
  return (
    <Layout title="Historial de ventas">
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

        <div style={{ marginRight: 20 }} className="chart-container">
          <Example data={salesHistoryDataChart} />
        </div>
      </ToggleSection>

      <InventoryActions
        inputLabel="+ Registrar venta"
        sortOrder={sortOrder}
        searchTerm={searchTerm}
        handleSort={handleSort}
        handleSearch={handleSearch}
      />
      <Table
        columns={headers}
        data={filteredData}
        itemsPerPage={itemsPerPage}
        linkColumn={{
          label: "📄 Ver factura",
          path: "/bill",
          idKey: "id",
          type: "modal",
        }}
        onOpenModal={onOpenModal}
      />
      {isModalOpen && selectedItemId !== null && (
        <FacturaModal
          selectedSaleId={selectedItemId} // Pasa el ID de la venta seleccionada
          onClose={closeModal}
        />
      )}
    </Layout>
  );
};

export default SalesHistory;
