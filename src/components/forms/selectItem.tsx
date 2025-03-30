import React from 'react';


interface MySelectComponentProps {
  options: Option_Selector[];
}

const SelectItem: React.FC<MySelectComponentProps> = ({ options }) => {
  return (
    <select>
      {options.map(option => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectItem;