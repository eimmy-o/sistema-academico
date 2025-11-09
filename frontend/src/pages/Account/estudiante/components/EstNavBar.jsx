// EstNavBar.jsx
import { useState } from "react";
import { StudentTabs } from "./StudentTabs";
import StudentProfile from "../components/StudentProfile";
import { HistorialAcademico } from "../HistorialAcademicoEstudiante";
import { ProfNavBar } from "../../profesor/components/ProfNavBar";


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

  // NUEVO: estado de rol
  const [role, setRole] = useState("estudiante"); // 'estudiante' | 'profesor'
  

  // 2) guardar: actualiza el estado con lo editado
  const handleSave = (patch) => {
    setStudent((prev) => ({ ...prev, ...patch }));
    
    // codigo que usare despues cuando me conecta con la api
    // await api.updateStudent(prev.id, patch);
  };


    // botón para alternar rol
    const toggleRole = () => {
      setRole((r) => (r === "estudiante" ? "profesor" : "estudiante"));
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



      
      {role === "estudiante" ? (

        <>
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
        </>) : (
            <>
              
              {<ProfNavBar/>}

          </>
        )}
    </div> 
  );
};
