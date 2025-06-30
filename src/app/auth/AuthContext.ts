// src/app/auth/AuthContext.ts
import { createContext } from "react";

export type Role = "ADMINISTRADOR" | "EMPLEADO";

export interface AuthContextType {
  user: { email: string; role: Role } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
