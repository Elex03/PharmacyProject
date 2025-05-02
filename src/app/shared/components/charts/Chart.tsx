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

interface DayInventory {
  dia: string;
  esta_semana: number;
  anterior: number;
}
interface GraphicProps {
  data: DayInventory[];
}
const Example: React.FC<GraphicProps> = ({ data }) => {
  return (
    <ResponsiveContainer >
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
        <Line
          type="monotone"
          dataKey="anterior"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Example;
