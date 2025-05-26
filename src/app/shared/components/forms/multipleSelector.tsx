import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFormContext, Controller } from "react-hook-form";

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
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="accioTera"
      defaultValue={[]}
      render={({ field: { onChange, value } }) => (
        <Select
          className="action-select-BasicInformationForm"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={data}
          getOptionLabel={(e) => e.label}
          getOptionValue={(e) => e.id.toString()}
          value={data.filter(d => value.includes(d.id))}
          onChange={(selectedOptions) => {
            const selectedIds = Array.isArray(selectedOptions)
              ? selectedOptions.map((option) => option.id)
              : [];
            onChange(selectedIds); 
           
          }}
        />
      )}
    />
  );
};
