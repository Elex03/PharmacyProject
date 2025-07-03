// src/app/auth/PrivateRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

interface PrivateRouteProps {
  allowedRoles: ("ADMINISTRADOR" | "EMPLEADO")[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
