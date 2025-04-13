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
import { getSalesPerWeek } from "../../api/components/Sales";

interface DayInventory {
  dia: string;
  esta_semana: number;
  anterior: number;
}
const Example = () => {
  const [data, setData] = useState<DayInventory[]>([]);

  useEffect(() => {
    getSalesPerWeek()
      .then((response) => {
        setData(response); 
        console.log("Sales data:", response); 
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
      });
  }, []);

  return (
    <div style={{ width: "100%", height: 150 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 1, right: 1, bottom: 5 }}>
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
