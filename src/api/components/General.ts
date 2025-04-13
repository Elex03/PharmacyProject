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
