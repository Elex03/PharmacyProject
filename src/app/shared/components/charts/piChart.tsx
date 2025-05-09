import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart } from "@mui/x-charts/PieChart";
import { getCategories } from "../../api/services/General";

export default function PieAnimation() {
  const [categories, setCategories] = React.useState<
    { id: number; label: string; value: number }[]
  >([]);

  const colors = ["#64B5F6", "#A5D6A7", "#EF9A9A", "#FFB74D", "#9575CD"];

  React.useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error cargando las categorías:", error);
      });
  }, []);

  return (
    <Box sx={{ width: "100%", fontSize: 12 }}>
      {categories.length > 0 ? (
        <PieChart
          height={200}
          series={[
            {
              data: categories.map((item, index) => ({
                ...item,
                color: colors[index % colors.length],
              })),
              innerRadius: 50,
              arcLabel: (params) => params.label ?? "",
              arcLabelMinAngle: 20,
            },
          ]}
          skipAnimation={false}
          sx={{
            "& .MuiChartsArcLabel": {
              fontSize: 12, // Cambia esto al tamaño que desees
              fill: "#333", // Color opcional del texto
              fontWeight: 500,
            },
          }}
        />
      ) : (
        <Typography>Cargando datos...</Typography>
      )}
    </Box>
  );
}
