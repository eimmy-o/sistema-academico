// EstudiantesPage.jsx
import { useEffect, useState } from "react";
import { getEstudiantes, deleteEstudiante } from "../../api/estudiantes";
import EstudiantesList from "../../components/estudiantes/EstudiantesList";
import EstudianteForm from "../../components/estudiantes/EstudianteForm";
// EstudianteProfile";  esta es la v1
// import StudentProfile from "../../components/estudiantes/EstudianteProfile

// Esta es la version 2
import StudentProfile from "../../components/estudiantes/StudentProfile";



function EstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState([]);

  let student = {
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

  
  const cargarEstudiantes = async () => {
    try {
      const res = await getEstudiantes();
      setEstudiantes(res.data);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
    }
  };

  const eliminarEstudiante = async (id) => {
    try {
      await deleteEstudiante(id);
      cargarEstudiantes(); 
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    }
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  return (
    <div className="page-container">
      {/* <EstudianteForm onEstudianteCreado={cargarEstudiantes} />
      <EstudiantesList
        estudiantes={estudiantes}
        eliminarEstudiante={eliminarEstudiante}
      /> */}
      <StudentProfile
        student={student}
        onEdit={() => alert("Editar perfil")}
        onToggleStatus={() => alert("Cambiar estado")}
    />
    </div>
  );
}

export default EstudiantesPage;
