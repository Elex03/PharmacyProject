import { Link } from "react-router-dom";
import {
  FaChartPie,
  FaBox,
  FaTruck,
  FaFileSignature,
  FaUser,
  FaFileAlt,
  FaSignOutAlt,
  FaUserCircle,
  FaFileInvoice,
} from "react-icons/fa";
import "./Sidebar.css";
import logo from "../../assets/img/logo1.png"; // Adjust the path to your logo image

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-background">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="brand-title">Farma Nova</h1>
        </div>

        <div className="sidebar-menu" >
          <p className="menu-title">Gestión general</p>
          <Link to="/dashboard" className="menu-item">
            <FaChartPie className="icon" />
            <span className="side-label">Dashboard</span>
          </Link>

          <p className="menu-title">Gestión de inventario</p>
          <Link to="/inventario" className="menu-item">
            <FaBox className="icon" />
            <span className="side-label">Inventario</span>
          </Link>
          <Link to="/distribuidores" className="menu-item">
            <FaTruck className="icon" />
            <span className="side-label">Distribuidores</span>
          </Link>
          <Link to="/ventas" className="menu-item">
            <FaFileSignature className="icon" />
            <span className="side-label">Ventas</span>
          </Link>
          <Link to="/ventasHisto" className="menu-item">
            <FaFileInvoice className="icon" />
            <span className="side-label">Historial</span>
          </Link>

          <p className="menu-title">Gestión de clientes y reportes</p>
          <Link to="/clientes" className="menu-item">
            <FaUser className="icon" />
            <span className="side-label">Clientes</span>
          </Link>
          <Link to="/reportes" className="menu-item">
            <FaFileAlt className="icon" />
            <span className="side-label">Reportes</span>
          </Link>
        </div>

        <div className="sidebar-footer">
          <p className="menu-title">Cuenta</p>
          <Link to="/logout" className="menu-item logout">
            <FaSignOutAlt className="icon" />
            <span className="side-label">Cerrar sesión</span>
          </Link>
          <div className="user-info">
            <FaUserCircle className="icon" />
            <span className="side-label">Nombre Usuario</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
