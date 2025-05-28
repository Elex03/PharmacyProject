import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Sidebar from "./shared/components/layout/sideBar";
import "./routes.css";
import "./shared/styles/shared.css";
import CircularIndeterminate from "./shared/components/progress/CircularIndeterminate";

const Report = lazy(() => import("./features/reports/pages/Report.tsx"));
const Login = lazy(() => import("./shared/pages/Login"));
const Dashboard = lazy(
  () => import("./features/dashboard/pages/dashboard2.tsx")
);
const Settings = lazy(() => import("./features/settings/pages/settings.tsx"));

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
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularIndeterminate />}>
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
            path="/ventas"
            element={
              <div className="page-container-root">
                <Sidebar />
                <CashRegister />
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
            path="/clientes"
            element={
              <div className="page-container-root">
                <Sidebar />
                <Login />
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
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
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
