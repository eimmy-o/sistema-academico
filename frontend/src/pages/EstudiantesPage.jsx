// EstudiantesPage.jsx
import { useEffect, useState } from "react";
import { getEstudiantes, deleteEstudiante } from "../api/estudiantes";
import EstudiantesList from "../components/estudiantes/EstudiantesList";
import EstudianteForm from "../components/estudiantes/EstudianteForm";

function EstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState([]);

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
      <EstudianteForm onEstudianteCreado={cargarEstudiantes} />
      <EstudiantesList
        estudiantes={estudiantes}
        eliminarEstudiante={eliminarEstudiante}
      />
    </div>
  );
}

export default EstudiantesPage;
