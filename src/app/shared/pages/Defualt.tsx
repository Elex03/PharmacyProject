// import React, { useState } from "react";
// import "./App.css"; // Importamos el archivo CSS para los estilos

// const Formulario: React.FC = () => {
//   const [distribuidor, setDistribuidor] = useState({
//     nombre: "",
//     empresa: "",
//     telefono: "",
//   });

//   const [isOpen, setIsOpen] = useState(false); // Estado para controlar el modal

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setDistribuidor((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log("Datos del formulario:", JSON.stringify(distribuidor));

//     setDistribuidor({
//       nombre: "",
//       empresa: "",
//       telefono: "",
//     });

//     setIsOpen(false); // Cerrar el modal después de enviar
//   };

//   return (
//     <div>
//       {/* Botón para abrir el modal */}
//       <button onClick={() => setIsOpen(true)} className="button-open">
//         Agregar Distribuidor
//       </button>

//       {/* Modal */}
//       {isOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h2>Agregar Distribuidor Nuevo</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="form-content">
//                 <div className="user-details">
//                   <div className="input-box large">
//                     <span className="details">Nombre del distribuidor *</span>
//                     <input
//                       type="text"
//                       name="nombre"
//                       value={distribuidor.nombre}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="input-box large">
//                     <span className="details">Empresa a la cual labora *</span>
//                     <input
//                       type="text"
//                       name="empresa"
//                       value={distribuidor.empresa}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="input-box large">
//                     <span className="details">Teléfono</span>
//                     <input
//                       type="text"
//                       name="telefono"
//                       value={distribuidor.telefono}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="buttons">
//                 <button
//                   type="button"
//                   className="button-cancel"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Cancelar
//                 </button>
//                 <input type="submit" value="Guardar" className="button-save" />
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Formulario;

import "./Defualt.css";

const UnderConstruction: React.FC = () => {
  return (
    <div className="container-default">
      <div className="image">
        <img src="./construction.svg" alt="Bajo construcción" />
      </div>
      <div className="content">
        <h3 className="tittle">Bajo construcción</h3>
        <p>
          Nuestro sitio web está en construcción, ¡pero estamos listos para
          comenzar! Estamos preparando algo asombroso y emocionante para ti.
          Sorpresa especial en camino.
        </p>
      </div>
    </div>
  );
};

export default UnderConstruction;
