// // src/app/auth/authApi.ts

// export interface LoginResponse {
//   token: string;
//   refreshToken: string;
// }

// export interface RefreshResponse {
//   token: string;
//   refreshToken: string;
//   role: "ADMINISTRADOR" | "EMPLEADO";
// }

// export const loginReal = async (
//   email: string,
//   password: string
// ): Promise<LoginResponse> => {
//   const response = await fetch("/apiFarmaNova/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) {
//     throw new Error("Credenciales inválidas");
//   }

//   return await response.json();
// };

// export const refreshToken = async (
//   refreshToken: string
// ): Promise<RefreshResponse> => {
//   const response = await fetch("/apiFarmaNova/auth/refresh", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ refreshToken }),
//   });

//   if (!response.ok) {
//     throw new Error("Refresh token inválido o expirado");
//   }

//   return await response.json();
// };
