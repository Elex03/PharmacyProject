import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";

interface DayInventory {
  dia: string;
  esta_semana: number;
  anterior: number;
}
const Example = () => {
  const [data, setData] = useState<DayInventory[]>([]);

  useEffect(() => {
    fetch("https://farmanova-api.onrender.com/apiFarmaNova/inventory/getSalesPerWeek") 
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        return response.json();
      })
      .then((data: DayInventory[]) => {
        setData(data); 
      });
  }, []);

  return (
    <div style={{ width: "100%", height: 150 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 1, right: 1, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="esta_semana"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="anterior" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Example;
