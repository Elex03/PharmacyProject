import { useState } from "react";
import Layout from "../../../shared/components/layout/layout";
import { useFetchMedicineSelect } from "../../../shared/hooks/useFetchGeneral";
import { useFetchDistributors } from "../../ditributors/hooks/useFetchDistributors";

import "./compras.css";

interface RegistroTabla {
  distribuidor: string;
  nombreMedicamento: string;
  fechaVencimiento: string;
  cantidadEmpaque: string;
  unidadesPorEmpaque: string;
  nroLote: string;
  total: number;
}
const Compras = () => {
  const [tablaDatos, setTablaDatos] = useState<RegistroTabla[]>([]);
  // Estado para inputs
  const [distribuidor, setDistribuidor] = useState("");
  const [medicamento, setMedicamento] = useState("");
  const [codigoBarras, setCodigoBarras] = useState(""); // Aunque no lo usaremos en tabla según solicitud
  const [cantidadEmpaque, setCantidadEmpaque] = useState("");
  const [unidadesPorEmpaque, setUnidadesPorEmpaque] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [numeroLote, setNumeroLote] = useState("");

  // Estado para tabla

  const handleAddToTable = () => {
    // Validaciones básicas (puedes extenderlas)
    if (
      !distribuidor ||
      !medicamento ||
      !cantidadEmpaque ||
      !unidadesPorEmpaque ||
      !fechaVencimiento ||
      !numeroLote
    ) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    // Calcular total
    const total =
      parseInt(cantidadEmpaque, 10) * parseInt(unidadesPorEmpaque, 10);

    // Crear nuevo registro
    const nuevoRegistro = {
      distribuidor,
      nombreMedicamento: medicamento,
      fechaVencimiento,
      cantidadEmpaque,
      unidadesPorEmpaque,
      nroLote: numeroLote,
      total,
    };

    // Añadir registro a la tabla
    setTablaDatos((prev) => [...prev, nuevoRegistro]);

    // Limpiar inputs
    setDistribuidor("");
    setMedicamento("");
    setCodigoBarras("");
    setCantidadEmpaque("");
    setUnidadesPorEmpaque("");
    setFechaVencimiento("");
    setNumeroLote("");
  };

  const { distributorData: distributors } = useFetchDistributors();

  const { medicineSelect } = useFetchMedicineSelect();

  return (
    <Layout title="Compras">
      <div className="actions1">
        <div>
          <label className="customer-name-label-1">Distribuidor</label>
          <select
            className="customer-name-input-1"
            value={distribuidor}
            onChange={(e) => setDistribuidor(e.target.value)}
          >
            <option value="">Seleccione un medicamento</option>
            {distributors.map((res) => (
              <option value={res.id}> {res.nombre + res.empresa}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="customer-name-label-1">Medicamento</label>
          <select
            className="customer-name-input-1"
            value={medicamento}
            onChange={(e) => setMedicamento(e.target.value)}
          >
            <option value="">Seleccione un distribuidor</option>
            {medicineSelect.map((res) => (
              <option value={res.id}>{res.label + res.precio}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="customer-name-label-1">Código de barras</label>
          <input
            type="text"
            className="customer-name-input-1"
            placeholder="Ingrese el código de barras"
            value={codigoBarras}
            onChange={(e) => setCodigoBarras(e.target.value)}
          />
        </div>
        <div>
          <button className="button-action-1">Registrar nuevo</button>
        </div>
        <div>
          <label className="customer-name-label-1">Cantidad de empaque</label>
          <input
            type="number"
            className="customer-name-input-1"
            placeholder="Ingresa la cantidad de empaques"
            value={cantidadEmpaque}
            onChange={(e) => setCantidadEmpaque(e.target.value)}
          />
        </div>
        <div>
          <label className="customer-name-label-1">Unidades por empaque</label>
          <input
            type="number"
            className="customer-name-input-1"
            placeholder="Ingresa las unidades"
            value={unidadesPorEmpaque}
            onChange={(e) => setUnidadesPorEmpaque(e.target.value)}
          />
        </div>
        <div>
          <label className="customer-name-label-1">Fecha de expiración</label>
          <input
            type="date"
            className="customer-name-input-1"
            value={fechaVencimiento}
            onChange={(e) => setFechaVencimiento(e.target.value)}
          />
        </div>
        <div>
          <label className="customer-name-label-1">Número de Lote</label>
          <input
            type="text"
            className="customer-name-input-1"
            placeholder="Ingresa numero de lote"
            value={numeroLote}
            onChange={(e) => setNumeroLote(e.target.value)}
          />
        </div>
        <div>
          <button
            className="button-action-1"
            onClick={handleAddToTable}
            type="button"
          >
            Añadir a la tabla
          </button>
        </div>

        {/* Tabla */}
        <div className="table">
          {tablaDatos.length > 0 && (
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
                </tr>
              </thead>
              <tbody>
                {tablaDatos.map((row, index) => (
                  <tr key={index}>
                    <td>{row.distribuidor}</td>
                    <td>{row.nombreMedicamento}</td>
                    <td>{row.fechaVencimiento}</td>
                    <td>{row.cantidadEmpaque}</td>
                    <td>{row.unidadesPorEmpaque}</td>
                    <td>{row.nroLote}</td>
                    <td>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Compras;
