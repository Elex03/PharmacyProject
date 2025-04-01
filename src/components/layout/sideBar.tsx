import { Link } from "react-router-dom";
import { FaChartPie, FaBox, FaTruck, FaFileSignature, FaUser, FaFileAlt, FaSignOutAlt, FaUserCircle, FaFileInvoice } from "react-icons/fa";
import "./Sidebar.css";
import logo from "../../img/logo1.png";

const Sidebar = () => {
  return (
    <div className="sidebar">    
      <div className="sidebar-header">
      <img src={logo} alt="Logo" className="logo" />
        <h1 className="brand-title">Farma Nova</h1>
      </div>
      
      <div className="sidebar-menu">
        <p className="menu-title">Gestión general</p>
        <Link to="/dashboard" className="menu-item">
          <FaChartPie style={{color: " #007bff"}}/>
          <span>Dashboard</span>
        </Link>

        <p className="menu-title">Gestión de inventario</p>
        <Link to="/inventario" className="menu-item">
          <FaBox style={{color: " #007bff"}}/>
          <span>Inventario</span>
        </Link>
        <Link to="/distribuidores" className="menu-item">
          <FaTruck style={{color: " #007bff"}}/>
          <span>Distribuidores</span>
        </Link>
        <Link to="/ventas" className="menu-item">
          <FaFileSignature style={{color: " #007bff"}}/>
          <span>Ventas</span>
        </Link>
        <Link to="/ventasHisto" className="menu-item">
          <FaFileInvoice style={{color: " #007bff"}}/>
          <span>Historial</span>
        </Link>

        <p className="menu-title">Gestión de clientes y reportes</p>
        <Link to="/clientes" className="menu-item">
          <FaUser style={{color: " #007bff"}} />
          <span>Clientes</span>
        </Link>
        <Link to="/reportes" className="menu-item">
          <FaFileAlt style={{color: " #007bff"}}/>
          <span>Reportes</span>
        </Link>
      </div>
      
      <div className="sidebar-footer">
        <p className="menu-title">Cuenta</p>
        <Link to="/logout" className="menu-item logout">
          <FaSignOutAlt style={{color: " #007bff"}}/>
          <span>Cerrar sesión</span>
        </Link>
        <div className="user-info">
          <FaUserCircle style={{color: " #007bff"}}/>
          <span>Nombre Usuario</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;