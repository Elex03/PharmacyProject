import { useState } from "react";
import { useFetchBackups } from "../../hooks/useFetchBackups";
import "../../../../shared/components/layout/Table/Table.css";
import { Table } from "../../../../shared/components/layout/Table/Table";
import {
  createBackup,
  restoreBackup,
} from "../../../../shared/api/services/General";

export const Backup = () => {
  const [backupName, setBackupName] = useState("");

  const { backups, headers } = useFetchBackups();

  const handleRestore = async (backupNameSelect: string) => {
    restoreBackup(backupNameSelect).then(() =>
      console.log("Backup was restore")
    );
  };

  const handleCreateBackup = async () => {
    if (!backupName.trim()) return;

    createBackup(backupName).then(() => console.log("Backup was created"));
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
            type: "button",
            onClick: handleRestore,
          }}
        />
      </div>
    </div>
  );
};
