import { motion } from "framer-motion";
import { useNotifications } from "../hooks/useNotifications";
import "./ModalNotifications.css";
import { API_URL } from "../../../shared/components/config";

interface ModalNotificationsProps {
  show: boolean;
  onClose: () => void;
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

export const ModalNotifications: React.FC<ModalNotificationsProps> = ({
  show,
  onClose,
  selectedTab,
  onSelectTab,
}) => {
  const { notificaciones, guardarNotificaciones, marcarTodasComoLeidas } =
    useNotifications();

  if (!show) return null;

  const filteredMedicamentos =
    selectedTab === "general"
      ? notificaciones
      : notificaciones.filter((med) => med.tipoAviso === selectedTab);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const marcarUnaComoLeida = (index: number) => {
    const nuevas = [...notificaciones];
    nuevas.splice(index, 1);
    guardarNotificaciones(nuevas);
  };

  const getTiempoTranscurrido = (iso: string) => {
    const ahora = new Date();
    const fecha = new Date(iso);
    const diff = Math.max(0, ahora.getTime() - fecha.getTime());

    const minutos = Math.floor(diff / (1000 * 60)) % 60;
    const horas = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));

    const partes = [];
    if (dias > 0) partes.push(`${dias} día${dias > 1 ? "s" : ""}`);
    if (horas > 0) partes.push(`${horas} hora${horas > 1 ? "s" : ""}`);
    if (minutos > 0) partes.push(`${minutos} minuto${minutos > 1 ? "s" : ""}`);

    return partes.length > 0
      ? `Hace ${partes.join(", ")}`
      : "Hace menos de 1 minuto";
  };

  return (
    <motion.div
      className="modal-overlay-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 400, width: "100%", borderRadius: 12 }}
      >
        <div className="card-5-2">
          <div className="card-5-top-2">
            <div className="left-2">Notificaciones</div>
            <div
              className="center-2"
              onClick={marcarTodasComoLeidas}
              style={{ cursor: "pointer" }}
            >
              Marcar como leídas
            </div>
            <div className="show">
              {["general", "stock", "vencimiento"].map((tab) => (
                <div
                  key={tab}
                  className={`show-tab ${selectedTab === tab ? "active" : ""}`}
                  onClick={() => onSelectTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </div>
              ))}
            </div>
          </div>

          <div className="body-2">
            {filteredMedicamentos.map((med, index) => {
              let infoExtra = "";

              console.log(med.img);

              if (med.tipoAviso === "vencimiento") {
                infoExtra = `Se vence el ${formatDate(med.fechaVencimiento)}`;
              } else if (med.tipoAviso === "stock") {
                infoExtra = `Stock actual: ${med.stock} unidades`;
              }

              return (
                <div key={index} className="card-noti-2">
                  <div className="noti-icon-2">
                    <img src={API_URL + med.img} alt={med.img} />
                  </div>
                  <div className="noti-info-2">
                    <div className="info-top-2">
                      {med.nombre}{" "}
                      <div
                        style={{
                          padding: "0px",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "right",
                          marginLeft: "0px",
                          color: "gray",
                          fontSize: "14px",
                        }}
                      >
                        {getTiempoTranscurrido(med.fechaProgramada)}
                      </div>
                    </div>
                    <div className="info-botton-2">
                      {infoExtra}
                      {infoExtra && med.tipoAviso ? " • " : ""}
                      {med.tipoAviso}
                      <div
                        className="leida"
                        onClick={() => marcarUnaComoLeida(index)}
                        style={{
                          marginLeft: "0px",
                          padding: "0px 0px",
                          fontSize: "12px",
                          cursor: "pointer",
                          position: "relative",
                          top: "2px",
                        }}
                      >
                        Leída
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
