import React from 'react';

export interface Option_Selector {
  id: string;
  value: string;
  label: string;
}

interface MySelectComponentProps {
  options: Option_Selector[];
  onChange?: (value: string) => void;
  value?: string;
}

const SelectItem: React.FC<MySelectComponentProps> = ({ options, onChange, value }) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
      }}
    >
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectItem;
