// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./auth/AuthProvider"; // ✅ asegurate de que la ruta sea correcta

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      {" "}
      {/* 🟢 Ahora el contexto estará disponible */}
      <App />
    </AuthProvider>
  </StrictMode>
);
