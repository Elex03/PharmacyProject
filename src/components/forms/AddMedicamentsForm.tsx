import { useState } from "react";
import { Select, Input, Button, message } from "antd";
import selectMedicaments from "../../data/selectMedicaments.json";
import NewMedicationModal from "./NewMedicamentsModal";
import distributors from "../../data/distributorsData.json";
import compressed_forms from "../../data/compressed_forms.json";

export const AddMedicamentsForm = () => {
  const [selectedMedication, setSelectedMedication] = useState<string | null>(
    null
  );
  const [selectedDistributor, setSelectedDistributor] = useState<string | null>(
    null
  );
  const [selectedCompressedForm, setCompressedForm] = useState<string | null>(
    null
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [precioVenta, setPrecioVenta] = useState<string>("");
  const [precioCompra, setPrecioCompra] = useState<string>("");
  const [codigoBarra, setCodigoBarra] = useState<string>("");

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Estados para inputs adicionales

  const [cantidad, setCantidad] = useState("");
  const [cantidadTabletas, setCantidadTabletas] = useState("");
  const [unidadesPorTableta, setUnidadesPorTableta] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
    }
  };
  const handleSelectChange = (value: string) => {
    setSelectedMedication(value);
  };
  const handleSelectChangeCompressedForm = (value: string) => {
    setCompressedForm(value);
  };

  const handleSelectChangeDistributor = (value: string) => {
    setSelectedDistributor(value);
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!selectedMedication || !selectedDistributor || !codigoBarra || !precioVenta || !precioCompra || (selectedCompressedForm === "tableta" && (!cantidadTabletas || !unidadesPorTableta)) || (selectedCompressedForm !== "tableta" && !cantidad)) {
      message.error("Por favor, completa todos los campos obligatorios.");
      return;
    }
    if (!selectedDistributor) {
      const formData = new FormData();
      if (imageFile) formData.append("image", imageFile);
      formData.append("medicamento", selectedMedication || "");
      formData.append("distribuidor", selectedDistributor || "");
      formData.append("formaComprimida", selectedCompressedForm || "");
      formData.append("codigoBarra", codigoBarra);
      formData.append("precioVenta", precioVenta);
      formData.append("precioCompra", precioCompra);
      if (selectedCompressedForm !== "tableta") {
        formData.append("cantidad", cantidad);
      }
      if (selectedCompressedForm === "tableta") {
        formData.append("cantidadTabletas", cantidadTabletas);
        formData.append("unidadesPorTableta", unidadesPorTableta);
      }

      console.log("FormData contents:", Object.fromEntries(formData.entries()));
      try {
        const response = await fetch("/api/medicamentos", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) throw new Error("Error en el envío");
        message.success("Medicamento agregado con éxito");
      } catch {
        message.error("Error al enviar los datos");
      }
    }
  };

  return (
    <div className="add-medicaments-form">
      <h2>Agregar Medicamentos</h2>
      <label>Si ya tienes un medicamento de ese tipo, selecciónalo:</label>
      <div style={{ flexDirection: "row", display: "flex", gap: "10px" }}>
        <Select
          aria-required
          showSearch
          allowClear
          options={selectMedicaments}
          style={{ width: "100%" }}
          placeholder="Buscar o seleccionar un medicamento"
          onChange={handleSelectChange}
          value={selectedMedication || undefined}
          filterOption={(input, option) =>
            option?.value.toLowerCase().includes(input.toLowerCase()) || false
          }
        />
        <Button>Agregar</Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <label>Si no tienes un medicamento de ese tipo, agrégalo:</label>
        <Button className="add-medicament-button" onClick={handleAddClick}>
          Agregar Medicamento
        </Button>
      </div>

      {selectedMedication && (
        <div style={{ marginTop: "20px" }}>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "10px" }}
            required
          />
          <Input
            type="text"
            placeholder="Código de Barras"
            value={codigoBarra}
            required
            onChange={(e) => setCodigoBarra(e.target.value)}
            style={{ marginBottom: "10px" }}
            aria-required
          />
          <Select
            aria-required
            allowClear
            showSearch
            options={distributors}
            style={{ width: "100%", marginBottom: "10px" }}
            onChange={handleSelectChangeDistributor}
            placeholder="Seleccionar distribuidor"
            value={selectedDistributor || undefined}
            filterOption={(input, option) =>
              option?.value.toLowerCase().includes(input.toLowerCase()) || false
            }
          />

          {/* Mostrar input si hay una forma comprimida seleccionada */}

          <Select
            aria-required
            allowClear
            showSearch
            options={compressed_forms}
            style={{ width: "100%", marginBottom: "10px" }}
            onChange={handleSelectChangeCompressedForm}
            placeholder="Seleccionar forma comprimida"
            value={selectedCompressedForm || undefined}
            filterOption={(input, option) =>
              option?.value.toLowerCase().includes(input.toLowerCase()) || false
            }
          />
          {selectedCompressedForm && (
            <div style={{ marginTop: "10px" }}>
              {selectedCompressedForm === "tableta" ? (
                <>
                  <Input
                    required
                    type="number"
                    placeholder="Cantidad de tabletas"
                    value={cantidadTabletas}
                    onChange={(e) => setCantidadTabletas(e.target.value)}
                    style={{ marginBottom: "10px" }}
                  />
                  <Input
                    required
                    aria-required
                    type="number"
                    placeholder="Unidades por tableta"
                    value={unidadesPorTableta}
                    onChange={(e) => setUnidadesPorTableta(e.target.value)}
                    style={{ marginBottom: "10px" }}
                  />
                </>
              ) : (
                <Input
                  required
                  aria-required
                  type="number"
                  placeholder="Cantidad"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
              )}
            </div>
          )}

          <Input
            type="number"
            aria-required
            required
            placeholder="Precio de venta"
            value={precioVenta}
            onChange={(e) => setPrecioVenta(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Input
            type="number"
            aria-required
            required
            placeholder="Precio de compra"
            value={precioCompra}
            onChange={(e) => setPrecioCompra(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </div>
      )}

      <Button onClick={handleSubmit}>Agregar</Button>
      <NewMedicationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
