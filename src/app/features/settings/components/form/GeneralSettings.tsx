// src/app/settings/components/GeneralSettings.tsx
import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  updateUser,
  changePassword,
} from "../../../../shared/api/services/General";
import { LuTrash2, LuPencil, LuKeyRound } from "react-icons/lu";
import "./GeneralSettings.css";

interface User {
  id: number;
  email: string;
  role: string;
}

export default function GeneralSettings() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    try {
      await deleteUser(id);
      alert("Usuario eliminado correctamente.");
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      alert("Error al eliminar usuario.");
    }
  };

  const handleUpdate = async (id: number) => {
    const email = prompt("Nuevo correo:");
    const role = prompt("Nuevo rol (ADMINISTRADOR o EMPLEADO):");
    if (!email || !role) return;

    try {
      await updateUser(id, { email, role });
      alert("Usuario actualizado.");
      fetchUsers();
    } catch {
      alert("Error al actualizar usuario.");
    }
  };

  const handleChangePassword = async (id: number) => {
    const newPassword = prompt("Nueva contraseña:");
    if (!newPassword) return;

    try {
      await changePassword(id, newPassword);
      alert("Contraseña cambiada.");
    } catch {
      alert("Error al cambiar contraseña.");
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (!users.length) return <p>No hay usuarios para mostrar.</p>;

  return (
    <div className="user-table-container">
      <h2>Lista de Usuarios</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, email, role }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td>
                <button
                  className="icon-btn edit"
                  onClick={() => handleUpdate(id)}
                >
                  <LuPencil />
                </button>
                <button
                  className="icon-btn delete"
                  onClick={() => handleDelete(id)}
                >
                  <LuTrash2 />
                </button>
                <button
                  className="icon-btn password"
                  onClick={() => handleChangePassword(id)}
                >
                  <LuKeyRound />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
