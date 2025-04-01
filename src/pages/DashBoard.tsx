import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import CascadingDateFilter from "../components/forms/FilterPicker";

const DashBoard = () => {
  const data = [
    { name: "Page A", demanda: 4000, cantidad: 2400 },
    { name: "Page B", demanda: 3000, cantidad: 1398 },
    { name: "Page C", demanda: 2000, cantidad: 9800 },
    { name: "Page D", demanda: 2780, cantidad: 3908 },
    { name: "Page E", demanda: 1890, cantidad: 4800 },
    { name: "Page F", demanda: 2390, cantidad: 3800 },
    { name: "Page G", demanda: 3490, cantidad: 4300 }
  ];

  return (
    <div>
      <h2>Dashboard</h2>
      <CascadingDateFilter/>
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="cantidad" fill="#8884d8" />
        <Bar dataKey="demanda" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default DashBoard;
