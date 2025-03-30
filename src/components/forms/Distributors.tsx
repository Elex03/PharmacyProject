import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert2
import "./Distributors.css"; // Importamos los estilos
import NuevaEmpresa from "./Empresa";

const Formulario: React.FC<{
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsOpen }) => {
  const [distribuidor, setDistribuidor] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
  });
  const [empresas, setEmpresas] = useState<{ id: number; nombre: string }[]>(
    []
  );
  const [isOpenNuevaEmpresa, setIsOpenNuevaEmpresa] = useState(false); // Estado para mostrar el otro modal

  useEffect(() => {
    fetch("/empresas.json") // Cargar empresas desde JSON en public
      .then((res) => res.json())
      .then((data) => setEmpresas(data))
      .catch((error) => console.error("Error al cargar empresas:", error));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDistribuidor((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mostrar SweetAlert2 para confirmar si quieren guardar los datos
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres guardar los datos del distribuidor?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, se guardan los datos
        console.log("Datos del formulario:", JSON.stringify(distribuidor));
        setDistribuidor({ nombre: "", empresa: "", telefono: "" });
        setIsOpen(false); // Cerrar modal después de guardar
        Swal.fire({
          title: "¡Guardado!",
          text: "Los datos del distribuidor se han guardado correctamente.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      {/* Modal de agregar distribuidor */}
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Agregar Distribuidor Nuevo</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-content">
              <div className="input-box large">
                <span className="details">Nombre del distribuidor *</span>
                <input
                  type="text"
                  name="nombre"
                  value={distribuidor.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box large">
                <span className="details">Empresa a la cual labora *</span>
                <select
                  name="empresa"
                  value={distribuidor.empresa}
                  onChange={(e) => {
                    if (e.target.value === "nueva_empresa") {
                      setIsOpenNuevaEmpresa(true); // Abrir el modal de Nueva Empresa
                    } else {
                      handleInputChange(e);
                    }
                  }}
                >
                  <option value="" hidden></option>
                  <option value="nueva_empresa">➕ Añadir nueva empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.nombre}>
                      {empresa.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-box large">
                <span className="details">Teléfono</span>
                <input
                  type="text"
                  name="telefono"
                  value={distribuidor.telefono}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="buttons">
              <button type="button" onClick={() => setIsOpen(false)}>
                Cancelar
              </button>
              <input type="submit" value="Guardar" className="button-save" />
            </div>
          </form>
        </div>
      </div>

      {/* Modal de Nueva Empresa */}
      {isOpenNuevaEmpresa && <NuevaEmpresa setIsOpen={setIsOpenNuevaEmpresa} />}
    </>
  );
};

export default Formulario;
