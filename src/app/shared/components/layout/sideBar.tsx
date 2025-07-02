import SidebarLink from "./NavLink";
import {
  LuLayoutDashboard,
  LuPackage,
  LuTruck,
  LuClipboardMinus,
  LuFileClock,
  LuFileText,
  LuLogOut,
  LuSettings,
} from "react-icons/lu";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";

import "./SideBar.css";
import logo from "../../assets/img/logo1.png";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const role = user?.role;

  return (
    <div className="container">
      <div className="sidebar">
        {/* Header */}
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="brand-title">Farma Nova</h1>
        </div>

        {/* Menu */}
        <div className="sidebar-menu">
          {role === "ADMINISTRADOR" && (
            <>
              <p className="menu-title">Gestión general</p>
              <SidebarLink
                to="/dashboard"
                icon={<LuLayoutDashboard className="icon" />}
                label="Dashboard"
              />

              <p className="menu-title">Gestión de inventario</p>
              <SidebarLink
                to="/inventario"
                icon={<LuPackage className="icon" />}
                label="Inventario"
              />
              <SidebarLink
                to="/distribuidores"
                icon={<LuTruck className="icon" />}
                label="Distribuidores"
              />
              <SidebarLink
                to="/ventas"
                icon={<LuClipboardMinus className="icon" />}
                label="Ventas"
              />
              <SidebarLink
                to="/ventasHisto"
                icon={<LuFileClock className="icon" />}
                label="Historial"
              />

              <p className="menu-title">Gestión de Pedidos y reportes</p>
              <SidebarLink
                to="/clientes"
                icon={<LuPackage className="icon" />}
                label="Pedidos"
              />
              <SidebarLink
                to="/reportes"
                icon={<LuFileText className="icon" />}
                label="Reportes"
              />
            </>
          )}

          {role === "EMPLEADO" && (
            <>
              <p className="menu-title">Ventas</p>
              <SidebarLink
                to="/ventas"
                icon={<LuClipboardMinus className="icon" />}
                label="Ventas"
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          {role === "ADMINISTRADOR" && (
            <SidebarLink
              to="/settings"
              icon={<LuSettings className="icon" />}
              label="Configuraciones"
              className="logout"
            />
          )}
          <SidebarLink
            icon={<LuLogOut className="icon" />}
            label="Cerrar sesión"
            className="logout"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}
