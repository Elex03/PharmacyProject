// src/app/auth/PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./UseAuth";

interface PrivateRouteProps {
  allowedRoles: ("administrador" | "vendedor")[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    // No está logueado, lo mandamos al login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Usuario logueado pero no tiene permiso, lo mandamos al dashboard o a otra ruta
    return <Navigate to="/dashboard" replace />;
  }

  // Usuario autorizado, renderizamos las rutas hijas
  return <Outlet />;
};

export default PrivateRoute;
