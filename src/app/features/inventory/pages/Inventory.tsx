import { Table } from "../../../shared/components/layout/Table/Table.tsx";
import InventoryActions from "../../../shared/components/forms/actions/Actions.tsx";
import Layout from "../../../shared/components/layout/layout.tsx";
import { getFilteredInventory } from "../utils/filterInventoryData.ts";
import { useFetchInventory } from "../hooks/useFetchInventory.tsx";
import { ToggleSection } from "../../../shared/components/exportDocuments/TongleSelection.tsx";
import "../../../shared/components/layout/Table/Table.css";
import "../../../shared/styles/shared.css";
import { RadarChart } from "../../../shared/components/charts/RadarChart.tsx";
import CreateMedicineModal from "../components/layout/createMedicine/createMedicine.tsx";
import { useInventoryState } from "../hooks/useInventoryState.tsx";

const Inventario = () => {
  const { inventoryData, headers } = useFetchInventory();

  const {
    searchTerm,
    sortOrder,
    stockFilter,
    itemsPerPage,
    isModalOpen,
    setItemsPerPage,
    handleSearch,
    handleSort,
    handleStockFilter,
    onOpenModal,
    closeModal,
  } = useInventoryState();

  const filteredData = getFilteredInventory(
    inventoryData,
    searchTerm,
    stockFilter,
    sortOrder
  );

  return (
      <Layout title="Inventario">
        <ToggleSection
          title="información"
          onToggle={(visible) => setItemsPerPage(visible ? 5 : 10)}
        >
          <p style={{ fontSize: "0.8rem", padding: "0 10px" }}>
            Aquí puedes gestionar el inventario de productos farmacéuticos.
            <br />
            Puedes registrar nuevos productos, actualizar la información de los
            existentes y realizar un seguimiento del stock disponible.
          </p>

          <div className="chart-container">
            <RadarChart />
          </div>
        </ToggleSection>
        <InventoryActions
          linkButton={{
            ButtonLabel: "Agregar medicamento",
            type: "modal",
          }}
          onOpenModal={onOpenModal}
          sortOrder={sortOrder}
          stockFilter={stockFilter}
          searchTerm={searchTerm}
          handleSort={handleSort}
          handleStockFilter={handleStockFilter}
          handleSearch={handleSearch}
        />
        <Table
          columns={headers}
          data={filteredData}
          itemsPerPage={itemsPerPage}
          linkColumn={{
            label: "✏️ Editar",
            path: "/producto",
            idKey: "id",
            type: "modal",
          }}
        />

        {isModalOpen && <CreateMedicineModal onClose={closeModal} />}
      </Layout>
  );
};

export default Inventario;