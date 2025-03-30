import React, { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input, message } from "antd";
import MultipleSelector from "./multipleSelector";
import SelectItem from "./selectItem";
import compressedForms from "../../data/compressed_forms.json";

interface Option {
  id: number;
  value: string;
  label: string;
}

interface NewMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewMedicationModal: React.FC<NewMedicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Estados para inputs de texto
  const [nombreComercial, setNombreComercial] = useState<string>("");
  const [nombreGenerico, setNombreGenerico] = useState<string>("");
  const [codigoBarra, setCodigoBarra] = useState<string>("");
  const [concentracion, setConcentracion] = useState<string>("");

  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<Option[]>([]);
  const [selectedForm, setSelectedForm] = useState<string>("");

  // Estado para la imagen: se guarda el archivo y su preview
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/apiFarmaNova/inventory/getCategories")
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
        setOptions(opts);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleSelectItemChange = (value: string) => {
    setSelectedForm(value);
    console.log("Valor seleccionado en SelectItem:", value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Creamos el objeto FormData para incluir la imagen y demás datos
    const formData = new FormData();
    formData.append("nombreComercial", nombreComercial);
    formData.append("nombreGenerico", nombreGenerico);
    formData.append("codigoBarra", codigoBarra);
    formData.append("concentracion", concentracion);
    // Convertimos el array de opciones seleccionadas a JSON
    formData.append("categories", JSON.stringify(selected));
    formData.append("form", selectedForm);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Aquí puedes enviar formData mediante fetch o axios.
    // Ejemplo:
    // fetch("http://localhost:3000/api/medicamentos", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error(error));

    // Para este ejemplo, solo mostramos el contenido en consola.
    console.log("Formulario enviado con:");
    message.success("Medicamento guardado correctamente", 2);
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    // Cerrar el modal después de guardar
    onClose();
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
              <Input
                type="text"
                placeholder="Código de Barras"
                value={codigoBarra}
                required
                onChange={(e) => setCodigoBarra(e.target.value)}
                style={{ marginBottom: "10px" }}
              />
              <Input
                type="number"
                required
                placeholder="Concentración"
                value={concentracion}
                onChange={(e) => setConcentracion(e.target.value)}
                style={{ marginBottom: "10px" }}
              />

              <MultipleSelector
                selected={selected}
                setSelected={setSelected}
                options={options}
              />

              <SelectItem
                options={compressedForms}
                onChange={handleSelectItemChange}
              />

              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100px", height: "100px", marginTop: "10px" }}
                />
              )}

              <div style={{ marginTop: "20px" }}>
                <button type="button" onClick={onClose} style={{ marginRight: "10px" }}>
                  Cerrar
                </button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewMedicationModal;
