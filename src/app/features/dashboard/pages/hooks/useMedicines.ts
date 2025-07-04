import { useEffect, useState } from "react";
import { closeToRunningOutMedicines, getMedicineNearestExpiration } from "../../../../shared/api/services/Medicine";

interface MedicineI {
  id: number;
  name: string;
  img: string;
  totalSales: string;
  precio: string;
  stock: number;
}
export const useGetMedicinesNearExpiration = () => {
  const [medicinesNearToExpire, setMedicinesNearToExpire] = useState<MedicineI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMedicineNearestExpiration()
      .then((data) => {
        setMedicinesNearToExpire(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
        setIsLoading(false);
      });
  }, []);

  return {
    medicinesNearToExpire,
    isLoading,
  };
};

export const useGetMedicinesRunningOut = () => {
  const [medicinesRunningOut, setMedicinesRunningOut] = useState<MedicineI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    closeToRunningOutMedicines()
      .then((data) => {
        setMedicinesRunningOut(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
        setIsLoading(false);
      });
  }, []);

  return {
    medicinesRunningOut,
    isLoading,
  };
}