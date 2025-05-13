import FarmaNovaApi from "../PharmacyApi";

export const getMakeSales = async () => {
  try {
    const response = await FarmaNovaApi.get("/general/getMakeSales");
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
