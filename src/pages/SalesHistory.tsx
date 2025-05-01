import { useState } from "react";
import { Table } from "../components/layout/Table/Table";
import Example from "../components/charts/Chart";
// import { Link } from "react-router-dom";
import "./SalesHistory.css";
import "../css/index.css";
import { ToggleSection } from "../feature/TongleSelection";
import FacturaModal from "../components/layout/factura";
import InventoryActions from "../components/forms/actions/Actions";
import { useFetchSalesChart, useFetchSalesHistory } from "../hooks/useFetchSalesHistory";

const SalesHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla si el modal está abierto o cerrado
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null); // Guarda el ID de la venta seleccionada

  const {salesHistoryData, headers} = useFetchSalesHistory();
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

  const filteredData = salesHistoryData
    .filter((SalesHistory) =>
      Object.values(SalesHistory).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "A-Z") return a.cliente.localeCompare(b.cliente);
      return 0;
    });

  return (
    <div className="page-container">
      <h2 style={{textAlign: 'initial'}}>Historial de ventas</h2>
      <div style={{ width: "100%", height: "400" }}>
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
      </div>
      <InventoryActions
        labelTitle="Historial de ventas"
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
    </div>
  );
};

export default SalesHistory;
