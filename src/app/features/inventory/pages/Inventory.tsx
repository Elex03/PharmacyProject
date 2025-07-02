import { Table } from "../../../shared/components/layout/Table/Table.tsx";
import InventoryActions from "../../../shared/components/forms/actions/Actions.tsx";
import Layout from "../../../shared/components/layout/layout.tsx";
import { getFilteredInventory } from "../utils/filterInventoryData.ts";
import { useFetchInventory } from "../hooks/useFetchInventory.ts";
import { ToggleSection } from "../../../shared/components/exportDocuments/TongleSelection.tsx";
import "../../../shared/components/layout/Table/Table.css";
import "../../../shared/styles/shared.css";
import CreateMedicineModal from "../components/layout/createMedicine/createMedicine.tsx";
import { useInventoryState, useModal } from "../hooks/useInventoryState.ts";
import ReturnProduct from "./ReturnProduct.tsx";
import EditMedicine from "../components/layout/createMedicine/editMedicine.tsx";
import { Bounce, ToastContainer } from "react-toastify";
import ApexChart from "../../../shared/components/charts/apexChart.tsx";
import { useFetchMedicineStock } from "../../../shared/hooks/useFetchGeneral.ts";

const Inventario = () => {
  const { inventoryData, headers } = useFetchInventory();

  const modalEdit = useModal();
  const {
    searchTerm,
    sortOrder,
    stockFilter,
    itemsPerPage,
    modal,
    secondModal,
    selectedItemId,
    setItemsPerPage,
    handleSearch,
    handleSort,
    handleStockFilter,
    setSelectedItemId,
    selectedSymptom,
    handleSymptomChange,
  } = useInventoryState();

  const onOpenModal = (id: number) => {
    setSelectedItemId(id);
    modalEdit.onOpen();
  };

  const filteredData = getFilteredInventory(
    inventoryData,
    searchTerm,
    stockFilter,
    sortOrder,
    selectedSymptom ? [selectedSymptom] : []
  );

  const { medicineStock } = useFetchMedicineStock();

  return (
    <Layout title="Inventario" headerButton={true}>
      <ToggleSection
        title="información"
        onToggle={(visible) => setItemsPerPage(visible ? 10 : 20)}
      >
        <p style={{ fontSize: "0.8rem", padding: "0 10px" }}>
          Aquí puedes gestionar el inventario de productos farmacéuticos.
          <br />
          Puedes registrar nuevos productos, actualizar la información de los
          existentes y realizar un seguimiento del stock disponible.
        </p>

        {/* Agregar la clase step-chart para el tour */}
        <div className="chart-container step-chart">
          <ApexChart data={medicineStock} />
        </div>
      </ToggleSection>

      <InventoryActions
        linkButton={{
          ButtonLabel: "Agregar medicamento",
          type: "modal",
        }}
        filterBySymptom={true}
        enableSecondButton={true}
        handleSymptomChange={handleSymptomChange}
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
        onOpenModal={onOpenModal}
      />
      {modalEdit.isOpen && selectedItemId !== null && (
        <EditMedicine
          selectedMedicineId={selectedItemId}
          onClose={modalEdit.onClose}
        />
      )}
      {modal.isOpen && <CreateMedicineModal onClose={modal.onClose} />}
      {secondModal.isOpen && (
        <ReturnProduct onClose={secondModal.onClose} medicines={[]} />
      )}

      <ToastContainer transition={Bounce} />
    </Layout>
  );
};

export default Inventario;
