// src/app/auth/fakeAuth.ts
export type Role = "administrador" | "vendedor";

export interface User {
  email: string;
  password: string;
  role: Role;
  token: string;
}

const users: User[] = [
  {
    email: "admin@farma.com",
    password: "admin123",
    role: "administrador",
    token: "admin-token",
  },
  {
    email: "vendedor@farma.com",
    password: "vendedor123",
    role: "vendedor",
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
