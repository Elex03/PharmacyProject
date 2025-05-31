import React from "react";
import ReactApexChart from "react-apexcharts";
import { ResponsiveContainer } from "recharts";
// import { ResponsiveContainer } from "recharts";

// Tipado para cada barra
interface DataPoint {
  descripcion: string;
  cantidad: number;
}

// Props del componente
interface ApexChartProps {
  data: DataPoint[];
  horizontal?: boolean; // opcional, por defecto es vertical (false)
}

const ApexChart: React.FC<ApexChartProps> = ({ data, horizontal = false }) => {
  const truncateLabel = (val: string) =>
    val.length > 10 ? val.substring(0, 10) + "…" : val;

  const chartState = {
    series: [
      {
        name: "Cantidad",
        data: data.map((item) => item.cantidad),
      },
    ],
    options: {
      chart: {
        type: "bar" as const,
        height: 250,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: horizontal,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: horizontal
        ? {
            title: {
              text: "Cantidad",
            },
          }
        : {
            categories: data.map((item) => item.descripcion || "Producto"),
            labels: {
              formatter: truncateLabel,
            },
            title: {
              text: "Medicamentos",
            },
          },
      yaxis: horizontal
        ? {
            categories: data.map((item) => item.descripcion || "Producto"),
            labels: {
              formatter: (val: number) => {
                const label = data[val] ? data[val].descripcion : String(val);
                return truncateLabel(label);
              },
            },
            title: {
              text: "Medicamentos",
            },
          }
        : {
            title: {
              text: "Cantidad",
            },
          },
    },
  };
  return (
    <ResponsiveContainer>
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="bar"
      />
    </ResponsiveContainer>
  );
};

export default ApexChart;
