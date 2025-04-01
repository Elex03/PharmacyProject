import BarChart from "../components/charts/BarChart";

const DashBoard = () => {

  const data = [45, 60, 80, 50, 90, 100, 75, 85, 95, 110, 120, 130];

  return (
    <>
      <BarChart  data={data} />;
    </>
  );
};

export default DashBoard;
