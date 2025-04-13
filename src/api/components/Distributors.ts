import FarmaNovaApi from "../PharmacyApi";

export const getDistributors = async () => {
  try {
    const response = await FarmaNovaApi.get("/distributors");
    return response.data;
  } catch (error) {
    console.error("Error fetching distributors:", error);
    throw error;
  }
};
