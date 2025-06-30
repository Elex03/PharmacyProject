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


export const getDistributorsChart = async () => {
  try {
    const response = await FarmaNovaApi.get("/distributors/getdistributors");
    return response.data;
  } catch (error) {
    console.error("Error fetching distributors chart:", error);
    throw error;
  }
}

export const getDistributorsCompany = async () => {
  try {
    const response = await FarmaNovaApi.get("/distributors/getCompanies");
    return response.data;
  } catch (error) {
    console.error("Error fetching distributors:", error);
    throw error;
  }
};

export const createDistributor = async (data: {
  nombre: string;
  empresa: number;
  telefono: string;
}) => {
  try {
    const response = await FarmaNovaApi.post("/distributors", data);
    return response.data;
  } catch (error) {
    console.error("Error creating distributor:", error);
    throw error;
  }
};
