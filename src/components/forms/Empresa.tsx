import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Empresa.css"; // Importamos el archivo CSS para los estilos

const NuevaEmpresa: React.FC<{
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsOpen }) => {
  const [empresa, setEmpresa] = useState({ nombre: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpresa((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres guardar esta empresa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      customClass: {
        container: "swal2-container", // Asegura que esté por encima del modal
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Datos del formulario:", JSON.stringify(empresa));

        setEmpresa({ nombre: "" });
        setIsOpen(false); // Cerrar modal

        Swal.fire({
          title: "¡Guardado!",
          text: "La empresa ha sido guardada con éxito.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      {/* Modal */}
      <div className="modal-overla">
        <div className="modal-content">
          <h2>Agregar Empresa Nueva</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-content">
              <div className="user-details">
                <div className="input-box large">
                  <span className="details">Nombre de la empresa *</span>
                  <input
                    type="text"
                    name="nombre"
                    value={empresa.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="buttons">
              <button
                type="button"
                className="button-cancel"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
              <input type="submit" value="Guardar" className="button-save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevaEmpresa;
