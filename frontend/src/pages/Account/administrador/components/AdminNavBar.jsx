import { useState } from "react";
import AdministradorProfile from "./AdministradorProfile";

// 1) estado en el padre
const initialAdmin = {
  firstName: "Alberto",
  lastName: "Casablanca",
  code: "A-002",
  status: { label: "Activo", tone: "success" },
  scholarshipText: "Administrador",
  lastAccess: "12 Oct 2025 · 10:42",  
  photoUrl: "../../src/assets/react.svg",           // mejor desde /public
  email: "alberto-casablanca@adem.edu",
  phone: "+593 998546212",
  address: "Mapasingue este",
  birthDate: "1989-12-29",
  gender: "M",
  documentType: "Cédula",
  idNumber: "09874695231",
  maritalStatus: "Divorciado",
  enrollment: "A-002",
  enrollmentDate: "2016-03-15",
  province: "Guayas",
  city: "Guayaquil",
};

export const AdminNavBar = () => {
  const [administrador, setAdmin] = useState(initialAdmin);  



  // 2) guardar: actualiza el estado con lo editado
  const handleSave = (patch) => {
    setAdmin((prev) => ({ ...prev, ...patch }));
    
    // codigo que usare despues cuando me conecta con la api
    // await api.updateStudent(prev.id, patch);
  };
  
  return (
    <div>

        <AdministradorProfile
          administrador={administrador}
          onEdit={() => {}}
          onToggleStatus={() => {}}
          onSave={handleSave}
        />


    </div>
  );
};
