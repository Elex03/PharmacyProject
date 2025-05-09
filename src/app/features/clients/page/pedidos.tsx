import { useState, useEffect } from "react";
import Layout from "../../../shared/components/layout/layout";
import { Table } from "../../../shared/components/layout/Table/Table";
import { FaCalendarAlt } from "react-icons/fa";
import FullCalendar, {EventClickArg, DateSelectArg} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { pedidosData } from "../data/pedidosData";
import { headers } from "../headers/headers";
import "../styles/pedidos.css";

const Pedidos = () => {
  const [filteredData] = useState(pedidosData);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [eventModalOpen, setEventModalOpen] = useState(false);

  const [events, setEvents] = useState<any[]>(() => {
    const storedEvents = localStorage.getItem("calendarEvents");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });
  
  const [selectedInfo, setSelectedInfo] = useState<DateSelectArg | null>(null);
  const [editEvent, setEditEvent] = useState<any>(null);
  const [title, setTitle] = useState("");

  const handleDateSelect = (info: DateSelectArg) => {
    setSelectedInfo(info);
    setTitle("");
    setEditEvent(null);
    setEventModalOpen(true);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    setEditEvent(clickInfo.event);
    setTitle(clickInfo.event.title);
    setEventModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (editEvent) {
      setEvents(prevEvents =>
        prevEvents.map(ev =>
          ev.id === editEvent.id ? { ...ev, title } : ev
        )
      );
    } else if (selectedInfo) {
      setEvents([
        ...events,
        {
          id: String(Date.now()),
          title,
          start: selectedInfo.startStr,
          end: selectedInfo.endStr,
          allDay: selectedInfo.allDay,
        },
      ]);
    }
    closeEventModal();
  };
  

  const handleDeleteEvent = () => {
    if (editEvent) {
      setEvents(prevEvents => prevEvents.filter(ev => ev.id !== editEvent.id));
    }
    closeEventModal();
  };

  const closeEventModal = () => {
    setEventModalOpen(false);
    setEditEvent(null);
    setSelectedInfo(null);
    setTitle("");
  };

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  return (
    <Layout title="Lista de Pedidos">
      {/* Botones */}
      <div className="botones-container">
        <div className="botones">
          <button className="btn-calendario" onClick={() => setCalendarModalOpen(true)}>
            <FaCalendarAlt />
            Calendario
          </button>
          <button className="btn-registrar">+ Registrar nuevo</button>
        </div>
      </div>

      {/* Tabla */}
      <Table
        columns={headers}
        data={filteredData}
        itemsPerPage={5}
        linkColumn={{
          label: "✏️, 🗑️",
          idKey: "nombre",
          path: "/producto",
          type: "modal",
        }}
      />

      {/* Modal calendario */}
      {calendarModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setCalendarModalOpen(false)}>✖</button>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"  
              selectable={true}
              select={handleDateSelect}
              events={events}
              eventClick={handleEventClick}
            />
          </div>
        </div>
      )}

      {/* Modal para crear/editar evento */}
      {eventModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content event-modal">
            <h2>{editEvent ? "Editar evento" : "Nuevo evento"}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveEvent(); }}>
              
              <input
                type="text"
                placeholder="Escribe un título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="btn btn-primary">Guardar</button>
                {editEvent && <button type="button" onClick={handleDeleteEvent} className="btn btn-danger">Eliminar</button>}
                <button type="button" onClick={closeEventModal} className="btn btn-secondary">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Pedidos;
