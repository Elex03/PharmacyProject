import React from "react";
import ReactApexChart from "react-apexcharts";
import { ResponsiveContainer } from "recharts";

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
  const chartState = {
    series: [
      {
        data: data.map((item) => item.cantidad),
      },
    ],
    options: {
      chart: {
        type: "bar" as const,
        height: 250,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: horizontal,
        },
      },
      dataLabels: {
        enabled: true,
      },
      
    },
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height={200}
      />
    </ResponsiveContainer>
  );
};

export default ApexChart;
