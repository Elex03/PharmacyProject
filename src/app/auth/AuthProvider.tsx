// src/app/auth/AuthProvider.tsx
import React, { useState, useEffect } from "react";
import { AuthContext, Role } from "./AuthContext"; // <-- importá Role y AuthContext, no AuthContextType

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ email: string; role: Role } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // 🔥 Solo para desarrollo: limpia el localStorage
    if (import.meta.env.DEV) {
      localStorage.clear();
    }

    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { role, token } = await (
      await import("./FakeAuth")
    ).fakeLogin(email, password);
    const loggedUser = { email, role };
    setUser(loggedUser);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
