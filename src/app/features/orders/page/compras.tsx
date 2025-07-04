import { useState } from "react";
import Layout from "../../../shared/components/layout/layout";
import { useFetchMedicineSelect } from "../../../shared/hooks/useFetchGeneral";
import { useFetchDistributors } from "../../ditributors/hooks/useFetchDistributors";
/* import { createNewOrder } from "../../../shared/api/services/Orders"; */
import { Table } from "../../../shared/components/layout/Table/Table"; // Ajusta si tu ruta cambia
import "../styles/compras.css";
import { useParams } from "react-router-dom";

interface RegistroTabla {
  distribuidorId: number;
  medicamentoId: number;
  fecha_expiracion: string;
  cantidadDeEmpaque: string;
  cantidadPorEmpaque: string;
  nroLote: string;
  total: number;
  subtotal: number;
  pedidoId: number;
  index?: number; // Para poder usarlo en onDelete
}

const Compras = () => {
  const [tablaDatos, setTablaDatos] = useState<RegistroTabla[]>([]);
  const [distribuidor, setDistribuidor] = useState("");
  const [medicamento, setMedicamento] = useState("");
  const [cantidadDeEmpaque, setCantidadEmpaque] = useState("");
  const [cantidadPorEmpaque, setUnidadesPorEmpaque] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState<Date>();
  const [numeroLote, setNumeroLote] = useState("");

  const [fechaProgramada, setFechaProgramada] = useState<Date>();

  const { distributorData: distributors } = useFetchDistributors();

  const distribuidoresConPrueba =
    distributors.length > 0
      ? distributors
      : [{ id: 1, nombre: "Prueba", empresa: "Temporal S.A." }];

  const { id: pedidoId } = useParams(); // ← así obtenés el ID del pedido

  const { medicineSelect } = useFetchMedicineSelect();

  const handleAddToTable = () => {
    if (
      !distribuidor ||
      !medicamento ||
      !cantidadDeEmpaque ||
      !cantidadPorEmpaque ||
      !fechaVencimiento ||
      !numeroLote
    ) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    const medicamentoSeleccionado = medicineSelect.find(
      (med) => med.id === Number(medicamento)
    );

    const precioUnidad = medicamentoSeleccionado?.precio ?? 0;
    const totalUnidades =
      parseInt(cantidadDeEmpaque, 10) * parseInt(cantidadPorEmpaque, 10);
    const subtotal = totalUnidades * precioUnidad;

    const total =
      parseInt(cantidadDeEmpaque, 10) * parseInt(cantidadPorEmpaque, 10);

    const nuevoRegistro: RegistroTabla = {
      distribuidorId: Number(distribuidor),
      medicamentoId: Number(medicamento),
      fecha_expiracion:
        fechaVencimiento instanceof Date && !isNaN(fechaVencimiento.getTime())
          ? fechaVencimiento.toISOString().split("T")[0]
          : "",
      cantidadDeEmpaque,
      cantidadPorEmpaque,
      nroLote: numeroLote,
      total,
      subtotal: parseFloat(subtotal.toFixed(2)), // para claridad
      pedidoId: Number(pedidoId), // esto es clave para asociarlo
    };

    setTablaDatos((prev) => [...prev, nuevoRegistro]);

    setDistribuidor("");
    setMedicamento("");
    setCantidadEmpaque("");
    setUnidadesPorEmpaque("");
    setFechaVencimiento(undefined);
    setNumeroLote("");
  };

  const handleDeleteRow = (indexToDelete: number) => {
    setTablaDatos((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const tablaDatosConNombres = tablaDatos.map((row) => {
  const nombreMedicamento = medicineSelect.find(
    (m) => m.id === row.medicamentoId
  )?.label ?? `Med-${row.medicamentoId}`;

  const nombreDistribuidor = distributors.find(
    (d) => d.id === row.distribuidorId
  )?.nombre ?? `Dist-${row.distribuidorId}`;

  return {
    ...row,
    nombreMedicamento,
    nombreDistribuidor,
  };
});


  const handleSaveTable = async () => {
    if (tablaDatos.length === 0) {
      alert("No hay datos para guardar.");
      return;
    }
    try {
      /* localStorage.setItem("nuevosPedidos", JSON.stringify(tablaDatos)); */
      localStorage.setItem(
  "nuevosPedidos",
  JSON.stringify({
    subpedidos: tablaDatosConNombres,
    fechaProgramada: fechaProgramada?.toISOString().split("T")[0] || "",
    estado: "Pendiente",
  })
);


      /* const response = await createNewOrder(tablaDatos);
      console.log("Respuesta del servidor:", response); */
      alert("Pedido guardado exitosamente.");
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      alert("Hubo un error al guardar el pedido.");
    }
  };

  // Definir columnas para el componente Table
  const columns = [
    { key: "distribuidor", header: "Distribuidor" },
    { key: "nombreMedicamento", header: "Medicamento" },
    { key: "fecha_expiracion", header: "Fecha Expiración", isDate: true },
    { key: "cantidadDeEmpaque", header: "Cant. Empaque" },
    { key: "cantidadPorEmpaque", header: "Unid. por Empaque" },
    { key: "nroLote", header: "Nro Lote" },
    { key: "total", header: "Total", isNumeric: true },
  ];

  // Agregar índice a los datos
  const tablaDatosConIndex = tablaDatos.map((row, i) => {
    const nombreMedicamento =
      medicineSelect.find((m) => m.id === row.medicamentoId)?.label ??
      "Desconocido";

    const distribuidorNombre =
      distributors.find((d) => d.id === row.distribuidorId)?.nombre ??
      "Desconocido";

    return {
      ...row,
      nombreMedicamento,
      distribuidor: distribuidorNombre,
      index: i,
    };
  });

  return (
    <Layout title="Compras">
      <div className="actions1">
        <div className="select-1">
          <label className="customer-name-label-1">Distribuidor</label>
          <select
            className="customer-name-input-2"
            value={distribuidor}
            onChange={(e) => setDistribuidor(e.target.value)}
          >
            <option value="">Seleccione un distribuidor</option>
            {/* {distributors.map((res) => (
              <option value={res.id} key={res.id}>
                {res.nombre + " - " + res.empresa}
              </option>
            ))} */}
            {distribuidoresConPrueba.map((res) => (
              <option value={res.id} key={res.id}>
                {res.nombre + " - " + res.empresa}
              </option>
            ))}
          </select>
        </div>

        <div className="select-1">
          <label className="customer-name-label-1">Medicamento</label>
          <select
            className="customer-name-input-2"
            value={medicamento}
            onChange={(e) => setMedicamento(e.target.value)}
          >
            <option value="">Seleccione un medicamento</option>
            {medicineSelect.map((res) => (
              <option value={res.id} key={res.id}>
                {res.label + " - $" + res.precio}
              </option>
            ))}
          </select>
        </div>

        <div className="input-1">
          <label className="customer-name-label-1">Cantidad de empaque</label>
          <input
            type="number"
            className="customer-name-input-1"
            placeholder="Ingresa la cantidad de empaques"
            value={cantidadDeEmpaque}
            onChange={(e) => setCantidadEmpaque(e.target.value)}
          />
        </div>

        <div className="input-1">
          <label className="customer-name-label-1">Unidades por empaque</label>
          <input
            type="number"
            className="customer-name-input-1"
            placeholder="Ingresa las unidades"
            value={cantidadPorEmpaque}
            onChange={(e) => setUnidadesPorEmpaque(e.target.value)}
          />
        </div>

        <div className="input-1">
          <label className="customer-name-label-1">Fecha de expiración</label>
          <input
            type="date"
            className="customer-name-input-1"
            value={
              fechaVencimiento
                ? fechaVencimiento.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setFechaVencimiento(
                e.target.value ? new Date(e.target.value) : undefined
              )
            }
          />
        </div>

        <div className="input-1">
          <label className="customer-name-label-1">Número de Lote</label>
          <input
            type="text"
            className="customer-name-input-1"
            placeholder="Ingresa número de lote"
            value={numeroLote}
            onChange={(e) => setNumeroLote(e.target.value)}
          />
        </div>

        <div className="button-1">
          <button
            className="button-action-1"
            onClick={handleAddToTable}
            type="button"
          >
            Añadir a la tabla
          </button>
        </div>

        <div className="input-1">
          <label className="customer-name-label-1">Fecha Programada</label>
          <input
            type="date"
            className="customer-name-input-1"
            value={
              fechaProgramada ? fechaProgramada.toISOString().split("T")[0] : ""
            }
            onChange={(e) =>
              setFechaProgramada(
                e.target.value ? new Date(e.target.value) : undefined
              )
            }
          />
        </div>

        <div className="button-1">
          <button
            className="button-action-1"
            onClick={handleSaveTable}
            type="button"
          >
            Guardar
          </button>
        </div>

        {/* Reemplazo de la tabla */}
        <div className="table">
          <Table
            columns={columns}
            data={tablaDatosConIndex as Record<string, unknown>[]}
            itemsPerPage={5}
            linkColumn={{
              label: "Acciones",
              type: "buttons",
              idKey: "index",
              onDelete: (index) => handleDeleteRow(index),
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Compras;
