import { Box, Typography } from '@mui/material';
import { Slab } from 'react-loading-indicators'; // Corrected import path

const MIN = 0;
const MAX = 200;

const normalise = (value: number) => ((value - MIN) * 100) / (MAX - MIN);

interface CustomProgressProps {
  value: number;
}

export default function CustomProgress({ value }: CustomProgressProps) {
  const percentage = Math.round(normalise(value));

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Slab color="#32cd32" size="medium" text="" textColor="" />
      <Typography variant="body2" color="text.secondary">
        {percentage}%
      </Typography>
    </Box>
  );
}
