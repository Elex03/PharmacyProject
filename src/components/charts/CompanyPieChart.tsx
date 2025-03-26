import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { company: "Distribuidor A", meds: 120 },
  { company: "Distribuidor B", meds: 80 },
  { company: "Distribuidor C", meds: 150 },
  { company: "Distribuidor D", meds: 50 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CompanyPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart margin={{ top: 1, right: 250, left: -400, bottom: 280 }}>
        <Pie
          data={data}
          dataKey="meds"
          nameKey="company"
          cx="50%"
          cy="50%"
          outerRadius={40}
          label          
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="vertical" align="right" wrapperStyle={{ right: 700 }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CompanyPieChart;
