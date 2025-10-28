// src/app/auth/AuthProvider.tsx
import React, { useState, useEffect, useCallback } from "react";
import { AuthContext, Role } from "./AuthContext";
import {
  loginRequest,
  refreshTokenRequest,
} from "../shared/api/services/AuthService";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ email: string; role: Role } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 

  const login = async (email: string, password: string) => {
    const { token, refreshToken, role } = await loginRequest(email, password);
    const loggedUser = { email, role };
    setUser(loggedUser);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    sessionStorage.removeItem("initialized");
  };

  const refresh = useCallback(async () => {
    console.log("Función refresh ejecutada");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.log("No hay refresh token, haciendo logout");
      return logout();
    }

    try {
      const data = await refreshTokenRequest(refreshToken);
      console.log("Refresh exitoso, datos:", data);
      const loggedUser = { email: "usuario@guardado.com", role: data.role };
      setUser(loggedUser);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(loggedUser));
    } catch (error) {
      console.log("Refresh token falló, haciendo logout", error);
      logout();
    }
  }, []);

  useEffect(() => {
    console.log("useEffect ejecutado");
    if (import.meta.env.DEV && !sessionStorage.getItem("initialized")) {
      localStorage.clear();
      sessionStorage.setItem("initialized", "true");
    }

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedRefresh = localStorage.getItem("refreshToken");

    console.log({ storedToken, storedUser, storedRefresh });

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setLoading(false);
    } else if (storedRefresh) {
      console.log("No hay token, pero sí refresh token, llamando refresh");
      refresh().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [refresh]);

  if (loading) return <div>Cargando sesión...</div>; 
  
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
