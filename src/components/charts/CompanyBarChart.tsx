import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { company: "Empresa A", meds: 120 },
  { company: "Empresa B", meds: 80 },
  { company: "Empresa C", meds: 150 }
];

const CompanyBarChart = () => {
  return (
    <ResponsiveContainer width="50%" height={200}>
      <BarChart data={data} margin={{ top: 1, right: 50, left: 50, bottom: 80 }}>
        <XAxis dataKey="company" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="meds" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CompanyBarChart;
