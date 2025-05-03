import { NavLink } from "react-router-dom";
import { ReactNode } from "react";
import "./SideBar.css";
interface SidebarLinkProps {
  to: string;
  icon: ReactNode;
  label: string;
  className?: string;
}
export default function SidebarLink({
  to,
  icon,
  label,
  className = "",
}: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `menu-item ${isActive ? "active" : ""} ${className}`
      }
    >
      <span className="icon-wrapper">{icon}</span>
      <span className="side-label">{label}</span>
    </NavLink>
  );
}
