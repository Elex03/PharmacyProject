import FarmaNovaApi from "../PharmacyApi";


export const getInventoryData = async ({ page, limit }: { page?: number, limit?:number } = { page: 1 , limit: 5}) => {
  try {
    const response = await FarmaNovaApi.get(`/inventory/getInventoryData?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching distributors:", error);
    throw error;
  }
};
