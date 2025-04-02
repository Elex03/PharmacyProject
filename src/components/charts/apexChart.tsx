import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// Define the type of the distributor data
interface Distributor {
  distribuidor: string;
  cantidad: number;
}

// Define the state interface for the chart configuration
interface ChartState {
  series: {
    data: number[];
  }[];
  options: {
    chart: {
      type: "bar"; // Explicitly define the type as "bar"
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
    series: [{
      data: [], // Data will be filled later
    }],
    options: {
      chart: {
        type: "bar", // Explicitly define the type as "bar"
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [], // This will be filled dynamically
      },
    },
  });

  // Function to load the distributor data
  const loadDistributorData = async () => {
    try {
      const response = await fetch("/distribuitors.json");
      const data: Distributor[] = await response.json();
      
      setState({
        series: [{
          data: data.map(item => item.cantidad), // Extract quantities
        }],
        options: {
          ...state.options,
          xaxis: {
            categories: data.map(item => item.distribuidor), // Extract distributor names
          },
        },
      });
    } catch (error) {
      console.error("Error loading distributor data:", error);
    }
  };

  // Load data when the component mounts
  useEffect(() => {
    loadDistributorData();
  }, []);

  return (
    <div>
      <div id="chart" style={{ width: "100%", paddingLeft: "30px", marginTop: "-30px"}}>
        <ReactApexChart options={state.options} series={state.series} type="bar" height={250}/>
      </div>
    </div>
  );
};

export default ApexChart;
