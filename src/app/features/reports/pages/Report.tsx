import Layout from "../../../shared/components/layout/layout";
import { useState } from "react";
import { Table } from "../../../shared/components/layout/Table/Table";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { Range, RangeKeyDict } from "react-date-range";
import { useForm } from "react-hook-form";
import { useFetchSalesReport } from "../../../shared/hooks/useFetchGeneral";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import "./Report.css";

interface ReportFormData {
  filterByDate: boolean;
  itemCount: "todos" | "10" | "50" | "100";
  order: "asc" | "desc";
  from: string;
  to: string;
  reportType: string;
}

const Report = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const { register, handleSubmit, setValue, watch } = useForm<ReportFormData>({
    defaultValues: {
      filterByDate: true,
      reportType: "",
      itemCount: "todos",
      order: "asc",
      from: "",
      to: "",
    },
  });

  // Solo disparar fetch tras “Generar”
  const [enabled, setEnabled] = useState(false);

  // Lectura de campos
  const reportType   = watch("reportType");
  const filterByDate = watch("filterByDate");
  const itemCount    = watch("itemCount");
  const order        = watch("order");
  const from         = watch("from");
  const to           = watch("to");

  // Hook: solo enabled && reportType==='ventas'
  const { salesReport, headers, loading } = useFetchSalesReport(
    order,
    itemCount === "todos" ? "todos" : Number(itemCount),
    filterByDate,
    from,
    enabled && reportType === "ventas",
    to,
  );

  const handleDateChange = (ranges: RangeKeyDict) => {
    const sel = ranges.selection;
    if (sel.startDate && sel.endDate) {
      setRange([sel]);
      setValue("from", sel.startDate.toISOString().split("T")[0]);
      setValue("to",   sel.endDate  .toISOString().split("T")[0]);
      setShowCalendar(false);
    }
  };

  const onSubmit = (data: ReportFormData) => {
    // Solo habilitamos la carga si es reporte de ventas
    if (data.reportType === "ventas") {
      setEnabled(false);
      // refrescar hook
      setTimeout(() => setEnabled(true), 0);
    }
    console.log("Filtros aplicados:", data);
  };

  return (
    <Layout title="Reportes">
      <div className="report-container">
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 16 }}>
          <div className="filters-row">
            <div className="filter-group">
              <label>Tipo de reporte</label>
              <select {...register("reportType")} className="filter-dropdown">
                <option value="">Selecciona</option>
                <option value="ventas">Medicamentos Vendidos</option>
                <option value="inventario">Medicamentos Devueltos</option>
                <option value="usuarios">Usuarios</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Cantidad de elementos</label>
              <select {...register("itemCount")} className="filter-dropdown">
                <option value="todos">Todos</option>
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            <div className="filter-group" style={{ position: "relative" }}>
              <label>Rango de fechas</label>
              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="filter-dropdown"
              >
                {from && to ? (
                  <small style={{ marginTop: "0.3rem" }}>
                    {from} - {to}
                  </small>
                ) : (
                  <span>Seleccionar fechas</span>
                )}
              </button>
              {showCalendar && (
                <div
                  style={{
                    position: "absolute",
                    zIndex: 100,
                    marginTop: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    backgroundColor: "white",
                  }}
                >
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                  />
                </div>
              )}
            </div>

            <div className="filter-group">
              <label>Orden</label>
              <select {...register("order")} className="filter-dropdown">
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </div>

            <button type="submit" className="button-action">
              Generar
            </button>
          </div>
        </form>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Table
            data={enabled && reportType === "ventas" ? (salesReport as []) : []}
            columns={enabled && reportType === "ventas" ? (headers as []) : []}
            linkColumn={{
          label: "",
          path: "/producto",
          idKey: "id",
          type: "modal",
        }}
          />
        )}
      </div>
    </Layout>
  );
};

export default Report;
