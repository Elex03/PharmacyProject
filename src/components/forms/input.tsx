import React from "react";
import { useInput } from "../hooks/useInput";

interface propsInput {
    label: string, 
    holder: string
}

const Input: React.FC<propsInput> = ({label, holder}) => {
  const { value, onChange } = useInput("");

  return (
    <div>
      <label htmlFor="simpleInput">{`${label}`}</label>
      <input
        id="simpleInput"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={`${holder}`}
      />
    </div>
  );
};

export default Input;