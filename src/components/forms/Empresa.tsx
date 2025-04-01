import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "./Empresa.css";

const NuevaEmpresa: React.FC<{
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsOpen }) => {
  const [empresa, setEmpresa] = useState({ nombre: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpresa((prevState) => ({ ...prevState, [name]: value }));
  };

  const guardarEmpresa = async () => {
    try {
      const response = await fetch("http://localhost:3000/apiFarmaNova/general/createCompany", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empresa),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la empresa");
      }

      Swal.fire({
        title: "¡Guardado!",
        text: "La empresa ha sido guardada con éxito.",
        icon: "success",
      });

      setEmpresa({ nombre: "" });
      setIsOpen(false);
    } catch {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al guardar la empresa.",
        icon: "error",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres guardar esta empresa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      customClass: {
        container: "swal2-container",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        guardarEmpresa();
      }
    });
  };

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
      >
        <h2>Agregar Empresa Nueva</h2>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="form-content">
            <div className="user-details">
              <div className="input-box large">
                <span className="details">Nombre de la empresa *</span>
                <motion.input
                  type="text"
                  name="nombre"
                  value={empresa.nombre}
                  onChange={handleInputChange}
                  required
                  whileFocus={{ scale: 1.05, borderColor: "#3085d6" }}
                />
              </div>
            </div>
          </div>

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
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default NuevaEmpresa;
