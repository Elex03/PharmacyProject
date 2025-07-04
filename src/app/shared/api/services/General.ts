import ApiFarmaNova from "../PharmacyApi";

export const getCategories = async () => {
  try {
    const response = await ApiFarmaNova.get("inventory/getCategories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getBackups = async () => {
  try {
    const response = await ApiFarmaNova.get("general/getBackups");
    return response.data;
  } catch (error) {
    console.log("Error fetching Backups", error);
  }
};

export const createBackup = async (nombre: string) => {
  try {
    const response = await ApiFarmaNova.post("general/createBackup/", {
      nombre,
    });
    return response.data;
  } catch (error) {
    console.log("Error creating backup", error);
  }
};
export const restoreBackup = async (nombre: string) => {
  try {
    const response = await ApiFarmaNova.post("general/restoreBackup/", {
      nombre,
    });
    return response.data;
  } catch (error) {
    console.log("Error creating backup", error);
  }
};

export const getItemPerCode = async (id: number) => {
  try {
    const response = await ApiFarmaNova.get(`general/getItemPerCode/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching item by code:", error);
    return [];
  }
};

export const getUsers = async () => {
  const response = await ApiFarmaNova.get("/auth/users");
  return response.data; // arreglo de usuarios
};

export async function updateUser(
  id: number,
  userData: { email?: string; role?: string }
) {
  const response = await ApiFarmaNova.put(`/auth/users/${id}`, userData);
  return response.data;
}

export async function deleteUser(id: number) {
  const response = await ApiFarmaNova.delete(`/auth/users/${id}`);
  return response.data;
}

export async function changePassword(id: number, newPassword: string) {
  const response = await ApiFarmaNova.put(`/auth/users/${id}/change-password`, {
    newPassword,
  });
  return response.data;
}

export const registerUser = async (payload: {
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await ApiFarmaNova.post("/auth/register", payload);
    return response.data;
  } catch (error) {
    console.error("Error registrando usuario:", error);
    throw error;
  }
};
