import { useEffect, useState } from "react";
import { getDistributorsCompany } from "../../../shared/api/services/Distributors";
import {
  getCompressedforms,
  getTherapeuticAction,
} from "../../../shared/api/services/Medicine";

interface labelI {
  label: string;
  id: number;
}

export const useFetchCompanies = () => {
  const [companiesData, setCompaniesData] = useState<labelI[]>([]);

  useEffect(() => {
    getDistributorsCompany().then((res) => {
      setCompaniesData(res);
    });
  }, []);

  return {
    companiesData,
  };
};

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
