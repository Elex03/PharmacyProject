import React from "react";
import { motion } from "framer-motion";
import "./CreateCompanieModal.css";

const NuevaEmpresa: React.FC<{
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsOpen }) => {
  // const [empresa, setEmpresa] = useState({ nombre: "" });

  // const HandleChange = (newState: Partial<{ nombre: string }>) => {
  //   setEmpresa((prevState) => ({ ...prevState, ...newState }));
  // };

  return (
    <motion.div
      className="modal-overla"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal-content"
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100vh", opacity: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      ></motion.div>
       <div className="buttons">
            <motion.button
              type="button"
              className="button-cancel"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Cancelar
            </motion.button>
            <motion.input
              type="submit"
              value="Guardar"
              className="button-save"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
    </motion.div>
  );
};

export default NuevaEmpresa;
