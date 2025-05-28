import ApiFarmanovaApi from "../PharmacyApi";
import { FullMedicineData } from "../../../../types";

export const getCompressedforms = async () => {
  try {
    const response = await ApiFarmanovaApi.get("inventory/getCompressedforms");
    return response.data;
  } catch (error) {
    console.error("Error fetching compressed forms:", error);
    throw error;
  }
};

export const getTherapeuticAction = async () => {
  try {
    const response = await ApiFarmanovaApi.get(
      "medicines/getTherapeuticAction"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Therapeutic Action", error);
    throw error;
  }
};
export const createMedicine = async (
  data: FullMedicineData & { accioTera?: number[]; sintomas?: string[] }
) => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as Blob | string);
        }
      }
    });

    const response = await ApiFarmanovaApi.post(
      "medicines/createMedicine",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating medicine:", error);
    throw error;
  }
};

export const getOneMedicine = async (id: number) => {
  try {
    const response = await ApiFarmanovaApi.get(
      `medicines/getOneMedicine/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching medicine:", error);
    throw error;
  }
};

export const getSymptoms = async () => {
  try {
    const response = await ApiFarmanovaApi.get("medicines/getSymptoms");
    return response.data;
  } catch (error) {
    console.error("Error fetching symptoms:", error);
    throw error;
  }
};

export const getMedicineSelect = async () => {
  try {
    const response = await ApiFarmanovaApi.get("medicines/getMedicineSelect");
    return response.data;
  } catch (error) {
    console.log("Error fetching Medicine", error);
  }
};
