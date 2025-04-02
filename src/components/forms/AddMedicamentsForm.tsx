import { Key, useEffect, useState } from "react";
import {
  Select,
  Input,
  Button,
  message,
  Table,
  DatePicker,
  Checkbox,
} from "antd";
import NewMedicationModal from "./NewMedicamentsModal";
import "./AddMedicamentsForm.css";
import dayjs from "dayjs";
import axios from "axios";

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
  const [distributors, setDistributors] = useState<Option[]>([]);
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
    requiere: boolean;
    fechaVencimiento: string;
  }

  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [medicamentList, setMedicamentList] = useState<Option[]>([]);
  const [purchaseExpiration, setPurchaseExpiration] = useState<string>("");
  const [showMedicationSelector, setShowMedicationSelector] =
    useState<boolean>(false);
  const [requierePrescripcion, setRequierePrescripcion] = useState(false);

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
    const compressed_Form = compressedForm.find((d) => d.value === value);
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
  const handleDateChange = (
    date: dayjs.Dayjs | null,
    key: string,
    dateString: string
  ) => {
    setMedicamentos((prevMedicamentos) =>
      prevMedicamentos.map((med) =>
        med.key === key ? { ...med, fechaVencimiento: dateString } : med
      )
    );
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
        setMedicamentList(updatedOptions);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };
  const handleEditableCellChange = (
    value: string,
    key: string,
    column: string
  ) => {
    const newData = [...medicamentos];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      if (column in newData[index]) {
        const key = column as keyof Medicamento;
        newData[index][key] = value! as Medicamento[keyof Medicamento]; // Non-null assertion
      }
      setMedicamentos(newData);
    }
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
      // Marca la columna como editable
      render: (_: unknown, record: Medicamento) => {
        return (
          <Input
            defaultValue={record.cantidad}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
              handleEditableCellChange(e.target.value, record.key, "cantidad")
            }
          />
        );
      },
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
    {
      title: "Fecha de expiración",
      dataIndex: "fechaVencimiento",
      key: "fechaVencimiento",
      render: (_: unknown, record: Medicamento) => (
        <DatePicker
          value={
            record.fechaVencimiento ? dayjs(record.fechaVencimiento) : null
          }
          onChange={(date, dateString) =>
            handleDateChange(date, record.key, dateString as string)
          }
        />
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

    fetch("http://localhost:3000/apiFarmaNova/distributors/")
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
        setDistributors(opts);
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
      requiere: requierePrescripcion,
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
      fechaVencimiento: purchaseExpiration || dayjs().format("YYYY-MM-DD"),
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
      formData.append("requiere", String(medicamento.requiere));
      formData.append(`image`, medicamento.imageFile);
      formData.append("fechaVencimiento", medicamento.fechaVencimiento);
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

  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    const loadingMessage = message.loading(`Buscando: ${searchText}`, 0);

    try {
      const response = await axios.get(
        `http://localhost:3000/apiFarmaNova/inventory/getRegisterPerBarCode/${searchText}`
      );

      loadingMessage();

      const newMedicine = response.data.data;
      const exists = medicamentos.some(
        (med) => med.codigoBarra === newMedicine.codigoBarra
      );

      if (exists) {
        message.warning("El medicamento ya está en la tabla.");
        return;
      }

      setMedicamentos([...medicamentos, newMedicine]);
      message.success(`Resultados encontrados para: ${searchText}`);
      setSearchText("");
      setMedicamentos([...medicamentos, response.data.data]);
      message.success("Medicamento agregado a la tabla.");
    } catch {
      loadingMessage();
      message.error(`No se encontraron resultados para: ${searchText}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <h2 style={{ marginBottom: 20 }}>Agregar Medicamentos</h2>

      <div style={{ marginBottom: 20, gap: 50, display: "flex" }}>
        <Button
          type="primary"
          style={{ marginRight: 10, height: 40 }}
          onClick={() => setShowMedicationSelector(true)}
        >
          Seleccionar Medicamento
        </Button>
        <Button
          type="default"
          onClick={() => setShowMedicationSelector(false)}
          style={{ height: 40 }}
        >
          Escanear codigo de barra
        </Button>

        <Button type="default" style={{ height: 40, borderColor: "white" }}>
          Agregar producto
        </Button>
      </div>
      {!showMedicationSelector && (
        <Input
          className="Input"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe algo para buscar"
        />
      )}
      {showMedicationSelector && (
        <div
          style={{
            display: "flex",
            gap: 10,
            overflowY: "auto",
            alignItems: "center",
          }}
        >
          <Select
            showSearch
            allowClear
            options={medicamentList}
            style={{ flex: 1 }}
            placeholder="Buscar o seleccionar un medicamento"
            onChange={handleSelectChange}
            value={selectedMedication || undefined}
            filterOption={(input, option) =>
              option?.value.toLowerCase().includes(input.toLowerCase()) || false
            }
          />
          <Button type="primary" onClick={handleAddClick}>
            Agregar
          </Button>
        </div>
      )}
      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
        {selectedMedication && (
          <div
            style={{
              marginTop: 20,
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          >
            <div style={{ display: "flex", gap: 10 }}>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Input
                className="Input"
                type="text"
                placeholder="Código de Barras"
                value={codigoBarra}
                required
                onChange={(e) => setCodigoBarra(e.target.value)}
              />
            </div>
            <Select
              allowClear
              showSearch
              options={distributors}
              style={{ width: "100%", marginTop: 10 }}
              onChange={handleSelectChangeDistributor}
              placeholder="Seleccionar distribuidor"
              value={selectedDistributor?.value}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <Input
                required
                className="Input"
                type="text"
                placeholder="Precio Venta"
                value={precioVenta}
                onChange={(e) => setPrecioVenta(e.target.value)}
              />
              <Input
                required
                className="Input"
                type="text"
                placeholder="Precio Compra"
                value={precioCompra}
                onChange={(e) => setPrecioCompra(e.target.value)}
              />
            </div>

            <Select
              allowClear
              showSearch
              options={compressedForm}
              style={{ width: "100%", marginTop: 10 }}
              onChange={handleSelectChangeCompressedForm}
              value={selectedCompressedForm?.value}
              placeholder="Seleccionar forma comprimida"
            />
            {selectedCompressedForm?.value === "tableta" ? (
              <>
                <Input
                  required
                  className="Input"
                  type="number"
                  placeholder="Cantidad de tabletas"
                  value={cantidadTabletas}
                  onChange={(e) => setCantidadTabletas(e.target.value)}
                  style={{ marginTop: 10 }}
                />
                <Input
                  required
                  className="Input"
                  type="number"
                  placeholder="Unidades por tableta"
                  value={unidadesPorTableta}
                  onChange={(e) => setUnidadesPorTableta(e.target.value)}
                  style={{ marginTop: 10 }}
                />
              </>
            ) : (
              <Input
                required
                className="Input"
                type="number"
                placeholder="Cantidad"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                style={{ marginTop: 10 }}
              />
            )}

            <DatePicker
              placeholder="Fecha de vencimiento"
              onChange={(_date, dateString) =>
                setPurchaseExpiration(
                  typeof dateString === "string" ? dateString : ""
                )
              }
              style={{ width: "100%", marginTop: 10 }}
            />
            <Checkbox
              checked={requierePrescripcion}
              onChange={(e) => setRequierePrescripcion(e.target.checked)}
            >
              Requiere prescripción médica?
            </Checkbox>
            <Button
              onClick={handleAddToTable}
              type="primary"
              style={{ width: "100%", marginTop: 10 }}
            >
              Agregar a la tabla
            </Button>
          </div>
        )}
      </div>

      <div style={{ maxHeight: "300px" }}>
        <Table
          columns={columns}
          dataSource={medicamentos}
          style={{ marginTop: 20 }}
        />
      </div>
      <Button
        type="primary"
        onClick={handleSubmit}
        style={{ width: "100%", marginTop: 20 }}
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
