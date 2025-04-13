import ApiFarmaNova from "../PharmacyApi";

export const getSalesPerWeek = async () => {
  try {
    const response = await ApiFarmaNova.get("inventory/getSalesPerWeek");
    return response.data;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    throw error;
  }
};

