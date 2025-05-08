import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CreateDistributorModal.css";
import NuevaEmpresa from "./CreateCompanieModal";
import { Header } from "../../../shared/components/layout/Header";

interface FormularioProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Formulario: React.FC<FormularioProps> = ({ setIsOpen }) => {
  // const [distribuidor, setDistribuidor] = useState({
  //   nombre: "",
  //   empresa: "",
  //   telefono: "",
  // });
  // const [empresas, setEmpresas] = useState<{ id: number; label: string }[]>([]);
  const [isOpenNuevaEmpresa, setIsOpenNuevaEmpresa] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{ margin: "0 -10px" }}>
            <Header title="Registar nuevo distribuidor" size="1.5rem" />
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                className="action-input"
                placeholder="Ingresa el nombre del medicine"
              />
            </div>
            <div className="form-group">
              <label htmlFor="accion">Acción terapéutica</label>
              <select id="accion" className="action-select">
                <option value="">Seleccionar acción terapéutica</option>
                <option value="analgésico">Analgésico</option>
                <option value="antibiótico">Antibiótico</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                className="action-input"
                placeholder="Ingresa el nombre del medicine"
              />
            </div>
          </div>
          <div className="action-buttons">
            <button
              type="button"
              className="cancel"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </button>
            <input type="submit" value="Guardar" className="save" />
          </div>
        </motion.div>
      </motion.div>

      {isOpenNuevaEmpresa && <NuevaEmpresa setIsOpen={setIsOpenNuevaEmpresa} />}
    </AnimatePresence>
  );
};

export default Formulario;
