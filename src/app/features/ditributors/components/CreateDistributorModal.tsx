import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NuevaEmpresa from "./CreateCompanieModal";
import { Header } from "../../../shared/components/layout/Header";
import { useFetchCompanies } from "../hooks/useFetchDistributors";

import "./CreateDistributorModal.css";

interface FormularioProps {
  setIsOpen: (isOpen: boolean) => void;
}

interface Distributor {
  nombre: string;
  empresa: number;
  telefono: string;
}

const Formulario: React.FC<FormularioProps> = ({ setIsOpen }) => {
  const [distribuidor, setDistribuidor] = useState<Distributor>({
    nombre: "",
    empresa: 0,
    telefono: "",
  });

  const [isOpenNuevaEmpresa, setIsOpenNuevaEmpresa] = useState(false);

  const { companiesData } = useFetchCompanies();

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
          <div className="form-grid-CD">
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                onChange={(e) =>
                  setDistribuidor((prev) => ({
                    ...prev,
                    nombre: e.target.value,
                  }))
                }
                id="nombre"
                type="text"
                className="action-input"
                placeholder="Ingresa el nombre del medicine"
              />
            </div>
            <div className="form-group">
              <label htmlFor="accion">Empresa</label>
              <select
                id="accion"
                className="action-select"
                onChange={(e) => {
                  if (e.target.value === "nueva") {
                    setIsOpenNuevaEmpresa(true);
                  } else {
                    setDistribuidor((prev) => ({
                      ...prev,
                      empresa: parseInt(e.target.value, 10),
                    }));
                  }
                }}
              >
                {companiesData &&
                  companiesData.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.label}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="nombre">Numero de telefono</label>
              <input
                id="nombre"
                type="text"
                className="action-input"
                placeholder="Ingresa el nombre del medicine"
                onChange={(e) =>
                  setDistribuidor((prev) => ({
                    ...prev,
                    telefono: e.target.value,
                  }))
                }
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
            <input
              type="submit"
              value="Guardar"
              className="save"
              onClick={() => console.log(distribuidor)}
            />
          </div>
        </motion.div>
      </motion.div>

      {isOpenNuevaEmpresa && <NuevaEmpresa setIsOpen={setIsOpenNuevaEmpresa} />}
    </AnimatePresence>
  );
};

export default Formulario;
