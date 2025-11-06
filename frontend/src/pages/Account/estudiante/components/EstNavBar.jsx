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

const initialTeacher = {
  firstName: "María",
  lastName: "Gómez",
  code: "DOC-987654",
  status: { label: "Activo", tone: "success" },
  lastAccess: "06 Nov 2025 · 09:10",
  photoUrl: "../../src/assets/perfilMujer.png",
  email: "maria.gomez@adem.edu",
  phone: "+593 990000000",
  department: "Matemáticas",
  office: "Bloque B - 203",
};


// Componente muy simple de perfil de profesor (placeholder)
function TeacherProfile({ teacher }) {
  return (
    <section className="card">
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <img
          src={teacher.photoUrl}
          alt="Foto del profesor"
          style={{ width: 64, height: 64, borderRadius: "50%" }}
        />
        <div>
          <h3 style={{ margin: 0 }}>
            {teacher.firstName} {teacher.lastName}
          </h3>
          <p style={{ margin: 0, opacity: 0.8 }}>{teacher.department}</p>
          <p style={{ margin: 0, opacity: 0.8 }}>{teacher.email}</p>
        </div>
      </div>

      <hr />
      <ul>
        <li><strong>Código:</strong> {teacher.code}</li>
        <li><strong>Estado:</strong> {teacher.status.label}</li>
        <li><strong>Último acceso:</strong> {teacher.lastAccess}</li>
        <li><strong>Teléfono:</strong> {teacher.phone}</li>
        <li><strong>Oficina:</strong> {teacher.office}</li>
      </ul>
    </section>
  );
}

export const EstNavBar = () => {
  const [activo, setActivo] = useState("informacion-basica");
  const [student, setStudent] = useState(initialStudent);  

  // NUEVO: estado de rol
  const [role, setRole] = useState("estudiante"); // 'estudiante' | 'profesor'
  const [teacher] = useState(initialTeacher);

  // 2) guardar: actualiza el estado con lo editado
  const handleSave = (patch) => {
    setStudent((prev) => ({ ...prev, ...patch }));
    
    // codigo que usare despues cuando me conecta con la api
    // await api.updateStudent(prev.id, patch);
  };


    // botón para alternar rol
    const toggleRole = () => {
      setRole((r) => (r === "estudiante" ? "profesor" : "estudiante"));
      // opcional: cuando cambias de rol, puedes resetear la pestaña activa
      setActivo("informacion-basica");
    };
  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>
          {role === "estudiante" ? "Perfil de Estudiante" : "Perfil de Profesor"}
        </h2>
        <button
          onClick={toggleRole}
          className="btn"
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
          }}
          title="Cambiar entre estudiante y profesor"
        >
          Cambiar a {role === "estudiante" ? "Profesor" : "Estudiante"}
        </button>
      </div>



      <StudentTabs active={activo} onChange={setActivo} />
      {role === "estudiante" ? (
        <>
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
        </>) : (
            <>
              
              {activo === "informacion-basica" && <TeacherProfile teacher={teacher} />}

          </>
        )}
    </div> 
  );
};
