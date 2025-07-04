import React from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../../../../shared/components/layout/Header";
import {
  updateUser,
  changePassword,
} from "../../../../shared/api/services/General";
import { toast } from "react-toastify";
import "./EditUserModal.css";

interface EditUserModalProps {
  onClose: () => void;
  user: {
    id: number;
    email: string;
    role: string;
  };
}

interface FormData {
  email: string;
  role: string;
  password: string;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ onClose, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: user.email,
      role: user.role,
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateUser(user.id, {
        email: data.email,
        role: data.role,
      });

      if (data.password.trim() !== "") {
        await changePassword(user.id, data.password);
      }

      toast.success("Usuario actualizado correctamente");
      onClose();
    } catch (error) {
      toast.error("Hubo un error al actualizar el usuario");
      console.error("Error actualizando usuario:", error);
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
          <Header title="Editar usuario" size="1.5rem" />

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
              <label htmlFor="password">Nueva contraseña</label>
              <input
                id="password"
                type="password"
                className="action-input"
                placeholder="Opcional"
                {...register("password")}
              />
            </div>

            <div className="action-buttons">
              <button type="button" className="cancel" onClick={onClose}>
                Cancelar
              </button>
              <input type="submit" value="Guardar" className="save" />
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditUserModal;
