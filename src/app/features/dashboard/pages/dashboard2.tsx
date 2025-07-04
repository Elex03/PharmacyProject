import { useEffect, useRef, useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange, RangeKeyDict } from "react-date-range";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./dashboard2.css";
import Layout from "../../../shared/components/layout/layout";
import {
  LuSquareArrowOutUpRight,
  LuSquareArrowOutDownLeft,
  LuCircleDollarSign,
  LuBox,
  LuCalendarDays,
} from "react-icons/lu";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import classNames from "classnames";
import { useGetMedicinesNearExpiration, useGetMedicinesRunningOut } from "./hooks/useMedicines";
import { API_URL } from "../../../shared/components/config";

const originalData = [
  { date: "2025-01-05", value: 120 },
  { date: "2025-01-15", value: 100 },
  { date: "2025-01-25", value: 180 },
  { date: "2025-02-02", value: 90 },
  { date: "2025-02-12", value: 300 },
  { date: "2025-02-22", value: 150 },
  { date: "2025-03-01", value: 700 },
  { date: "2025-03-10", value: 200 },
  { date: "2025-03-20", value: 180 },
  { date: "2025-03-30", value: 250 },
  { date: "2025-04-05", value: 90 },
  { date: "2025-04-12", value: 500 },
  { date: "2025-04-19", value: 400 },
  { date: "2025-04-25", value: 320 },
  { date: "2025-05-01", value: 130 },
  { date: "2025-05-07", value: 800 },
  { date: "2025-05-13", value: 100 },
  { date: "2025-05-19", value: 150 },
  { date: "2025-05-25", value: 300 },
  { date: "2025-06-01", value: 650 },
  { date: "2025-06-05", value: 140 },
  { date: "2025-06-10", value: 90 },
  { date: "2025-06-14", value: 720 },
  { date: "2025-06-17", value: 260 },
  { date: "2025-06-20", value: 320 },
  { date: "2025-06-23", value: 110 },
  { date: "2025-06-26", value: 500 },
  { date: "2025-06-28", value: 380 },
  { date: "2025-06-29", value: 100 },
  { date: "2025-06-30", value: 890 },
];

