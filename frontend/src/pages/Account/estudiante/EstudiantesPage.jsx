// EstudiantesPage.jsx
import { useEffect, useState } from "react";

import StudentProfile from "./components/StudentProfile";
import { EstNavBar } from "./components/EstNavBar";
import StudentHeader from "./components/StudentHeader";


export const EstudiantesPage = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  let student = {
    firstName: "Juan",
    lastName: "Pérez",
    code: "ABC123456",
    status: { label: "Activo", tone: "success" },
    scholarshipText: "Becado",
    lastAccess: "12 Oct 2025 · 10:42",
    photoUrl: "../../src/assets/perfil.png",
    email: "juan.perez@adem.edu",
    phone: "+593 994940102",
    address: "Mikasa 1320",
    birthDate: "20/10/2007",
    gender: "M",
    documentType: "Cédula",
    idNumber: "0857123456",
    maritalStatus: "Divorciado",
    enrollment: "ABC123456",
    enrollmentDate: "20/10/2023",
    province: "Guayas",
    city: "Guayaquil"
  };

  
  // const cargarEstudiantes = async () => {
  //   try {
  //     const res = await getEstudiantes();
  //     setEstudiantes(res.data);
  //   } catch (error) {
  //     console.error("Error al cargar estudiantes:", error);
  //   }
  // };

  // const eliminarEstudiante = async (id) => {
  //   try {
  //     await deleteEstudiante(id);
  //     cargarEstudiantes(); 
  //   } catch (error) {
  //     console.error("Error al eliminar estudiante:", error);
  //   }
  // };

  // useEffect(() => {
  //   cargarEstudiantes();
  // }, []);

  return (
    
    <div className="page-container">
      <StudentHeader
        photoUrl={student.photoUrl}
        firstName={student.firstName}
        lastName={student.lastName}
        code={student.code}
        status={student.status}
        scholarshipText={student.scholarshipText}
        lastAccess={student.lastAccess}
        onPrimary={() => console.log("editar")}
        primaryLabel="Editar perfil"
      />

        <EstNavBar></EstNavBar>

    </div>
  );
};  

