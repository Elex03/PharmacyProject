import FarmaNovaApi from "../PharmacyApi";


export const getInventoryData = async () => {
  try {
    const response = await FarmaNovaApi.get("/inventory/getInventoryData");
    return response;
  } catch (error) {
    console.error("Error fetching distributors:", error);
    throw error;
  }
};
