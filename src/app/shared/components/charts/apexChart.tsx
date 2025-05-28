import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ResponsiveContainer } from "recharts";

// Tipado del distribuidor (cada barra representa uno)
interface Distributor {
  distribuidor: string;
  cantidad: number;
}

// Tipado del estado del gráfico
interface ChartState {
  series: {
    data: number[];
  }[];
  options: {
    chart: {
      type: "bar";
      height: number;
    };
    plotOptions: {
      bar: {
        borderRadius: number;
        horizontal: boolean;
      };
    };
    dataLabels: {
      enabled: boolean;
    };
    xaxis: {
      categories: string[];
    };
  };
}

const ApexChart: React.FC = () => {
  const [state, setState] = useState<ChartState>({
    series: [
      {
        data: [], // Valores de cada barra
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 250,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false, // Cambiar a true para barras horizontales
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: [], // Etiquetas bajo cada barra
      },
    },
  });

  // Cargar datos (simulados localmente)
  const loadDistributorData = async () => {
    try {
      // Simulación de una respuesta de API
      const data: Distributor[] = [
        { distribuidor: "Distribuidora A", cantidad: 120 },
        { distribuidor: "Distribuidora B", cantidad: 75 },
        { distribuidor: "Distribuidora C", cantidad: 50 },
        { distribuidor: "Distribuidora D", cantidad: 90 },
      ];

      // Si usás una API real, descomentá esto:
      /*
      const response = await fetch(
        "http://localhost:3000/apiFarmaNova/distributors/getdistributors"
      );
      const data: Distributor[] = await response.json();
      */

      // Actualiza el estado con los datos obtenidos
      setState({
        series: [
          {
            data: data.map((item) => item.cantidad),
          },
        ],
        options: {
          ...state.options,
          xaxis: {
            categories: data.map((item) => item.distribuidor),
          },
        },
      });
    } catch (error) {
      console.error("Error al cargar los datos de distribuidores:", error);
    }
  };

  // Ejecuta al montar el componente
  useEffect(() => {
    loadDistributorData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={300}
      />
    </ResponsiveContainer>
  );
};

export default ApexChart;
