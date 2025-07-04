import { useEffect, useState } from "react";
import { Table } from "../../../../shared/components/layout/Table/Table";
import { getUsers } from "../../../../shared/api/services/General";
import "../../../../shared/components/layout/Table/Table.css";
import "../../../../shared/styles/shared.css";
import { useModal } from "../../../inventory/hooks/useInventoryState";
import EditUserModal from "./EditUserModal";
import CreateUserModal from "./CreateUserModal";
import "./GeneralSettings.css";

interface User {
  id: number;
  email: string;
  role: string;
  createdAt?: string;
}

export default function GeneralSettings() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const editModal = useModal();
  const createModal = useModal();

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

  const onOpenEditModal = (id: number) => {
    setSelectedUserId(id);
    editModal.onOpen();
  };

  const headers = [
    { header: "ID", key: "id" },
    { header: "Correo", key: "email" },
    { header: "Rol", key: "role" },
  ];

  const tableData: Record<string, unknown>[] = users.map((user) => ({
    id: user.id,
    email: user.email,
    role: user.role,
  }));

  // Encuentra el usuario seleccionado para pasarlo al modal
  const selectedUser = users.find((user) => user.id === selectedUserId) || null;

  if (loading) return <p>Cargando usuarios...</p>;
  if (!users.length) return <p>No hay usuarios para mostrar.</p>;

  return (
    <div className="user-table-container">
      <h2>Lista de Usuarios</h2>

      <button
        onClick={createModal.onOpen}
        className="btn-primary"
        style={{ marginBottom: "1rem" }}
      >
        + Nuevo Usuario
      </button>

      <Table
        columns={headers}
        data={tableData}
        itemsPerPage={10}
        linkColumn={{
          label: "✏️ Editar",
          path: "/usuario",
          idKey: "id",
          type: "modal",
        }}
        onOpenModal={onOpenEditModal}
      />

      {editModal.isOpen && selectedUser && (
        <EditUserModal user={selectedUser} onClose={editModal.onClose} />
      )}

      {createModal.isOpen && <CreateUserModal onClose={createModal.onClose} />}
    </div>
  );
}
