import { useEffect, useState } from "react";
import { getMedicineSelect, getMedicineStock } from "../api/services/Medicine";

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

interface GrphicProps {
    descripcion: string; 
    cantidad: number;
}
export const useFetchMedicineStock = () => {
    const [medicineStock, setMedicineStock] = useState<GrphicProps[]>([]);

    useEffect(() => {
        getMedicineStock().then((res) => {
            setMedicineStock(res);
        })
    }, [])

    return {
        medicineStock
    }
}