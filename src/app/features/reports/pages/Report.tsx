import Layout from "../../../shared/components/layout/layout";
import { useEffect, useState } from "react";
import { Table } from "../../../shared/components/layout/Table/Table";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { Range, RangeKeyDict } from "react-date-range";
import { useForm } from "react-hook-form";
import { useFetchSalesReport } from "../../../shared/hooks/useFetchGeneral";
import { useMemo } from "react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import "./Report.css";


const infoReport = [
  "Reportes de los medicamentos mas vendidos", 
  "De 20/03/2005 hasta 31/05/2025"
]

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

  const [enabled, setEnabled] = useState(false);

  const reportType = watch("reportType");
  const filterByDate = watch("filterByDate");
  const itemCount = watch("itemCount");
  const order = watch("order");
  const from = watch("from");
  const to = watch("to");

  const { salesReport, headers, loading } = useFetchSalesReport(
    order,
    itemCount === "todos" ? "todos" : Number(itemCount),
    filterByDate,
    from,
    enabled && reportType === "ventas",
    to
  );
  
  const handleDateChange = (ranges: RangeKeyDict) => {
    const sel = ranges.selection;
    if (sel.startDate && sel.endDate) {
      setRange([sel]);
      setValue("from", sel.startDate.toISOString().split("T")[0]);
      setValue("to", sel.endDate.toISOString().split("T")[0]);
      setShowCalendar(false);
    }
  };

  const onSubmit = (data: ReportFormData) => {
    if (data.reportType === "ventas") {
      setEnabled(false);
      setTimeout(() => setEnabled(true), 0);
    }
    console.log("Filtros aplicados:", data);
  };


const typeReports = useMemo(() => [
  { value: "seleccionar", label: "Seleccionar" },
  { value: "ventas", label: "Medicamentos más vendidos" },
  { value: "devolucion", label: "Medicamentos devueltos" },
], []);

const [selectedReport, setSelectedReport] = useState("");
const [fileName, setFileName] = useState("");

useEffect(() => {
  const report = typeReports.find(item => item.value === selectedReport);
  setFileName(report ? report.label : "");
}, [selectedReport, typeReports]);

  return (
    <Layout title="Reportes">
      <div className="report-container">
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 16 }}>
          <div className="filters-row">
            <div className="filter-group">
              <label>Tipo de reporte</label>
              <select {...register("reportType")} className="filter-dropdown"
              onChange={(e) => setSelectedReport(e.target.value)}
              >
                {typeReports.map((item) => (
                  <option value={item.value}>{item.label}</option>
                ))}
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
            fileName={fileName}
            tableInfo={infoReport}
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
