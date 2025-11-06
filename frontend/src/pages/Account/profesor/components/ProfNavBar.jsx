// EstNavBar.jsx
import { useState } from "react";
import { ProfessorTabs } from "./ProfessorTabs";
import ProfessorProfile from "./ProfessorProfile";
import { ProfessorHistorial } from "./ProfessorHistorial";


// 1) estado en el padre
const initialProfessor = {
  firstName: "Alejandra",
  lastName: "Gomez",
  code: "PCR-354978",
  status: { label: "Activo", tone: "success" },
  scholarshipText: "Profesor",
  lastAccess: "12 Oct 2025 · 10:42",  
  photoUrl: "../../src/assets/perfilMujer.png",           // mejor desde /public
  email: "alejan-gomez@adem.edu",
  phone: "+593 998746234",
  address: "Isla trinitaria",
  birthDate: "1999-12-29",
  gender: "F",
  documentType: "Cédula",
  idNumber: "1315648",
  maritalStatus: "Casada",
  enrollment: "PCR-146879",
  enrollmentDate: "2018-03-14",
  province: "Guayas",
  city: "Guayaquil",
};

export const ProfNavBar = () => {
  const [activo, setActivo] = useState("informacion-basica");
  const [professor, setProfessor] = useState(initialProfessor);  



  // 2) guardar: actualiza el estado con lo editado
  const handleSave = (patch) => {
    setProfessor((prev) => ({ ...prev, ...patch }));
    
    // codigo que usare despues cuando me conecta con la api
    // await api.updateStudent(prev.id, patch);
  };
  
  return (
    <div>
      <ProfessorTabs active={activo} onChange={setActivo} />

      {activo === "informacion-basica" && (
        <ProfessorProfile
          professor={professor}
          onEdit={() => {}}
          onToggleStatus={() => {}}
          onSave={handleSave}
        />
      )}

      {activo === "historial-academico" && (
        <ProfessorHistorial/>
      )}

    </div>
  );
};
