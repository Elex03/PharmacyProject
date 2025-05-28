import { useState } from "react";
import { useFetchBackups } from "../../hooks/useFetchBackups";
import "../../../../shared/components/layout/Table/Table.css";
import { Table } from "../../../../shared/components/layout/Table/Table";
import {
  createBackup,
  restoreBackup,
} from "../../../../shared/api/services/General";
import { Header } from "../../../../shared/components/layout/Header";
import "../../../../shared/styles/shared.css"


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
      <div style={{marginBottom: "20px"}}>
        <Header title="Gestión de Backups" />
      </div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", padding: "10px" }}>
        <input
          type="text"
          value={backupName}
          style={{padding: "10px", width: "100%"}}
          onChange={(e) => setBackupName(e.target.value)}
          placeholder="Nombre del backup"
        />
        <button onClick={handleCreateBackup}
          className="button-action"
        >Generar backup</button>
      </div>
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
