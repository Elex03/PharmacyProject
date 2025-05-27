import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import NuevaEmpresa from "./CreateCompanieModal";
import { Header } from "../../../shared/components/layout/Header";
import { useFetchCompanies } from "../hooks/useFetchDistributors";

import "./CreateDistributorModal.css";
import { createDistributor } from "../../../shared/api/services/Distributors";
import { toast } from "react-toastify";

interface FormularioProps {
  setIsOpen: (isOpen: boolean) => void;
}

interface DistributorFormData {
  nombre: string;
  empresa: string;
  telefono: string;
}

const Formulario: React.FC<FormularioProps> = ({ setIsOpen }) => {
  const [isOpenNuevaEmpresa, setIsOpenNuevaEmpresa] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DistributorFormData>();
  const { companiesData } = useFetchCompanies();

  const onSubmit = async (data: DistributorFormData) => {
    const payload = {
      nombre: data.nombre,
      empresa: parseInt(data.empresa, 10),
      telefono: data.telefono,
    };

    toast
      .promise(
        createDistributor(payload),
        {
          pending: "Guardando distribuidor...",
          success: "Distribuidor creado exitosamente",
          error: "Hubo un error al crear el distribuidor",
        },
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      )
      .then(() => {
        setIsOpen(false);
      })
      .catch((err) => {
        console.error("Error creando distribuidor:", err);
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
          <div style={{ margin: "0 -10px" }}>
            <Header title="Registrar nuevo distribuidor" size="1.5rem" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form-grid-CD">
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                id="nombre"
                type="text"
                className="action-input"
                placeholder="Ingresa el nombre del distribuidor"
                {...register("nombre", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.nombre && (
                <p className="error">{errors.nombre.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="empresa">Empresa</label>
              <select
                id="empresa"
                className="action-select"
                {...register("empresa", {
                  required: "Selecciona una empresa",
                  validate: (value) =>
                    value !== "nueva" || "Debes crear una empresa primero",
                })}
                onChange={(e) => {
                  if (e.target.value === "nueva") {
                    setIsOpenNuevaEmpresa(true);
                  }
                }}
              >
                <option value="">Selecciona una empresa</option>
                {companiesData &&
                  companiesData.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.label}
                    </option>
                  ))}
                <option value="nueva">+ Nueva empresa</option>
              </select>
              {errors.empresa && (
                <p className="error">{errors.empresa.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Número de teléfono</label>
              <input
                id="telefono"
                type="text"
                className="action-input"
                placeholder="Ingresa el número de contacto del distribuidor"
                {...register("telefono", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.telefono && (
                <p className="error">{errors.telefono.message}</p>
              )}
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
          </form>
        </motion.div>
      </motion.div>

      {isOpenNuevaEmpresa && <NuevaEmpresa setIsOpen={setIsOpenNuevaEmpresa} />}
    </AnimatePresence>
  );
};

export default Formulario;
