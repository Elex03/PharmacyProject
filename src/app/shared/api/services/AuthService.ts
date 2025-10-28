import FarmaNovaApi from "../PharmacyApi";

export interface LoginResponse {
  token: string;
  refreshToken: string;
  role: "ADMINISTRADOR" | "EMPLEADO";
}

export const loginRequest = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await FarmaNovaApi.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const refreshTokenRequest = async (refreshToken: string) => {
  try {
    const response = await FarmaNovaApi.post("/auth/refresh-token", {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
