import React from "react";
import { MultiSelect } from "react-multi-select-component";



interface MultipleSelectorProps {
  selected: Option[];
  setSelected: (selected: Option[]) => void;
  options: {
    id: number;
    label: string;
    value: string;
  }[];
  };


const MultipleSelector: React.FC<MultipleSelectorProps> = ({
  selected,
  setSelected,
  options
}) => {
  return (
    <div>
      <label htmlFor="categories">Categories</label>
      <MultiSelect
        options={options}
        value={selected} 
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default MultipleSelector;
