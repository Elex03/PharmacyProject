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

export const getSalesHistoryData = async () => {
  try {
    const response = await ApiFarmaNova.get("/orders/getSales");
    return response.data;
  } catch(error) {
    console.error("Error fetching sales data:", error);
    throw error;
  }
};

export const getBillData = async (id: number) => {
  try {
    const response = await ApiFarmaNova.get(`/orders/getSales/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bill data:", error);
    throw error;
  }
}