import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

interface Distributor {
  distribuidor: string;
  cantidad: number;
}

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
    series: [{
      data: [],
    }],
    options: {
      chart: {
        type: "bar", 
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
        categories: [], 
      },
    },
  });

  const loadDistributorData = async () => {
    try {
      const response = await fetch("http://localhost:3000/apiFarmaNova/distributors/getdistributors");
      const data: Distributor[] = await response.json();
      
      setState({
        series: [{
          data: data.map(item => item.cantidad), 
        }],
        options: {
          ...state.options,
          xaxis: {
            categories: data.map(item => item.distribuidor),
          },
        },
      });
    } catch (error) {
      console.error("Error loading distributor data:", error);
    }
  };

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