function Dashboard2() {
  const [state, setState] = useState([
    {
      startDate: new Date("2025-01-02"),
      endDate: addDays(new Date("2025-06-02"), 6),
      key: "selection",
    },
  ]);
  const [filteredData, setFilteredData] = useState(originalData);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRangeRef = useRef<HTMLDivElement>(null);
  const { medicinesNearToExpire } = useGetMedicinesNearExpiration();
  const handleChange = (rangesByKey: RangeKeyDict) => {
    const selection = rangesByKey.selection;
    if (selection?.startDate && selection?.endDate) {
      setState([
        {
          startDate: selection.startDate,
          endDate: selection.endDate,
          key: "selection",
        },
      ]);
    }
  };

  useEffect(() => {
    const { startDate, endDate } = state[0];

    const filterByRange = <T extends { date: string }>(data: T[]) =>
      data
        .filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate && itemDate <= endDate;
        })
        .map((item) => ({
          ...item,
          date: format(new Date(item.date), "MM-dd"), // Formateo visual
        }));

    setFilteredData(filterByRange(originalData));
  }, [state]);

  const handleInputClick = () => setShowDatePicker(true);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dateRangeRef.current &&
      !dateRangeRef.current.contains(event.target as Node)
    ) {
      setShowDatePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCalendarButtonClick = () => {
    setShowDatePicker((prev) => !prev);
  };

  const formatRangeText = (start: Date, end: Date) => {
    const sameYear = start.getFullYear() === end.getFullYear();
    const formatMonth = (date: Date) =>
      date
        .toLocaleDateString("es-ES", { month: "short" })
        .replace(".", "")
        .replace(/^\w/, (c) => c.toUpperCase());

    const startMonth = formatMonth(start);
    const endMonth = formatMonth(end);

    if (sameYear) {
      return `${startMonth} - ${endMonth} ${start.getFullYear()}`;
    } else {
      return `${startMonth} ${start.getFullYear()} - ${endMonth} ${end.getFullYear()}`;
    }
  };

  const selectedStart = state[0].startDate;
  const selectedEnd = state[0].endDate;
  const buttonText = formatRangeText(selectedStart, selectedEnd);

  const totalFiltered = filteredData.reduce((acc, item) => acc + item.value, 0);
  const formattedTotal =
    "C$ " +
    new Intl.NumberFormat("es-NI", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(totalFiltered);

    const {medicinesRunningOut} = useGetMedicinesRunningOut();

  return (
    <Layout title="Dashboard">
      <div className="dashboard2">
        <div
          ref={dateRangeRef}
          className={classNames("date-range-wrapper", {
            "hide-date-range": !showDatePicker,
          })}
          onClick={handleInputClick}
        >
          <DateRange
            editableDateInputs={true}
            onChange={handleChange}
            moveRangeOnFirstSelection={false}
            ranges={state}
            showMonthAndYearPickers={false}
          />
        </div>
        <div className="dashboard2-grid">
          <div className="grafico">
            <div className="titles">
              <div className="title">Total Revenue</div>
              <div className="value">{formattedTotal}</div>
            </div>
            <div className="buttons">
              <div></div>
              <button className="calendar" onClick={handleCalendarButtonClick}>
                <LuCalendarDays className="icon" />
                <p>{buttonText}</p>
              </button>
            </div>
            <div className="grafica">
              <div style={{ width: "100%", height: "100%" }}>
                <ResponsiveContainer>
                  <AreaChart
                    data={filteredData}
                    margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorValor"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      interval={Math.floor(filteredData.length / 8)}
                    />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorValor)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="cards">
            <div className="card one">
              <div className="top one">
                <LuSquareArrowOutDownLeft size={32} />
              </div>
              <div className="middle">
                <div className="left1">Ingreso</div>
              </div>
              <div className="bottom">{formattedTotal}</div>
            </div>
            <div className="card two">
              <div className="top two">
                <LuSquareArrowOutUpRight size={32} />
              </div>
              <div className="middle">
                <div className="left1">Costo</div>
              </div>
              <div className="bottom">{formattedTotal}</div>
            </div>
            <div className="card tree">
              <div className="top tree">
                {" "}
                <LuCircleDollarSign size={32} />
              </div>
              <div className="middle">
                <div className="left1">Utilidad Bruta</div>
              </div>
              <div className="bottom">{formattedTotal}</div>
            </div>
            <div className="card four">
              <div className="top four">
                <LuBox size={32} />
              </div>
              <div className="middle">
                <div className="left1">Stock Actual</div>
              </div>
              <div className="bottom">3,648</div>
            </div>
          </div>
          <div className="tables">
            {/* Productos Cerca de Vencer */}
            <div className="table-left">
              <div className="table-top">
                <div className="table-top-left">Productos Cerca de Vencer</div>
                <div className="table-top-right">
                  <a href="/inventario">Ver Todos los Productos</a>
                </div>
              </div>
              <div className="table-botton">
                {medicinesNearToExpire.map((product, index) => (
                  <div className="product" key={index}>
                    <div className="foto">
                      <img src={`${API_URL}${product.img}`} alt={product.name} />
                    </div>
                    <div className="name">{product.name}</div>
                    <div className="total">
                      Total Ventas: {product.totalSales}
                    </div>
                    <div className="precio">{product.precio}</div>
                    <div className="disponible">
                      <div className="texto">
                        Disponible: {product.stock} en stock
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Productos con Poco Stock */}
            <div className="table-left">
              <div className="table-top">
                <div className="table-top-left">Productos con Poco Stock</div>
                <div className="table-top-right">
                  {" "}
                  <a href="/inventario">Ver Todos los Productos</a>
                </div>
              </div>
              <div className="table-botton">
                {medicinesRunningOut.map((product, index) => (
                  <div className="product" key={index}>
                    <div className="foto">
                      <img src={`${API_URL}${product.img}`} alt={product.name} />
                    </div>
                    <div className="name">{product.name}</div>
                    <div className="total">
                      Total Ventas: {product.totalSales}
                    </div>
                    <div className="precio">{product.precio}</div>
                    <div className="disponible">
                      <div className="texto">
                        Disponible: {product.stock} en stock
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard2;
