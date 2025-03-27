import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieAnimation() {
  const [categories, setCategories] = React.useState<
    { id: number; label: string; value: number }[]
  >([]);

  const colors = ["#64B5F6", "#A5D6A7", "#EF9A9A", "#FFB74D", "#9575CD"];

  React.useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/inventory/getCategories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error cargando las categorías:", error));
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', width: '50%' }}>
    <Box sx={{ width: "100%", display: "flex", fontSize: 12 }}>
      {categories.length > 0 ? (
        <PieChart
          height={200}
          series={[
            {
              data: categories.map((item, index) => ({
                ...item,
                color: colors[index % colors.length], // Asignar color cíclicamente
              })),
              innerRadius: 50,
              arcLabel: (params) => params.label ?? "",
              arcLabelMinAngle: 20,
            },
          ]}
          skipAnimation={false}
        />
      ) : (
        <Typography>Cargando datos...</Typography>
      )}
    </Box>
  </div>
  );
}
