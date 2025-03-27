import { Link } from "react-router-dom";
import { FaChartPie, FaBox, FaTruck, FaFileSignature, FaUser, FaFileAlt, FaSignOutAlt, FaUserCircle, FaFileInvoice } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">    
      <div className="sidebar-header">
        <div className="logo-placeholder"></div>
        <h1 className="brand-title">Farma Nova</h1>
      </div>
      
      <div className="sidebar-menu">
        <p className="menu-title">Gestión general</p>
        <Link to="/dashboard" className="menu-item">
          <FaChartPie />
          <span>Dashboard</span>
        </Link>

        <p className="menu-title">Gestión de inventario</p>
        <Link to="/inventario" className="menu-item">
          <FaBox />
          <span>Inventario</span>
        </Link>
        <Link to="/distribuidores" className="menu-item">
          <FaTruck />
          <span>Distribuidores</span>
        </Link>
        <Link to="/ventas" className="menu-item">
          <FaFileSignature />
          <span>Ventas</span>
        </Link>
        <Link to="/ventasHisto" className="menu-item">
          <FaFileInvoice />
          <span>Historial</span>
        </Link>

        <p className="menu-title">Gestión de clientes y reportes</p>
        <Link to="/clientes" className="menu-item">
          <FaUser />
          <span>Clientes</span>
        </Link>
        <Link to="/reportes" className="menu-item">
          <FaFileAlt />
          <span>Reportes</span>
        </Link>
      </div>
      
      <div className="sidebar-footer">
        <p className="menu-title">Cuenta</p>
        <Link to="/logout" className="menu-item logout">
          <FaSignOutAlt />
          <span>Cerrar sesión</span>
        </Link>
        <div className="user-info">
          <FaUserCircle />
          <span>Nombre Usuario</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
