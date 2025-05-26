import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Sector } from 'recharts';

const data = [
  { name: 'Azul', value: 40 },
  { name: 'Morado', value: 10 },
  { name: 'Rosa', value: 20 },
  { name: 'Amarillo', value: 30 },
];


const COLORS = ['#8CCAFF', '#B9A8F9', '#F7A6B4', '#FCD89B'];

interface propsRender {
  cx: number, 
  cy: number, 
  innerRadius: number, 
  outerRadius: number, 
  startAngle: number, 
  endAngle: number, 
  fill: string, 
  midAngle: number
}
const renderActiveShape = (props: propsRender) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, midAngle,
  } = props;

  const RADIAN = Math.PI / 180;
  const moveRadius = 10;
  const dx = Math.cos(-RADIAN * midAngle) * moveRadius;
  const dy = Math.sin(-RADIAN * midAngle) * moveRadius;

  return (
    <g>
      <Sector
        cx={cx + dx}
        cy={cy + dy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function DonutChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(1);

  useEffect(() => {
    setActiveIndex(1);
  }, []);
  const onPieEnter = (_: unknown, index: number) => {

    setActiveIndex(index);
  };

  return (
    <div style={{ position: 'relative', width: 250, height: 250 }}>
      <PieChart width={250} height={250}>
        <Pie
          activeIndex={activeIndex ?? undefined}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5} 
          dataKey="value"
          onMouseEnter={onPieEnter}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {data.map((_entry, index) => (
            
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))
          }
        </Pie>
      </PieChart>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontWeight: 'bold',
        fontSize: '20px',
      }}>
        100%
      </div>
    </div>
  );
}
