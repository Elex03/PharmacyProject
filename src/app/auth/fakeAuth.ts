// src/app/auth/fakeAuth.ts
export type Role = "ADMINISTRADOR" | "EMPLEADO";

export interface User {
  email: string;
  password: string;
  role: Role;
  token: string;
}

const users: User[] = [
  {
    email: "example@gmail.com",
    password: "admin123",
    role: "ADMINISTRADOR",
    token: "admin-token",
  },
  {
    email: "ven@gmail.com",
    password: "ven123",
    role: "EMPLEADO",
    token: "vendedor-token",
  },
];

export const fakeLogin = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    setTimeout(() => {
      if (user) {
        resolve(user);
      } else {
        reject("Credenciales inválidas");
      }
    }, 500);
  });
};
