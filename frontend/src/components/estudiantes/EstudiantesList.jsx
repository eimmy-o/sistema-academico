import { useEffect, useState } from "react";
import { getEstudiantes, deleteEstudiante } from "../../api/estudiantes";

function EstudiantesList() {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    getEstudiantes().then((res) => setEstudiantes(res.data));
  }, []);

  const handleDelete = async (id) => {
    await deleteEstudiante(id);
    setEstudiantes(estudiantes.filter((e) => e.id_estudiante !== id));
  };

  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      <ul>
        {estudiantes.map((e) => (
          <li key={e.id_estudiante}>
            {e.usuario?.nombre} {e.usuario?.apellido} — {e.matricula}
            <button onClick={() => handleDelete(e.id_estudiante)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EstudiantesList;
