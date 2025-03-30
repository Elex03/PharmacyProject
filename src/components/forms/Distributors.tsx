import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import "./Distributors.css";
import NuevaEmpresa from "./Empresa";

interface FormularioProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Formulario: React.FC<FormularioProps> = ({ setIsOpen }) => {
  const [distribuidor, setDistribuidor] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
  });
  const [empresas, setEmpresas] = useState<{ id: number; nombre: string }[]>([]);
  const [isOpenNuevaEmpresa, setIsOpenNuevaEmpresa] = useState(false);

  useEffect(() => {
    fetch("/empresas.json")
      .then((res) => res.json())
      .then((data) => setEmpresas(data))
      .catch((error) => console.error("Error al cargar empresas:", error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDistribuidor((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres guardar los datos del distribuidor?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Datos del formulario:", JSON.stringify(distribuidor));
        setDistribuidor({ nombre: "", empresa: "", telefono: "" });
        setIsOpen(false);
        Swal.fire({
          title: "¡Guardado!",
          text: "Los datos del distribuidor se han guardado correctamente.",
          icon: "success",
        });
      }
    });
  };

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
          <h2>Agregar Distribuidor Nuevo</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-content">
              <div className="input-box large">
                <span className="details">Nombre del distribuidor *</span>
                <input
                  type="text"
                  name="nombre"
                  value={distribuidor.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box large">
                <span className="details">Empresa a la cual labora *</span>
                <select
                  name="empresa"
                  value={distribuidor.empresa}
                  onChange={(e) => {
                    if (e.target.value === "nueva_empresa") {
                      setIsOpenNuevaEmpresa(true);
                    } else {
                      handleInputChange(e);
                    }
                  }}
                >
                  <option value="" hidden></option>
                  <option value="nueva_empresa">➕ Añadir nueva empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.nombre}>
                      {empresa.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-box large">
                <span className="details">Teléfono</span>
                <input
                  type="text"
                  name="telefono"
                  value={distribuidor.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="buttons">
              <button type="button" onClick={() => setIsOpen(false)}>
                Cancelar
              </button>
              <input type="submit" value="Guardar" className="button-save" />
            </div>
          </form>
        </motion.div>
      </motion.div>

      {isOpenNuevaEmpresa && (
        <NuevaEmpresa setIsOpen={setIsOpenNuevaEmpresa} />
      )}
    </AnimatePresence>
  );
};

export default Formulario;