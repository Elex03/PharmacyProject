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

export const createMakeSales = async (data: {
  pagaCon: number;
  empleado_fk: number;
  detalle: Array<{
    medicamento_fk: number;
    cantidad: number;
  }>;
}) => {
  try {
    const response = await FarmaNovaApi.post("/general/createMakeSales", data);
    return response.data;
  } catch (error) {
    console.error("Error creating sale:", error);
    throw error;
  }
};
