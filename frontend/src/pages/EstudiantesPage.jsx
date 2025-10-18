import EstudianteForm from "../components/estudiantes/EstudianteForm";
import EstudiantesList from "../components/estudiantes/EstudiantesList";

function EstudiantesPage() {
  return (
    <div>
      <h1>Gestión de Estudiantes</h1>
      <EstudianteForm />
      <hr />
      <EstudiantesList />
    </div>
  );
}

export default EstudiantesPage;
