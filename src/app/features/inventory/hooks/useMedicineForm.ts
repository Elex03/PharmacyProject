import { useEffect, useState } from "react";
import {
  getCompressedforms,
  getOneMedicine,
  getSymptoms,
  getTherapeuticAction,
} from "../../../shared/api/services/Medicine";
import type { FullMedicineData } from "../../../../types";
import axios from "axios";

interface labelI {
  label: string;
  value: string;
  id: number;
}

export const useFetchTherapeuticAction = () => {
  const [therapeuticData, setTherapeuticData] = useState<labelI[]>([]);

  useEffect(() => {
    getTherapeuticAction().then((res) => {
      setTherapeuticData(res);
    });
  }, []);

  return {
    therapeuticData,
  };
};

export const useFetchCompressedForm = () => {
  const [compressedForm, setCompressedForm] = useState<labelI[]>([]);

  useEffect(() => {
    getCompressedforms().then((compressedFormResponse) => {
      setCompressedForm(compressedFormResponse);
    });
  }, []);

  return {
    compressedForm,
  };
};

export const useFetchDrugVia = () => {
  const [drugVia, setDrugVia] = useState<labelI[]>([]);

  useEffect(() => {
    axios
      .get("/drugsAdministration.json")
      .then((response) => {
        setDrugVia(response.data);
      })
      .catch((error) => {
        console.error("Error fetching drug via:", error);
      });
  }, []);

  return {
    drugVia,
  };
};

export const useFetchOneMedicine = (id: number) => {
  const [medicineData, setMedicineData] = useState<FullMedicineData | null>(
    null
  );

  useEffect(() => {
    if (id) {
      getOneMedicine(id).then((res) => {
        setMedicineData(res);
      });
    }
  }, [id]);

  return {
    medicineData,
  };
};


interface Tag {
  id: string;
  text: string;
}

export const useFetchSymptoms = () => {
  const [symptoms, setSymptoms] = useState<Tag[]>([]);

  useEffect(() => {
    getSymptoms()
      .then((response) => {
        setSymptoms(response);
      })
      .catch((error) => {
        console.error("Error fetching symptoms:", error);
      });
  }, []);

  return {
    symptoms,
  };
};
