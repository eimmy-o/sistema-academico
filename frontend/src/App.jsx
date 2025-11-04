import { BrowserRouter, Routes, Route } from "react-router-dom";
import EstudiantesPage from "./pages/estudiantes/EstudiantesPage";
import Home from "./pages/Home";
import Prueba from "./pages/Prueba";
import ThemeToggle from "./components/estudiantes/ThemeToggle";  

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
    {/* <StudentProfile
      student={student}
      onEdit={() => alert("Editar perfil")}
      onToggleStatus={() => alert("Cambiar estado")}
    /> */}
    <EstudiantesPage></EstudiantesPage>
  </>

  );
}

export default App;
