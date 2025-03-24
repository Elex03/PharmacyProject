import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/DashBoard";
import Inventario from "./pages/Inventory";
import Sidebar from "./components/layout/sideBar";

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
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>                
    </BrowserRouter>    
  );
};

export default AppRouter;
