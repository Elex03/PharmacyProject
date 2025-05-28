import { useState } from "react";
import Layout from "../../../shared/components/layout/layout";
import { useFetchMedicineSelect } from "../../../shared/hooks/useFetchGeneral";
import { useFetchDistributors } from "../../ditributors/hooks/useFetchDistributors";
import { LuTrash2 } from "react-icons/lu";

import "./compras.css";
import { createNewOrder } from "../../../shared/api/services/Orders";

interface RegistroTabla {
  distribuidor: string;
  nombreMedicamento: string;
  fecha_expiracion: string;
  cantidadDeEmpaque: string;
  cantidadPorEmpaque: string;
  nroLote: string;
  total: number;
}

const Compras = () => {
  const [tablaDatos, setTablaDatos] = useState<RegistroTabla[]>([]);
  const [distribuidor, setDistribuidor] = useState("");
  const [medicamento, setMedicamento] = useState("");
  const [cantidadDeEmpaque, setCantidadEmpaque] = useState("");
  const [cantidadPorEmpaque, setUnidadesPorEmpaque] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState<Date>();
  const [numeroLote, setNumeroLote] = useState("");

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

    const total =
      parseInt(cantidadDeEmpaque, 10) * parseInt(cantidadPorEmpaque, 10);

    const nuevoRegistro: RegistroTabla = {
      distribuidor,
      nombreMedicamento: medicamento,
      fecha_expiracion:
        fechaVencimiento instanceof Date && !isNaN(fechaVencimiento.getTime())
          ? fechaVencimiento.toISOString().split("T")[0]
          : "",
      cantidadDeEmpaque,
      cantidadPorEmpaque,
      nroLote: numeroLote,
      total,
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

  const { distributorData: distributors } = useFetchDistributors();
  const { medicineSelect } = useFetchMedicineSelect();

  const handleSaveTable = async () => {
    if (tablaDatos.length === 0) {
      alert("No hay datos para guardar.");
      return;
    }

    try {
      const response = await createNewOrder(tablaDatos);
      console.log("Respuesta del servidor:", response);
      alert("Pedido guardado exitosamente.");
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      alert("Hubo un error al guardar el pedido.");
    }
  };

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
            {distributors.map((res) => (
              <option value={res.id}> {res.nombre + res.empresa}</option>
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
              <option value={res.id}>{res.label + res.precio}</option>
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
            placeholder="Ingresa numero de lote"
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
        <div className="button-1">
          <button
            className="button-action-1"
            onClick={handleSaveTable}
            type="button"
          >
            Guardar
          </button>
        </div>

        {/* Tabla */}
        <div className="table">
          <table className="tabla-pedidos">
            <thead>
              <tr>
                <th>Distribuidor</th>
                <th>Nombre Medicamento</th>
                <th>Fecha Vencimiento</th>
                <th>Cantidad de Empaque</th>
                <th>Unidades por Empaque</th>
                <th>Nro Lote</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tablaDatos.length > 0 ? (
                tablaDatos.map((row, index) => (
                  <tr key={index}>
                    <td>{row.distribuidor}</td>
                    <td>{row.nombreMedicamento}</td>
                    <td>{row.fecha_expiracion}</td>
                    <td>{row.cantidadDeEmpaque}</td>
                    <td>{row.cantidadPorEmpaque}</td>
                    <td>{row.nroLote}</td>
                    <td>{row.total}</td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <button
                        onClick={() => handleDeleteRow(index)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                          color: "red",
                        }}
                        title="Eliminar"
                      >
                        <LuTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>
                    No hay registros aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Compras;
