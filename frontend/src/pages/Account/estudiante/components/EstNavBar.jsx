// EstNavBar.jsx
import { useState } from "react";
import { StudentTabs } from "./StudentTabs";
import StudentProfile from "../components/StudentProfile";
import { HistorialAcademico } from "../HistorialAcademicoEstudiante";
import EstudiantesList from "./EstudiantesList";


// datos de prueba para la pestaña Personas
const mockEstudiantes = [
  {
    id_estudiante: 1,
    matricula: "MAT0001",
    usuario: { nombre: "Ana", apellido: "García", correo: "ana.garcia1@ejemplo.com" },
    tipo_estudiante: { descripcion: "Regular" },
  },
  {
    id_estudiante: 2,
    matricula: "MAT0002",
    usuario: { nombre: "Luis", apellido: "López", correo: "luis.lopez2@ejemplo.com" },
    tipo_estudiante: { descripcion: "Becado" },
  },
  {
    id_estudiante: 3,
    matricula: "MAT0003",
    usuario: { nombre: "María", apellido: "Rodríguez", correo: "maria.rodriguez3@ejemplo.com" },
    tipo_estudiante: { descripcion: "Intercambio" },
  },
  {
    id_estudiante: 4,
    matricula: "MAT0004",
    usuario: { nombre: "Carlos", apellido: "Hernández", correo: "carlos.hernandez4@ejemplo.com" },
    tipo_estudiante: { descripcion: "Especial" },
  },
  {
    id_estudiante: 5,
    matricula: "MAT0005",
    usuario: { nombre: "Sofía", apellido: "Martínez", correo: "sofia.martinez5@ejemplo.com" },
    tipo_estudiante: { descripcion: "Postgrado" },
  },
  {
    id_estudiante: 6,
    matricula: "MAT0006",
    usuario: { nombre: "Diego", apellido: "Gómez", correo: "diego.gomez6@ejemplo.com" },
    tipo_estudiante: { descripcion: "Regular" },
  },
  {
    id_estudiante: 7,
    matricula: "MAT0007",
    usuario: { nombre: "Valentina", apellido: "Díaz", correo: "valentina.diaz7@ejemplo.com" },
    tipo_estudiante: { descripcion: "Becado" },
  },
  {
    id_estudiante: 8,
    matricula: "MAT0008",
    usuario: { nombre: "Jorge", apellido: "Pérez", correo: "jorge.perez8@ejemplo.com" },
    tipo_estudiante: { descripcion: "Intercambio" },
  },
  {
    id_estudiante: 9,
    matricula: "MAT0009",
    usuario: { nombre: "Lucía", apellido: "Torres", correo: "lucia.torres9@ejemplo.com" },
    tipo_estudiante: { descripcion: "Especial" },
  },
  {
    id_estudiante: 10,
    matricula: "MAT0010",
    usuario: { nombre: "Mateo", apellido: "Sánchez", correo: "mateo.sanchez10@ejemplo.com" },
    tipo_estudiante: { descripcion: "Postgrado" },
  },
  {
    id_estudiante: 11,
    matricula: "MAT0011",
    usuario: { nombre: "Camila", apellido: "Ramírez", correo: "camila.ramirez11@ejemplo.com" },
    tipo_estudiante: { descripcion: "Regular" },
  },
  {
    id_estudiante: 12,
    matricula: "MAT0012",
    usuario: { nombre: "Andrés", apellido: "Flores", correo: "andres.flores12@ejemplo.com" },
    tipo_estudiante: { descripcion: "Becado" },
  },
  {
    id_estudiante: 13,
    matricula: "MAT0013",
    usuario: { nombre: "Paula", apellido: "Castro", correo: "paula.castro13@ejemplo.com" },
    tipo_estudiante: { descripcion: "Intercambio" },
  },
  {
    id_estudiante: 14,
    matricula: "MAT0014",
    usuario: { nombre: "Sebastián", apellido: "Molina", correo: "sebastian.molina14@ejemplo.com" },
    tipo_estudiante: { descripcion: "Especial" },
  },
  {
    id_estudiante: 15,
    matricula: "MAT0015",
    usuario: { nombre: "Elena", apellido: "Vargas", correo: "elena.vargas15@ejemplo.com" },
    tipo_estudiante: { descripcion: "Postgrado" },
  },
  {
    id_estudiante: 16,
    matricula: "MAT0016",
    usuario: { nombre: "Tomás", apellido: "Rojas", correo: "tomas.rojas16@ejemplo.com" },
    tipo_estudiante: { descripcion: "Regular" },
  },
  {
    id_estudiante: 17,
    matricula: "MAT0017",
    usuario: { nombre: "Isabella", apellido: "Navarro", correo: "isabella.navarro17@ejemplo.com" },
    tipo_estudiante: { descripcion: "Becado" },
  },
  {
    id_estudiante: 18,
    matricula: "MAT0018",
    usuario: { nombre: "Fernando", apellido: "Cortés", correo: "fernando.cortes18@ejemplo.com" },
    tipo_estudiante: { descripcion: "Intercambio" },
  },
  {
    id_estudiante: 19,
    matricula: "MAT0019",
    usuario: { nombre: "Gabriela", apellido: "Peña", correo: "gabriela.pena19@ejemplo.com" },
    tipo_estudiante: { descripcion: "Especial" },
  },
  {
    id_estudiante: 20,
    matricula: "MAT0020",
    usuario: { nombre: "Ricardo", apellido: "Silva", correo: "ricardo.silva20@ejemplo.com" },
    tipo_estudiante: { descripcion: "Postgrado" },
  },
  {
    id_estudiante: 21,
    matricula: "MAT0021",
    usuario: { nombre: "Daniela", apellido: "Ibarra", correo: "daniela.ibarra21@ejemplo.com" },
    tipo_estudiante: { descripcion: "Regular" },
  },
  {
    id_estudiante: 22,
    matricula: "MAT0022",
    usuario: { nombre: "Pablo", apellido: "Vega", correo: "pablo.vega22@ejemplo.com" },
    tipo_estudiante: { descripcion: "Becado" },
  },
  {
    id_estudiante: 23,
    matricula: "MAT0023",
    usuario: { nombre: "Renata", apellido: "Campos", correo: "renata.campos23@ejemplo.com" },
    tipo_estudiante: { descripcion: "Intercambio" },
  },
  {
    id_estudiante: 24,
    matricula: "MAT0024",
    usuario: { nombre: "Hugo", apellido: "Fuentes", correo: "hugo.fuentes24@ejemplo.com" },
    tipo_estudiante: { descripcion: "Especial" },
  },
  {
    id_estudiante: 25,
    matricula: "MAT0025",
    usuario: { nombre: "Mónica", apellido: "Salazar", correo: "monica.salazar25@ejemplo.com" },
    tipo_estudiante: { descripcion: "Postgrado" },
  },
  {
    id_estudiante: 26,
    matricula: "MAT0026",
    usuario: { nombre: "Javier", apellido: "Carrillo", correo: "javier.carrillo26@ejemplo.com" },
    tipo_estudiante: { descripcion: "Regular" },
  },
  {
    id_estudiante: 27,
    matricula: "MAT0027",
    usuario: { nombre: "Natalia", apellido: "Acosta", correo: "natalia.acosta27@ejemplo.com" },
    tipo_estudiante: { descripcion: "Becado" },
  },
  {
    id_estudiante: 28,
    matricula: "MAT0028",
    usuario: { nombre: "Rodrigo", apellido: "Miranda", correo: "rodrigo.miranda28@ejemplo.com" },
    tipo_estudiante: { descripcion: "Intercambio" },
  },
  {
    id_estudiante: 29,
    matricula: "MAT0029",
    usuario: { nombre: "Ariana", apellido: "Ríos", correo: "ariana.rios29@ejemplo.com" },
    tipo_estudiante: { descripcion: "Especial" },
  },
  {
    id_estudiante: 30,
    matricula: "MAT0030",
    usuario: { nombre: "Felipe", apellido: "Cruz", correo: "felipe.cruz30@ejemplo.com" },
    tipo_estudiante: { descripcion: "Postgrado" },
  },
  {
    id_estudiante: 31,
    matricula: "MAT0031",
    usuario: { nombre: "Ximena", apellido: "Luna", correo: "ximena.luna31@ejemplo.com" },
    tipo_estudiante: { descripcion: "Regular" },
  },
  {
    id_estudiante: 32,
    matricula: "MAT0032",
    usuario: { nombre: "Mauricio", apellido: "Pardo", correo: "mauricio.pardo32@ejemplo.com" },
    tipo_estudiante: { descripcion: "Becado" },
  },
  {
    id_estudiante: 33,
    matricula: "MAT0033",
    usuario: { nombre: "Patricia", apellido: "Reyes", correo: "patricia.reyes33@ejemplo.com" },
    tipo_estudiante: { descripcion: "Intercambio" },
  },
  {
    id_estudiante: 34,
    matricula: "MAT0034",
    usuario: { nombre: "Óscar", apellido: "Guerrero", correo: "oscar.guerrero34@ejemplo.com" },
    tipo_estudiante: { descripcion: "Especial" },
  },
  {
    id_estudiante: 35,
    matricula: "MAT0035",
    usuario: { nombre: "Claudia", apellido: "Méndez", correo: "claudia.mendez35@ejemplo.com" },
    tipo_estudiante: { descripcion: "Postgrado" },
  },
  {
    id_estudiante: 36,
    matricula: "MAT0036",
    usuario: { nombre: "Santiago", apellido: "Ortega", correo: "santiago.ortega36@ejemplo.com" },
    tipo_estudiante: { descripcion: "Regular" },
  },
  {
    id_estudiante: 37,
    matricula: "MAT0037",
    usuario: { nombre: "Carolina", apellido: "Figueroa", correo: "carolina.figueroa37@ejemplo.com" },
    tipo_estudiante: { descripcion: "Becado" },
  },
  {
    id_estudiante: 38,
    matricula: "MAT0038",
    usuario: { nombre: "Miguel", apellido: "Arias", correo: "miguel.arias38@ejemplo.com" },
    tipo_estudiante: { descripcion: "Intercambio" },
  },
  {
    id_estudiante: 39,
    matricula: "MAT0039",
    usuario: { nombre: "Alejandra", apellido: "Campos", correo: "alejandra.campos39@ejemplo.com" },
    tipo_estudiante: { descripcion: "Especial" },
  },
  {
    id_estudiante: 40,
    matricula: "MAT0040",
    usuario: { nombre: "Bruno", apellido: "Tapia", correo: "bruno.tapia40@ejemplo.com" },
    tipo_estudiante: { descripcion: "Postgrado" },
  },
  {
    id_estudiante: 41,
    matricula: "MAT0041",
    usuario: { nombre: "Daniel", apellido: "Suárez", correo: "daniel.suarez41@ejemplo.com" },
    tipo_estudiante: { descripcion: "Regular" },
  },
  {
    id_estudiante: 42,
    matricula: "MAT0042",
    usuario: { nombre: "Teresa", apellido: "Cárdenas", correo: "teresa.cardenas42@ejemplo.com" },
    tipo_estudiante: { descripcion: "Becado" },
  },
  {
    id_estudiante: 43,
    matricula: "MAT0043",
    usuario: { nombre: "Héctor", apellido: "Benítez", correo: "hector.benitez43@ejemplo.com" },
    tipo_estudiante: { descripcion: "Intercambio" },
  },
  {
    id_estudiante: 44,
    matricula: "MAT0044",
    usuario: { nombre: "Pilar", apellido: "Muñoz", correo: "pilar.munoz44@ejemplo.com" },
    tipo_estudiante: { descripcion: "Especial" },
  },
  {
    id_estudiante: 45,
    matricula: "MAT0045",
    usuario: { nombre: "Iván", apellido: "Cedeño", correo: "ivan.cedeno45@ejemplo.com" },
    tipo_estudiante: { descripcion: "Postgrado" },
  },
  {
    id_estudiante: 46,
    matricula: "MAT0046",
    usuario: { nombre: "Noelia", apellido: "Rivas", correo: "noelia.rivas46@ejemplo.com" },
    tipo_estudiante: { descripcion: "Regular" },
  },
  {
    id_estudiante: 47,
    matricula: "MAT0047",
    usuario: { nombre: "Álvaro", apellido: "Prieto", correo: "alvaro.prieto47@ejemplo.com" },
    tipo_estudiante: { descripcion: "Becado" },
  },
  {
    id_estudiante: 48,
    matricula: "MAT0048",
    usuario: { nombre: "Marta", apellido: "Gallego", correo: "marta.gallego48@ejemplo.com" },
    tipo_estudiante: { descripcion: "Intercambio" },
  },
  {
    id_estudiante: 49,
    matricula: "MAT0049",
    usuario: { nombre: "Rafael", apellido: "Medina", correo: "rafael.medina49@ejemplo.com" },
    tipo_estudiante: { descripcion: "Especial" },
  },
  {
    id_estudiante: 50,
    matricula: "MAT0050",
    usuario: { nombre: "Verónica", apellido: "Núñez", correo: "veronica.nunez50@ejemplo.com" },
    tipo_estudiante: { descripcion: "Postgrado" },
  },
];



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

  // 🔹 Estado real para Personas
  const [estudiantes, setEstudiantes] = useState(mockEstudiantes);

  // 🔹 Eliminar del listado
  const eliminarEstudiante = (id) => {
    setEstudiantes((prev) =>
      prev.filter((e) => (e.id_estudiante || e.id) !== id)
    );
  };

  // 2) guardar: actualiza el estado con lo editado
  const handleSave = (patch) => {
    setStudent((prev) => ({ ...prev, ...patch }));
    
    // codigo que usare despues cuando me conecta con la api
    // await api.updateStudent(prev.id, patch);
  };
  
  return (
    <div>
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

      {activo === "personas" && (
        <EstudiantesList
          estudiantes={estudiantes}
          eliminarEstudiante={eliminarEstudiante}
        />
      )}

      {/* {activo === "calificaciones" && <section className="card"><p>Cursos inscritos</p></section>}
      {activo === "actividad" && <section className="card"><p>Actividad</p></section>} */}
    </div>
  );
};
