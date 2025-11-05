// EstNavBar.jsx
import { useState } from "react";
import { StudentTabs } from "./StudentTabs";
import StudentProfile from "../components/StudentProfile";
import { HistorialAcademico } from "../HistorialAcademicoEstudiante";


// 1) estado en el padre
const initialStudent = {
  firstName: "Juan",
  lastName: "Pérez",
  code: "ABC-123456",
  status: { label: "Activo", tone: "success" },
  scholarshipText: "Becado",
  lastAccess: "12 Oct 2025 · 10:42",  
  photoUrl: "../../src/assets/perfil.png",           // mejor desde /public
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

export const EstNavBar = () => {
  const [activo, setActivo] = useState("informacion-basica");
  const [student, setStudent] = useState(initialStudent);  



  // 2) guardar: actualiza el estado con lo editado
  const handleSave = (patch) => {
    setStudent((prev) => ({ ...prev, ...patch }));
    
    // codigo que usare despues cuando me conecta con la api
    // await api.updateStudent(prev.id, patch);
  };
  
  return (
    <div>
      <StudentTabs active={activo} onChange={setActivo} />

      {activo === "informacion-basica" && (
        <StudentProfile
          student={student}
          onEdit={() => {}}
          onToggleStatus={() => {}}
          onSave={handleSave}
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
