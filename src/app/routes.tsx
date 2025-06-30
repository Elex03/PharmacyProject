// src/app/routes.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

import Sidebar from "./shared/components/layout/sideBar";
import "./routes.css";
import "./shared/styles/shared.css";
import CircularIndeterminate from "./shared/components/progress/CircularIndeterminate";

import PrivateRoute from "./auth/PrivateRoute";
import { useAuth } from "./auth/UseAuth.ts";

const Report = lazy(() => import("./features/reports/pages/Report.tsx"));
const Login = lazy(() => import("./features/login/pages/login.tsx"));
const Dashboard = lazy(
  () => import("./features/dashboard/pages/dashboard2.tsx")
);
const Settings = lazy(() => import("./features/settings/pages/settings.tsx"));
const Orders = lazy(() => import("./features/pedidos/pages/compras.tsx"));
const Inventario = lazy(() => import("./features/inventory/pages/Inventory"));
const Distributors = lazy(
  () => import("./features/ditributors/pages/Distributors")
);
const CashRegister = lazy(
  () => import("./features/makeSales/pages/MakeSalesPage")
);
const SalesHistory = lazy(
  () => import("./features/salesHistory/pages/SalesHistory")
);
const OrderHistory = lazy(
  () => import("./features/ordersHistory/pages/OrderHistory")
);
const UnderConstruction = lazy(() => import("./shared/pages/Defualt"));

const AppRouter = () => {
  const { user } = useAuth();

  // Si no hay usuario, redirige directo a login
  // (esto es para que al abrir / vaya a /login)
  if (!user) {
    return (
      <BrowserRouter>
        <Suspense fallback={<CircularIndeterminate />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<CircularIndeterminate />}>
        <Routes>
          <Route path="/login" element={<Navigate to="/dashboard" replace />} />

          {/* Rutas solo para admin */}
          <Route element={<PrivateRoute allowedRoles={["administrador"]} />}>
            <Route
              path="/inventario"
              element={
                <div className="page-container-root">
                  <Sidebar />
                  <Inventario />
                </div>
              }
            />
            <Route
              path="/distribuidores"
              element={
                <div className="page-container-root">
                  <Sidebar />
                  <Distributors />
                </div>
              }
            />
            <Route
              path="/ventasHisto"
              element={
                <div className="page-container-root">
                  <Sidebar />
                  <SalesHistory />
                </div>
              }
            />
            <Route
              path="/reportes"
              element={
                <div className="page-container-root">
                  <Sidebar />
                  <Report />
                </div>
              }
            />
            <Route
              path="/settings"
              element={
                <div className="page-container-root">
                  <Sidebar />
                  <Settings />
                </div>
              }
            />
            {/* Agregá más rutas de admin si las hay */}
          </Route>

          {/* Rutas para admin y vendedor */}
          <Route
            element={
              <PrivateRoute allowedRoles={["administrador", "vendedor"]} />
            }
          >
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
              path="/ventas"
              element={
                <div className="page-container-root">
                  <Sidebar />
                  <CashRegister />
                </div>
              }
            />
            <Route
              path="/clientes"
              element={
                <div className="page-container-root">
                  <Sidebar />
                  <Orders />
                </div>
              }
            />
            <Route
              path="/historial/:id"
              element={
                <div className="page-cotainer-root">
                  <Sidebar />
                  <OrderHistory />
                </div>
              }
            />
          </Route>

          {/* Si alguna ruta no existe o no tiene permiso, fallback */}
          <Route
            path="*"
            element={
              <div className="page-cotainer-root">
                <Sidebar />
                <UnderConstruction />
              </div>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
