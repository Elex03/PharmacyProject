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
  LuMenu,
  LuX,
} from "react-icons/lu";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";

import "./SideBar.css";


export default function Sidebar() {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => setCollapsed(!collapsed);

  const role = user?.role;

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* HEADER - siempre visible */}
      <div className="sidebar-header">
        <div className="header-left">
          <button className="menu-toggle" onClick={toggleSidebar}>
            {collapsed ? <LuMenu /> : <LuX />}
          </button>
        </div>

        <img src={"./Logo1.png"} alt="Logo" className="sidebar-logo" />
        <div className="sidebar-title">
          <h2>Farma Nova</h2>
          <span className="edition">Free Edition</span>
        </div>
      </div>

      {/* BODY - lo que se colapsa */}
      <div className={`sidebar-body ${collapsed ? "collapsed" : ""}`}>
        <nav className="sidebar-menu">
          {role === "ADMINISTRADOR" && (
            <>
              <SidebarLink to="/dashboard" icon={<LuLayoutDashboard />} label="Dashboard" />
              <SidebarLink to="/inventario" icon={<LuPackage />} label="Inventario" />
              <SidebarLink to="/distribuidores" icon={<LuTruck />} label="Distribuidores" />
              <SidebarLink to="/ventas" icon={<LuClipboardMinus />} label="Ventas" />
              <SidebarLink to="/ventasHisto" icon={<LuFileClock />} label="Historial" />
              <SidebarLink to="/clientes" icon={<LuPackage />} label="Pedidos" />
              <SidebarLink to="/reportes" icon={<LuFileText />} label="Reportes" />
            </>
          )}

          {role === "EMPLEADO" && (
            <SidebarLink to="/ventas" icon={<LuClipboardMinus />} label="Ventas" />
          )}
        </nav>

        {/* FOOTER */}
        <div className="sidebar-footer sidebar-menu">
          {role === "ADMINISTRADOR" && (
            <SidebarLink
              to="/settings"
              icon={<LuSettings />}
              label="Configuraciones"
            />
          )}
          <SidebarLink
            to="/"
            icon={<LuLogOut />}
            label="Cerrar sesión"
            
            className="logout"
          />
        </div>
      </div>
    </aside>
  );
}
