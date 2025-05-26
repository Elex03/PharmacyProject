import { Table } from "../../../shared/components/layout/Table/Table.tsx";
import InventoryActions from "../../../shared/components/forms/actions/Actions.tsx";
import Layout from "../../../shared/components/layout/layout.tsx";
import { getFilteredInventory } from "../utils/filterInventoryData.ts";
import { useFetchInventory } from "../hooks/useFetchInventory.ts";
import { ToggleSection } from "../../../shared/components/exportDocuments/TongleSelection.tsx";
import "../../../shared/components/layout/Table/Table.css";
import "../../../shared/styles/shared.css";
import { RadarChart } from "../../../shared/components/charts/RadarChart.tsx";
import CreateMedicineModal from "../components/layout/createMedicine/createMedicine.tsx";
import { useInventoryState } from "../hooks/useInventoryState.ts";
import ReturnProduct from "../../../shared/components/layout/ReturnProduct.tsx";

const Inventario = () => {
  const { inventoryData, headers } = useFetchInventory();

  const {
    searchTerm,
    sortOrder,
    stockFilter,
    itemsPerPage,
    modal,
    secondModal,
    setItemsPerPage,
    handleSearch,
    handleSort,
    handleStockFilter,
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
          onToggle={(visible) => setItemsPerPage(visible ? 20 : 30)}
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
          enableSecondButton={true}
          onOpenSecondModal={secondModal.onOpen}
          onOpenModal={modal.onOpen}
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

        {modal.isOpen && <CreateMedicineModal onClose={modal.onClose} />}
        {secondModal.isOpen && <ReturnProduct onClose={secondModal.onClose} medicines={[]} />}
      </Layout>
  );
};

export default Inventario;