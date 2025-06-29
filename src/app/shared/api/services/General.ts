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
    const response = await ApiFarmaNova.post("general/createBackup/", {nombre});
    return response.data;
  } catch (error) {
    console.log("Error creating backup", error);
  }
};
export const restoreBackup = async (nombre: string) => {
  try {
    const response = await ApiFarmaNova.post("general/restoreBackup/", {nombre});
    return response.data;
  } catch (error) {
    console.log("Error creating backup", error);
  }
};


export const getItemPerCode = async (id: number) => {
  try {
    const response = await ApiFarmaNova.get(
      `general/getItemPerCode/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching item by code:", error);
    return [];
  }
};