import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface HeaderItem {
  id: string;
  label: string;
}

export function PieAnimation({
  data,
  selectedKey,
}: {
  headers: HeaderItem[];
  data: Record<string, unknown>[];
  selectedKey: string;
}) {
  const [categories, setCategories] = React.useState<
    { id: number; label: string; value: number }[]
  >([]);

  const colors = ["#64B5F6", "#A5D6A7", "#EF9A9A", "#FFB74D", "#9575CD"];

  React.useEffect(() => {
    if (!data || data.length === 0 || !selectedKey) return;

    const countMap: Record<string, number> = {};

    data.forEach((item) => {
      const key = String(item[selectedKey] ?? "Sin valor");
      countMap[key] = (countMap[key] || 0) + 1;
    });

    const grouped = Object.entries(countMap).map(([label, value], index) => ({
      id: index,
      label,
      value,
    }));

    setCategories(grouped);
  }, [data, selectedKey]);

  const groupedData = React.useMemo(() => {
    const countMap: Record<string, number> = {};
    data.forEach((item) => {
      const key = String(item[selectedKey] ?? "Sin valor");
      countMap[key] = (countMap[key] || 0) + 1;
    });

    return Object.entries(countMap).map(([value, count]) => ({
      value,
      count,
    }));
  }, [data, selectedKey]);
  return (
    <Box sx={{ width: "100%", fontSize: 12 }}>
      {categories.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
              position: "relative",
              left: 50,
            }}
          >
            <PieChart
              legend={{
                 labelStyle: { fontSize: 12, fill: "#333", fontWeight: 500 },
                hidden: true,
              }}
              height={220}
              
              series={[
                {
                  data: categories.map((item, index) => ({
                    ...item,
                    color: colors[index % colors.length],
                  })),
                  innerRadius: 50,
                  arcLabel: (params) => {
                    const label = params.label ?? "";
                    const maxLength = 5;
                    return label.length > maxLength
                      ? label.slice(0, maxLength) + "…"
                      : label;
                  },
                  arcLabelMinAngle: 20,
                },
              ]}
              skipAnimation={false}
              sx={{
                "& .MuiChartsArcLabel": {
                  fontSize: 12,
                  fill: "#333",
                  fontWeight: 500,
                },
              }}
            />
          </div>
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Lista de datos
            </Typography>
            <div style={{ height: 200, overflowY: "auto" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{selectedKey}</TableCell>
                    <TableCell>Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>{item.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Box>
        </>
      ) : (
        <Typography>Cargando datos...</Typography>
      )}
    </Box>
  );
}
