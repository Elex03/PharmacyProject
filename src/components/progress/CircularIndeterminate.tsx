import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)", // fondo semitransparente
        zIndex: 1300, // mayor que muchos modales/dialogs por defecto
      }}
    >
      <CircularProgress />
    </Box>
  );
}
