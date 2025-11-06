import EstudiantesList from "../../../../../src/pages/Account/estudiante/components/EstudiantesList";
import { useState } from "react";


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
  }
];


export const Student = () => {
    // 🔹 Eliminar del listado
  const eliminarEstudiante = (id) => {
      setEstudiantes((prev) =>
        prev.filter((e) => (e.id_estudiante || e.id) !== id)
      );
    };
    // 🔹 Estado real para Personas
  const [estudiantes, setEstudiantes] = useState(mockEstudiantes);
  return (
    <div>
      <EstudiantesList
          estudiantes={estudiantes}
          eliminarEstudiante={eliminarEstudiante}
        />
    </div>
  )
}
