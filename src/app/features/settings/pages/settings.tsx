import { useState } from "react";
import Layout from "../../../shared/components/layout/layout";
import "./settings.css";
import { Backup } from "../components/form/Backup";

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
          {activeTab === "general" && (
            <div>
              <h2>Configuración General</h2>
              <p>Aquí puedes gestionar tus ajustes generales.</p>
            </div>
          )}
          {activeTab === "backup" && (
           <Backup/>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Settings;
