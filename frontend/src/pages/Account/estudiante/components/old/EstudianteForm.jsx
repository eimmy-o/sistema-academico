// import { useState } from "react";
// import { createEstudiante } from "../../api/estudiantes";
// import "./styles/EstudianteForm.css";
// import "./styles/mainStyles.css";

// function EstudianteForm({ onEstudianteCreado }) {
//   const [matricula, setMatricula] = useState("");
//   const [idUsuario, setIdUsuario] = useState("");
//   const [idTipo, setIdTipo] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     // Validaciones básicas
//     if (!matricula.trim()) {
//       setErrorMsg("La matrícula es obligatoria.");
//       return;
//     }
//     if (!idUsuario) {
//       setErrorMsg("Debes indicar el ID de usuario.");
//       return;
//     }
//     if (!idTipo) {
//       setErrorMsg("Debes indicar el ID del tipo de estudiante.");
//       return;
//     }

//     const payload = {
//       matricula: matricula.trim(),
//       // OJO: las claves deben coincidir exactamente con el serializer
//       id_usuario: Number(idUsuario),
//       id_tipo_estudiante: Number(idTipo),
//       // opcional: estado: "Activo"
//     };

//     try {
//       setLoading(true);
//       await createEstudiante(payload);
//       // limpiar y notificar al padre para recargar
//       setMatricula("");
//       setIdUsuario("");
//       setIdTipo("");
//       onEstudianteCreado && onEstudianteCreado();
//     } catch (err) {
//       // Muestra error del backend si viene validación 400
//       if (err.response?.data) {
//         setErrorMsg(JSON.stringify(err.response.data));
//       } else {
//         setErrorMsg("Error al guardar. Revisa la consola.");
//       }
//       console.error("Error al crear estudiante:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Registrar Estudiante</h2>

//       {errorMsg && <div className="form-error">{errorMsg}</div>}

//       <form onSubmit={onSubmit}>
//         <div className="form-group">
//           <label>Matrícula:</label>
//           <input
//             type="text"
//             value={matricula}
//             onChange={(e) => setMatricula(e.target.value)}
//             placeholder="A0001"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>ID Usuario:</label>
//           <input
//             type="number"
//             value={idUsuario}
//             onChange={(e) => setIdUsuario(e.target.value)}
//             placeholder="5"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>ID Tipo Estudiante:</label>
//           <input
//             type="number"
//             value={idTipo}
//             onChange={(e) => setIdTipo(e.target.value)}
//             placeholder="1"
//             required
//           />
//         </div>

//         <button className="btn-primary" type="submit" disabled={loading}>
//           {loading ? "Guardando..." : "Guardar"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EstudianteForm;