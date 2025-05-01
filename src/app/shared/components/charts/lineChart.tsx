import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lunes', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Martes', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Miercoles', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Jueves', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Viernes', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Sabado', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Domingo', uv: 3490, pv: 4300, amt: 2100 },
];

const Example = () => {
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Example;
