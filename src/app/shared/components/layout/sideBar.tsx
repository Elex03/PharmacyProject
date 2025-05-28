import SidebarLink from "./NavLink";
import {
  LuLayoutDashboard,
  LuPackage,
  LuTruck,
  LuClipboardMinus,
  LuFileClock,
  LuUser,
  LuFileText,
  LuLogOut,
  LuSettings,
  // LuInfo,
} from "react-icons/lu";

import "./SideBar.css";
import logo from "../../assets/img/logo1.png";

export default function Sidebar() {
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

          <p className="menu-title">Gestión de clientes y reportes</p>
          <SidebarLink
            to="/clientes"
            icon={<LuUser className="icon" />}
            label="Clientes"
          />
          <SidebarLink
            to="/reportes"
            icon={<LuFileText className="icon" />}
            label="Reportes"
          />
        </div>

        <div className="sidebar-footer">
          <p className="menu-title">Cuenta</p>
          <SidebarLink
            to="/settings"
            icon={<LuSettings className="icon" />}
            label="Configuraciones"
            className="logout"
          />
          <SidebarLink
            to="/logout"
            icon={<LuLogOut className="icon" />}
            label="Cerrar sesión"
            className="logout"
          />
        </div>
      </div>
    </div>
  );
}
