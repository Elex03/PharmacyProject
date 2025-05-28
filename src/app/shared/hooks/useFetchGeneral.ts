import { useEffect, useState } from "react";
import { getMedicineSelect } from "../api/services/Medicine";

interface MedicineSelect {
  id: number;
  label: string;
  value: string;
  precio: number;
}

export const useFetchMedicineSelect = () => {
  const [medicineSelect, setMedicineSelect] = useState<MedicineSelect[]>([]);

  useEffect(() => {
    getMedicineSelect().then((res) => {
      setMedicineSelect(res);
    });
  }, []);

  return {
    medicineSelect
  }

};
