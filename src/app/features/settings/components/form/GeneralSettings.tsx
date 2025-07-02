// src/app/settings/components/GeneralSettings.tsx
import { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
  updateUser,
  changePassword,
} from "../../../../shared/api/services/General";

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
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;
    try {
      await deleteUser(id);
      alert("Usuario eliminado correctamente.");
      fetchUsers();
    } catch (error) {
      alert("Error al eliminar el usuario.");
      console.error(error);
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
    } catch (error) {
      alert("Error al actualizar el usuario.");
      console.error(error);
    }
  };

  const handleChangePassword = async (id: number) => {
    const newPassword = prompt("Nueva contraseña:");
    if (!newPassword) return;

    try {
      await changePassword(id, newPassword);
      alert("Contraseña cambiada.");
    } catch (error) {
      alert("Error al cambiar la contraseña.");
      console.error(error);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (!users.length) return <p>No hay usuarios para mostrar.</p>;

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <table>
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
                <button onClick={() => handleUpdate(id)}>Editar</button>{" "}
                <button onClick={() => handleDelete(id)}>Eliminar</button>{" "}
                <button onClick={() => handleChangePassword(id)}>
                  Contraseña
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
