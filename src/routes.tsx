import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";
import Inventario from "./pages/Inventory";
import Distributors from "./pages/Distributors";
import Sidebar from "./components/layout/sideBar";
import CashRegister from "./pages/CashRegister";
import SalesHistory from "./pages/salesHistory";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <Dashboard />
            </div>
          }
        />
        <Route
          path="/inventario"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <Inventario />
            </div>
          }
        />
        <Route
          path="/distribuidores"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <Distributors />
            </div>
          }
        />

        <Route
          path="/ventas"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <CashRegister />
            </div>
          }
        />

        <Route
          path="/ventasHisto"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <SalesHistory />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
