import { useState } from "react";
import Layout from "../../../shared/components/layout/layout";
import "./settings.css";
import { Backup } from "../components/form/Backup";
import GeneralSettings from "../components/form/GeneralSettings"; // ✅ IMPORTACIÓN CORRECTA

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <Layout title="Configuraciones">
      <div className="settings-container">
        <aside className="settings-sidebar">
          <button
            className={`tab-button ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`tab-button ${activeTab === "backup" ? "active" : ""}`}
            onClick={() => setActiveTab("backup")}
          >
            Copia de respaldo
          </button>
        </aside>
        <main className="settings-content">
          {activeTab === "general" && <GeneralSettings />}{" "}
          {/* ✅ MOSTRAR TABLA DE USUARIOS */}
          {activeTab === "backup" && <Backup />}
        </main>
      </div>
    </Layout>
  );
};

export default Settings;
