import React from "react"; 
import { AddMedicamentsForm } from "../components/forms/AddMedicamentsForm";

const Shopping: React.FC = () => {


  return (
    <div className="shopping-page" style={{width: '90vw'}}>
      <AddMedicamentsForm />
    </div>
  );
};

export default Shopping;
