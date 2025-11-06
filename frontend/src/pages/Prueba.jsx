// EstudiantesPage.jsx (versión solo frontend)
import { useState } from "react";
import EstudianteProfile from "../components/estudiantes/EstudianteProfile";

export default function Prueba() {
  // Datos mock (esto reemplaza getEstudiantes())
  const [estudiantes, setEstudiantes] = useState([
    {
      id_estudiante: 1,
      nombre: "Juan",
      apellido: "Pérez",
      matricula: "STU-0001",
      estado: "Activo",
      tipo_estudiante_descripcion: "Becado",
      ultimo_acceso: "12 Oct 2025 • 10:42",

      correo: "juan.perez@adem",
      telefono: "+593 994940102",
      direccion: "Mikasa 1320",
      fecha_nacimiento: "20/10/2010",
      genero: "M",
      tipo_documento: "Cedula",
      num_documento: "0857123456",
      estado_civil: "Divorciado",
    },
    {
      id_estudiante: 2,
      nombre: "Ana",
      apellido: "Gómez",
      matricula: "STU-0002",
      estado: "Activo",
      tipo_estudiante_descripcion: "Regular",
      ultimo_acceso: "11 Oct 2025 • 18:20",

      correo: "ana.gomez@adem",
      telefono: "+593 987654321",
      direccion: "Av. Principal 123",
      fecha_nacimiento: "05/07/2011",
      genero: "F",
      tipo_documento: "Cedula",
      num_documento: "0923344556",
      estado_civil: "Soltera",
    },
  ]);

  // estudiante seleccionado para el panel de la derecha
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(
    estudiantes[0] // arrancamos mostrando el primero para que la derecha no esté vacía
  );


  return (
    <div style={styles.page}>
      {/* Columna derecha: perfil del estudiante seleccionado */}
      <div style={styles.rightColumn}>
        <EstudianteProfile student={estudianteSeleccionado} />
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    alignItems: "flex-start",
    padding: "2rem",
    minHeight: "100vh",
    backgroundColor: "#fafafa",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Poppins', Roboto, 'Segoe UI', sans-serif",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "#fff",
    padding: "1rem 1.5rem",
    borderRadius: "0px",
    border: "1px solid #ddd",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#1a1a1a",
  },
  rightColumn: {
    backgroundColor: "#fff",
    borderRadius: "0px",
    border: "1px solid #ddd",
    padding: "1rem 1.5rem",
  },
};
