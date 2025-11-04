import { BrowserRouter, Routes, Route } from "react-router-dom";
import EstudiantesPage from "./pages/EstudiantesPage";
import Home from "./pages/Home";
import Prueba from "./pages/Prueba";
import StudentProfile from "./pages/estudiantes/studentProfile/StudentProfile";
import ThemeToggle from ".//pages/estudiantes/studentProfile/ThemeToggle";  
const student = {
  firstName: "Juan",
  lastName: "Pérez",
  code: "STU-0001",
  status: { label: "Activo", tone: "success" },
  scholarshipText: "Becado",
  lastAccess: "12 Oct 2025 · 10:42",
  photoUrl: "https://i.pravatar.cc/160?img=4",
  email: "juan.perez@adem.edu",
  phone: "+593 994940102",
  address: "Mikasa 1320",
  birthDate: "20/10/2007",
  gender: "M",
  idNumber: "0857123456",
  maritalStatus: "Divorciado",
  enrollment: "ABC123456",
};

function App() {

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/estudiantes" element={<EstudiantesPage />} />
    //     <Route path="/prueba" element={<Prueba/>} />
    //   </Routes>
    // </BrowserRouter>

    <>
    <ThemeToggle />  
    <StudentProfile
      student={student}
      onEdit={() => alert("Editar perfil")}
      onToggleStatus={() => alert("Cambiar estado")}
    />
  </>

  );
}

export default App;
