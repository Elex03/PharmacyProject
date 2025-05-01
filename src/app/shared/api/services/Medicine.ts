import ApiFarmanovaApi from "../PharmacyApi";

export const getMedicines = async () => {
  try {
    const response = await ApiFarmanovaApi.get("inventory/getMedicine");
    return response.data;
  } catch (error) {
    console.error("Error fetching medicines:", error);
    throw error;
  }
};

export const getCompressedforms = async () => {
  try {
    const response = await ApiFarmanovaApi.get("inventory/getCompressedforms");
    return response.data;
  } catch (error) {
    console.error("Error fetching compressed forms:", error);
    throw error;
  }
};
