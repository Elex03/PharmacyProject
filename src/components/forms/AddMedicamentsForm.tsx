import { useEffect, useState } from "react";
import { Select, Input, Button, message, Table } from "antd";
import NewMedicationModal from "./NewMedicamentsModal";
import distributors from "../../data/distributorsData.json";
import "./AddMedicamentsForm.css";

export const AddMedicamentsForm = () => {
  const [selectedMedication, setSelectedMedication] = useState<string | null>(
    null
  );
  const [selectedDistributor, setSelectedDistributor] = useState<Option>({
    id: 0,
    value: "Selecciona un distribuidor",
    label: "Selecciona un distribuidor",
  });
  const [selectedCompressedForm, setSelectedCompressedForm] = useState<Option>({
    id: 0,
    value: "Selecciona una forma comprimida",
    label: "Selecciona una forma comprimida",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [precioVenta, setPrecioVenta] = useState<string>("");
  const [precioCompra, setPrecioCompra] = useState<string>("");
  const [codigoBarra, setCodigoBarra] = useState<string>("");

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [cantidad, setCantidad] = useState("");
  const [cantidadTabletas, setCantidadTabletas] = useState("");
  const [unidadesPorTableta, setUnidadesPorTableta] = useState("");

  const [compressedForm, setCompressedForm] = useState<Option[]>([]);

  interface Medicamento {
    key: string;
    medicamento: string;
    distribuidor: number;
    formaComprimida: number;
    codigoBarra: string;
    precioVenta: string;
    precioCompra: string;
    cantidad: string;
    unidadesPorTableta?: string;
    imageFile: File;
  }

  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [medicamentList, setMedicamentList] = useState<Option[]>([]);

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
    const compressed_Form =  compressedForm.find((d) => d.value === value);
    if (compressed_Form) {
      setSelectedCompressedForm({
        id: compressed_Form.id,
        value: compressed_Form.value,
        label: compressed_Form.label,
      });
    }
  };

  const handleSelectChangeDistributor = (value: string) => {
    const distributor = distributors.find((d) => d.value === value);
    if (distributor) {
      setSelectedDistributor({
        id: distributor.id,
        value: distributor.value,
        label: distributor.label,
      });
    }
  };

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMedicationAdded = () => {
    fetch("http://localhost:3000/apiFarmaNova/inventory/getMedicine")
      .then((response) => response.json())
      .then((data) => {
        const updatedOptions = data.map(
          (item: { id: number; label: string }) => ({
            value: item.id.toString(),
            label: item.label,
            id: item.id,
          })
        );
        setMedicamentList(updatedOptions); // Actualiza el estado del Select
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  const columns = [
    {
      title: "Medicamento",
      dataIndex: "medicamento",
      key: "medicamento",
    },
    {
      title: "Distribuidor",
      dataIndex: "distribuidor",
      key: "distribuidor",
    },
    {
      title: "Forma Comprimida",
      dataIndex: "formaComprimida",
      key: "formaComprimida",
    },
    {
      title: "Código de Barras",
      dataIndex: "codigoBarra",
      key: "codigoBarra",
    },
    {
      title: "Precio de Venta",
      dataIndex: "precioVenta",
      key: "precioVenta",
    },
    {
      title: "Precio de Compra",
      dataIndex: "precioCompra",
      key: "precioCompra",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad",
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_: unknown, record: Medicamento) => (
        <Button
          type="link"
          onClick={() => {
            setMedicamentos(
              medicamentos.filter((item) => item.key !== record.key)
            );
            message.success("Medicamento eliminado de la tabla.");
          }}
        >
          Eliminar
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/inventory/getMedicine")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los datos");
        return response.json();
      })
      .then((data) => {
        const opts = data.map((item: { id: number; label: string }) => ({
          value: item.id.toString(),
          label: item.label,
          id: item.id,
        }));
        setMedicamentList(opts);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    fetch("http://localhost:3000/apiFarmaNova/inventory/getCompressedforms")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los datos");
        return response.json();
      })
      .then((data) => {
        const opts = data.map((item: { id: number; label: string }) => ({
          value: item.id.toString(),
          label: item.label,
          id: item.id,
        }));
        setCompressedForm(opts);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleAddToTable = () => {
    if (
      !selectedMedication ||
      !selectedDistributor ||
      !codigoBarra ||
      !precioVenta ||
      !precioCompra ||
      (selectedCompressedForm.value === "tableta" &&
        (!cantidadTabletas || !unidadesPorTableta)) ||
      (selectedCompressedForm.value !== "tableta" && !cantidad)
    ) {
      message.error("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const newMedicamento = {
      key: new Date().toISOString(), // Usamos el timestamp como clave única
      medicamento: selectedMedication,
      distribuidor: selectedDistributor.id,
      formaComprimida: selectedCompressedForm.id,
      codigoBarra,
      precioVenta,
      precioCompra,
      cantidad:
        selectedCompressedForm.value === "tableta"
          ? cantidadTabletas
          : cantidad,
      unidadesPorTableta,
      imageFile: imageFile as File, // Aseguramos que imageFile no sea null
    };

    setMedicamentos([...medicamentos, newMedicamento]);
    message.success("Medicamento agregado a la tabla.");
  };

  const handleSubmit = async () => {
    if (medicamentos.length === 0) {
      message.error("No hay medicamentos para enviar.");
      return;
    }

    const formData = new FormData();

    medicamentos.forEach((medicamento, index) => {
      formData.append(`idMedicamento[${index}]`, medicamento.medicamento);
      formData.append(
        `idDistribuidor[${index}]`,
        medicamento.distribuidor.toString()
      );
      formData.append(
        `formaComprimida[${index}]`,
        medicamento.formaComprimida.toString() || ""
      );
      formData.append(`codigoBarra[${index}]`, medicamento.codigoBarra);
      formData.append(`precioVenta[${index}]`, medicamento.precioVenta);
      formData.append(`precioCompra[${index}]`, medicamento.precioCompra);
      formData.append(`cantidad[${index}]`, medicamento.cantidad);
      if (medicamento.formaComprimida.toString() === "tableta") {
        formData.append(
          `cantidadTabletas[${index}]`,
          medicamento.unidadesPorTableta || ""
        );
      }
      formData.append(`image`, medicamento.imageFile);
    });

    try {
      const response = await fetch(
        "http://localhost:3000/apiFarmaNova/inventory/medicine",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Error en el envío");
      message.success("Medicamentos enviados con éxito");
      setMedicamentos([]);
    } catch {
      message.error("Error al enviar los datos");
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
          options={medicamentList}
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
          />
          <Input
            type="text"
            placeholder="Código de Barras"
            value={codigoBarra}
            required
            onChange={(e) => setCodigoBarra(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Select
            allowClear
            showSearch
            options={distributors} // Asegúrate de que distributors esté bien estructurado
            style={{ width: "100%", marginBottom: "10px" }}
            onChange={handleSelectChangeDistributor}
            placeholder="Seleccionar distribuidor"
            value={selectedDistributor.value}
          />
          <Input
            required
            type="text"
            placeholder="Precio Venta"
            value={precioVenta}
            onChange={(e) => setPrecioVenta(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Input
            required
            type="text"
            placeholder="Precio Compra"
            value={precioCompra}
            onChange={(e) => setPrecioCompra(e.target.value)}
            style={{ marginBottom: "10px" }}
          />

          <Select
            allowClear
            showSearch
            options={compressedForm}
            style={{ width: "100%", marginBottom: "10px" }}
            onChange={handleSelectChangeCompressedForm}
            value={selectedCompressedForm.value}
            placeholder="Seleccionar forma comprimida"
          />
          {selectedCompressedForm.value === "tableta" ? (
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
              type="number"
              placeholder="Cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
          )}

          <Button onClick={handleAddToTable} type="primary">
            Agregar a la tabla
          </Button>
        </div>
      )}
      <Table columns={columns} dataSource={medicamentos} />
      <Button
        style={{ marginTop: "20px" }}
        type="primary"
        onClick={handleSubmit}
      >
        Enviar medicamentos
      </Button>
      <NewMedicationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onMedicationAdded={handleMedicationAdded}
      />
    </div>
  );
};
