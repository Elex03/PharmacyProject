import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DonutChart from "./DonutChart";

interface HeaderItem {
  id: string;
  label: string;
}

export function PieAnimation({
  headers,
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

  useEffect(() => {
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

  return (
    <Box sx={{ width: "100%", fontSize: 12 }}>
      {categories.length > 0 ? (
        <>
          <DonutChart data={
            categories.map((category) => ({
              name: category.label,
              value: category.value,
            }))
          } />
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>
              Lista de datos
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell key={header.id}>{header.id}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    {headers.map((header) => (
                      <TableCell key={header.id}>
                        {String(row[header.id])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </>
      ) : (
        <Typography>Cargando datos...</Typography>
      )}
    </Box>
  );
}
