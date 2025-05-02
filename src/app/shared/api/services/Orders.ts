import FarmaNovaApi from "../PharmacyApi";

export const getOrdersDetailsData = async (id: number)=> {
  try {
    const response = await FarmaNovaApi.get(`/orders/details/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders data:", error);
    throw error;
  }
};

export const getOrdersDetailsGraph = async (id: number) => {
  try {
    const response = await FarmaNovaApi.get(`/orders/getOrderGraph/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders graph data:", error);
    throw error;
  }
};
