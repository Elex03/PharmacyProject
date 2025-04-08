import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input, message, Select, Spin } from "antd";
import MultipleSelector from "./multipleSelector";
import Units from "../../data/units.json";

interface Option {
  id: number;
  value: string;
  label: string;
}

interface NewMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMedicationAdded: () => void;
}

const NewMedicationModal: React.FC<NewMedicationModalProps> = ({
  isOpen,
  onClose,
  onMedicationAdded
}) => {
  const [nombreComercial, setNombreComercial] = useState<string>("");
  const [nombreGenerico, setNombreGenerico] = useState<string>("");

  const [concentracion, setConcentracion] = useState<string>("");
  const [therapeutiAction, setTherapeutiAction] = useState<Option[]>([]);

  const [selected, setSelected] = useState<Option[]>([]);

  const [selecteUnit, setSelecteUnit] = useState<string>("");

  // Nuevo estado para controlar el estado de carga
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectUnit = (value: string) => {
    setSelecteUnit(value);
  };

  useEffect(() => {
    fetch("https://farmanova-api.onrender.com/apiFarmaNova/inventory/getCategories")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los datos");
        return response.json();
      })
      .then((data) => {
        const opts = data.map((item: { id: number; label: string }) => ({
          value: item.id.toString(),
          label: item.label,
          id: item.id,
        }));
        setTherapeutiAction(opts);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selected) {
      message.error("Favor ingresar al menos una categoria");
    } else {
      const medicamentoData = {
        nombreComercial,
        nombreGenerico,
        concentracion: concentracion + selecteUnit,
        categories: selected,
      };

      setLoading(true); // Activa el estado de carga

      try {
        const response = await fetch(
          "https://farmanova-api.onrender.com/apiFarmaNova/inventory/createMedicineCatalog",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(medicamentoData), // Convertimos el objeto a JSON
          }
        );

        if (!response.ok) throw new Error("Error en el envío");
        onMedicationAdded();
        message.success("Medicamento guardado correctamente", 2);
        onClose();
      } catch (error) {
        message.error("Error al enviar los datos");
        console.error("Error:", error);
      } finally {
        setLoading(false); // Desactiva el estado de carga cuando termina la solicitud
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <motion.div
            className="modal-content"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h3>Nuevo Medicamento</h3>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                required
                placeholder="Nombre Comercial"
                value={nombreComercial}
                onChange={(e) => setNombreComercial(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <Input
                type="text"
                required
                placeholder="Nombre Genérico"
                value={nombreGenerico}
                onChange={(e) => setNombreGenerico(e.target.value)}
                style={{ marginBottom: "10px" }}
              />

              <div style={{ flexDirection: "row", display: "flex" }}>
                <Input
                  type="number"
                  required
                  placeholder="Concentración"
                  value={concentracion}
                  onChange={(e) => setConcentracion(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
                <Select
                  options={Units}
                  style={{ width: "100px", marginLeft: "10px" }}
                  onChange={handleSelectUnit}
                  value={selecteUnit}
                />
              </div>

              <MultipleSelector
                selected={selected}
                setSelected={setSelected}
                options={therapeutiAction}
              />

              <div style={{ marginTop: "20px" }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{ marginRight: "10px" }}
                >
                  Cerrar
                </button>
                <button type="submit">
                  {loading ? <Spin /> : "Guardar"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewMedicationModal;
