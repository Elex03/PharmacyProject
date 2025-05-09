import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Sidebar from "./shared/components/layout/sideBar";
import './routes.css';
import './shared/styles/shared.css';
import CircularIndeterminate from "./shared/components/progress/CircularIndeterminate";
import Pedidos from "./features/clients/page/pedidos";



const Login = lazy(() => import("./shared/pages/Login"));
const Dashboard = lazy(() => import("./shared/pages/DashBoard"));
const Inventario = lazy(() => import("./features/inventory/pages/Inventory"));
const Distributors = lazy(() => import("./features/ditributors/pages/Distributors"));
const CashRegister = lazy(() => import("./shared/pages/CashRegister"));
const Shopping = lazy(() => import("./shared/pages/shopping"));
/* const SalesHistory = lazy(() => import("./features/salesHistory/pages/SalesHistory")); */
const OrderHistory = lazy(() => import("./features/ordersHistory/pages/OrderHistory"));
const UnderConstruction = lazy(() => import("./shared/pages/Defualt"));


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularIndeterminate/>}>
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
                {/* <SalesHistory /> */}
                <Pedidos/>
              </div>
            }
          />
          <Route
            path="/compras"
            element={
              <div className="page-container-root">
                <Sidebar />
                <Shopping />
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
