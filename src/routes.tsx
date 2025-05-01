import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Sidebar from "./components/layout/sideBar";
import './routes.css';
import './css/index.css';
import CircularIndeterminate from "./components/progress/CircularIndeterminate";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/DashBoard"));
const Inventario = lazy(() => import("./pages/Inventory"));
const Distributors = lazy(() => import("./pages/Distributors"));
const CashRegister = lazy(() => import("./pages/CashRegister"));
const Shopping = lazy(() => import("./pages/shopping"));
const SalesHistory = lazy(() => import("./pages/SalesHistory"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const UnderConstruction = lazy(() => import("./pages/Defualt"));

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
                <SalesHistory />
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
