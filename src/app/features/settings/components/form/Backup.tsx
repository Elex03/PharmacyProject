import { useState } from "react";
import { useFetchBackups } from "../../hooks/useFetchBackups";
import "../../../../shared/components/layout/Table/Table.css";
import { Table } from "../../../../shared/components/layout/Table/Table";

export const Backup = () => {
  const [backupName, setBackupName] = useState("");

  const { backups, headers } = useFetchBackups();

  //   const handleRestore = async (filename: string) => {
  //     // Llamar a la API para restaurar
  //     await fetch(`/api/backup/restore?file=${filename}`, { method: "POST" });
  //     alert(`Backup ${filename} restaurado`);
  //   };

  const handleCreateBackup = async () => {
    if (!backupName.trim()) return;
    await fetch(`/api/backup?name=${backupName}`, { method: "POST" });
    setBackupName("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Gestión de Backups</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={backupName}
          onChange={(e) => setBackupName(e.target.value)}
          placeholder="Nombre del backup"
        />
        <button onClick={handleCreateBackup}>Generar backup</button>
      </div>

      <h3>Lista de backups</h3>
      <div style={{ width: "100%" }}>
        <Table
          data={backups}
          columns={headers}
          itemsPerPage={10}
          linkColumn={{
            label: "Restarurar",
            type: "modal",
          }}
        />
      </div>
    </div>
  );
};
