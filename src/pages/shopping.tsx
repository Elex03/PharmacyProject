import React from "react"; 
// import { Table, message } from "antd"; message.success
import { AddMedicamentsForm } from "../components/forms/AddMedicamentsForm";

const Shopping: React.FC = () => {


  return (
    <div className="shopping-page">
      <AddMedicamentsForm />
    </div>
  );
};

export default Shopping;
