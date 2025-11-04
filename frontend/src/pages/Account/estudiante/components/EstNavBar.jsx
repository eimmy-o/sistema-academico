// EstNavBar.jsx
import { useState } from "react";
import { StudentTabs } from "./StudentTabs";
import StudentProfile from "../components/StudentProfile";
import { HistorialAcademico } from "../HistorialAcademicoEstudiante";

export const EstNavBar = () => {
  const [activo, setActivo] = useState("informacion-basica");

  // Ejemplo de datos (usa los tuyos reales)
  const student = {
    firstName: "Juan",
    lastName: "Pérez",
    code: "STU-0001",
    status: { label: "Activo", tone: "success" },
    scholarshipText: "Becado",
    lastAccess: "12 Oct 2025 · 10:42",
    photoUrl: "../src/assets/perfil.png",
    email: "juan.perez@adem.edu",
    phone: "+593 994940102",
    address: "Mikasa 1320",
    birthDate: "2007-10-20",
    gender: "M",
    documentType: "Cédula",
    idNumber: "0857123456",
    maritalStatus: "Divorciado",
    enrollment: "ABC123456",
    enrollmentDate: "2023-10-20",
    province: "Guayas",
    city: "Guayaquil",
  };

  return (
    <div>
      <StudentTabs active={activo} onChange={setActivo} />

      {activo === "informacion-basica" && (
        <StudentProfile
          student={student}
          onEdit={() => {}}
          onToggleStatus={() => {}}
          onSave={(data) => console.log("guardar", data)}
        />
      )}

      {activo === "historial-academico" && (
           <HistorialAcademico/>
      )}


      {activo === "calificaciones" && <section className="card"><p>Cursos inscritos</p></section>}
      {activo === "actividad" && <section className="card"><p>Actividad</p></section>}
    </div>
  );
};
