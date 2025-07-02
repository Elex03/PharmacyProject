// src/app/shared/api/PharmacyApi.ts
import axios from "axios";
import { API_URL } from "../components/config";
import { refreshTokenRequest } from "./services/AuthService";

// Crea la instancia de Axios
const FarmaNovaApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agrega el token en cada request automáticamente
FarmaNovaApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores y hacer refresh
FarmaNovaApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const data = await refreshTokenRequest(refreshToken);
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem(
          "user",
          JSON.stringify({ email: "usuario@guardado.com", role: data.role })
        );

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return FarmaNovaApi(originalRequest);
      } catch {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default FarmaNovaApi;
