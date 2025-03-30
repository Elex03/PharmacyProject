import React from "react"; 
// import { Table, message } from "antd"; message.success
import { AddMedicamentsForm } from "../components/forms/AddMedicamentsForm";

const Shopping: React.FC = () => {


  return (
    <div className="shopping-page">
      <h2>Compras</h2>
      <AddMedicamentsForm />
      
      
    </div>
  );
};

export default Shopping;
