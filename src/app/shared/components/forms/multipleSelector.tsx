import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import '../../../features/inventory/components/layout/createMedicineForm/BasicInformationForm.css'

interface dataI {
  label: string;
  value: string;
  id: number;
}

interface propsMulti {
  data: dataI[];
}

const animatedComponents = makeAnimated();

export const AnimatedMulti: React.FC<propsMulti> = ({ data }) => {
  const defaultValue = data.map((res) => ({
    label: res.label,
    value: res.value,
  }));

  return (
    <Select
      className="action-select-BasicInformationForm"
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={defaultValue}
      isMulti
      options={data}
    />
  );
};
