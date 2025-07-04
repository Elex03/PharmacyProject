import React from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../../../shared/components/layout/Header";
import { registerUser } from "../../../../shared/api/services/General";
import { toast } from "react-toastify";

import "./EditUserModal.css"; // Puedes usar mismo CSS que EditUserModal

interface CreateUserModalProps {
  onClose: () => void;
}

interface FormData {
  email: string;
  role: string;
  password: string;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      role: "EMPLEADO",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser({
        email: data.email,
        role: data.role,
        password: data.password,
      });

      toast.success("Usuario creado correctamente");
      onClose();
    } catch (error) {
      toast.error("Hubo un error al crear el usuario");
      console.error("Error creando usuario:", error);
    }
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
          <Header title="Crear nuevo usuario" size="1.5rem" />

          <form onSubmit={handleSubmit(onSubmit)} className="form-grid-CD">
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                className="action-input"
                placeholder="Correo del usuario"
                {...register("email", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Correo inválido",
                  },
                })}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="role">Rol</label>
              <select
                id="role"
                className="action-select"
                {...register("role", {
                  required: "Selecciona un rol",
                })}
              >
                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                <option value="EMPLEADO">EMPLEADO</option>
              </select>
              {errors.role && <p className="error">{errors.role.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                className="action-input"
                placeholder="Contraseña"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                })}
              />
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <div className="action-buttons">
              <button type="button" className="cancel" onClick={onClose}>
                Cancelar
              </button>
              <input type="submit" value="Crear" className="save" />
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateUserModal;
