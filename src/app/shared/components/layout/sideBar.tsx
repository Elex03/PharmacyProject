import { Link } from "react-router-dom";
import {
  LuLayoutDashboard,
  LuPackage,
  LuTruck,
  LuClipboardMinus,
  LuUser,
  LuFileText,
  LuLogOut,
  LuCircle,
  LuFileClock,
} from "react-icons/lu";
import "./Sidebar.css";
import logo from "../../assets/img/logo1.png";

const Sidebar = () => {
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
          <Link to="/dashboard" className="menu-item">
            <LuLayoutDashboard className="icon" />
            <span className="side-label">Dashboard</span>
          </Link>

          <p className="menu-title">Gestión de inventario</p>
          <Link to="/inventario" className="menu-item">
            <LuPackage className="icon" />
            <span className="side-label">Inventario</span>
          </Link>
          <Link to="/distribuidores" className="menu-item">
            <LuTruck className="icon" />
            <span className="side-label">Distribuidores</span>
          </Link>
          <Link to="/ventas" className="menu-item">
            <LuClipboardMinus className="icon" />
            <span className="side-label">Ventas</span>
          </Link>
          <Link to="/ventasHisto" className="menu-item">
            <LuFileClock className="icon" />
            <span className="side-label">Historial</span>
          </Link>

          <p className="menu-title">Gestión de clientes y reportes</p>
          <Link to="/clientes" className="menu-item">
            <LuUser className="icon" />
            <span className="side-label">Clientes</span>
          </Link>
          <Link to="/reportes" className="menu-item">
            <LuFileText className="icon" />
            <span className="side-label">Reportes</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <p className="menu-title">Cuenta</p>
          <Link to="/logout" className="menu-item logout">
            <LuLogOut className="icon" />
            <span className="side-label">Cerrar sesión</span>
          </Link>
          <div className="user-info">
            <LuCircle className="icon" />
            <span className="side-label">Nombre Usuario</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
