import React, { useState } from "react";
import { exportCalendarData } from "./CalendarUtils";
import CalendarPage from "./CalendarPage";
import TeacherCalendarPage from "./CalendarPageTeacher"; 
import "./styleCalendar.css";

export default function MainView() {
  const [view, setView] = useState("admin"); // student, teacher, admin

  // --- Hooks del Admin siempre se ejecutan ---
  const [activeTab, setActiveTab] = useState("materias");

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedStudentCourse, setSelectedStudentCourse] = useState("");

  const [editAssignmentIndex, setEditAssignmentIndex] = useState(null);
  const [editEnrollmentIndex, setEditEnrollmentIndex] = useState(null);

  const courses = ["Matemáticas", "Fundamentos de Programación", "Física", "ARP"];
  const teachers = ["Marta Gómez", "Álvaro Salazar", "Marcos Pérez"];
  const rooms = ["Aula 101", "Aula 202", "Laboratorio", "Auditorio"];
  const students = ["Ana Torres", "Luis Mendoza", "Valeria López", "Tomás Ruiz"];
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const times = ["07:00 - 09:00", "09:00 - 11:00", "11:00 - 13:00", "14:00 - 16:00"];

  const [assignments, setAssignments] = useState([
    {
      Materia: "Matemáticas",
      Profesor: "Marta Gómez",
      Aula: "Aula 101",
      Días: "Lunes, Miércoles",
      Horario: "07:00 - 09:00",
    },
    {
      Materia: "Fundamentos de Programación",
      Profesor: "Álvaro Salazar",
      Aula: "Aula 202",
      Días: "Martes, Jueves",
      Horario: "09:00 - 11:00",
    },
  ]);

  const [enrollments, setEnrollments] = useState([
    { Estudiante: "Ana Torres", Materia: "Matemáticas" },
  ]);

  const handleDayToggle = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleAssign = () => {
    if (!selectedCourse || !selectedTeacher || !selectedRoom || !selectedDays.length || !selectedTime) {
      alert("Por favor completa todos los campos antes de asignar.");
      return;
    }

    const newAssignment = {
      Materia: selectedCourse,
      Profesor: selectedTeacher,
      Aula: selectedRoom,
      Días: selectedDays.join(", "),
      Horario: selectedTime,
    };

    if (editAssignmentIndex !== null) {
      const updated = [...assignments];
      updated[editAssignmentIndex] = newAssignment;
      setAssignments(updated);
      setEditAssignmentIndex(null);
    } else {
      setAssignments([...assignments, newAssignment]);
    }

    setSelectedCourse("");
    setSelectedTeacher("");
    setSelectedRoom("");
    setSelectedDays([]);
    setSelectedTime("");
  };

  const handleEditAssignment = (index) => {
    const a = assignments[index];
    setSelectedCourse(a.Materia);
    setSelectedTeacher(a.Profesor);
    setSelectedRoom(a.Aula);
    setSelectedDays(a.Días.split(", ").map(d => d.trim()));
    setSelectedTime(a.Horario);
    setEditAssignmentIndex(index);
  };

  const handleDeleteAssignment = (index) => {
    setAssignments(assignments.filter((_, i) => i !== index));
    if (editAssignmentIndex === index) {
      setEditAssignmentIndex(null);
      setSelectedCourse("");
      setSelectedTeacher("");
      setSelectedRoom("");
      setSelectedDays([]);
      setSelectedTime("");
    }
  };

  const handleEnroll = () => {
    if (!selectedStudent || !selectedStudentCourse) {
      alert("Selecciona estudiante y materia.");
      return;
    }

    const newEnrollment = {
      Estudiante: selectedStudent,
      Materia: selectedStudentCourse,
    };

    if (editEnrollmentIndex !== null) {
      const updated = [...enrollments];
      updated[editEnrollmentIndex] = newEnrollment;
      setEnrollments(updated);
      setEditEnrollmentIndex(null);
    } else {
      setEnrollments([...enrollments, newEnrollment]);
    }

    setSelectedStudent("");
    setSelectedStudentCourse("");
  };

  const handleEditEnrollment = (index) => {
    const e = enrollments[index];
    setSelectedStudent(e.Estudiante);
    setSelectedStudentCourse(e.Materia);
    setEditEnrollmentIndex(index);
  };

  const handleDeleteEnrollment = (index) => {
    setEnrollments(enrollments.filter((_, i) => i !== index));
    if (editEnrollmentIndex === index) {
      setEditEnrollmentIndex(null);
      setSelectedStudent("");
      setSelectedStudentCourse("");
    }
  };

  const handleExport = (type) => {
    exportCalendarData(type, assignments);
  };

  // ---------------- JSX ----------------
  return (
    <div>
      {/* BOTONES DE VISTA */}
      <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: "6px" }}>
        <button onClick={() => setView("student")}>Estudiante</button>
        <button onClick={() => setView("teacher")}>Profesor</button>
        <button onClick={() => setView("admin")}>Admin</button>
      </div>

      {/* VISTAS */}
      {view === "student" && <CalendarPage />}
      {view === "teacher" && <TeacherCalendarPage />}
      {view === "admin" && (
        <div className="schedule-wrap">
          <div className="container">
            <div className="header">
              <div>
                <h1 className="title">Panel de Administración de Horarios</h1>
                <p className="subtitle">Gestiona materias, aulas, docentes y alumnos</p>
              </div>
            </div>

            {/* Cambiar pestaña */}
            <div className="calendar-admin-form" style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                className={`add-button ${activeTab === "materias" ? "active" : ""}`}
                onClick={() => setActiveTab("materias")}
              >
                Asignar profesores y aulas
              </button>
              <button
                className={`add-button ${activeTab === "estudiantes" ? "active" : ""}`}
                onClick={() => setActiveTab("estudiantes")}
              >
                Asignar estudiantes
              </button>
            </div>

            {activeTab === "materias" && (
              <>
                {/* FORMULARIO */}
                <div className="calendar-admin-form">
                  <h2>{editAssignmentIndex !== null ? "Editar materia" : "Asignar nueva materia"}</h2>
                  <div className="calendar-admin-inputs">
                    <select className="select" value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                      <option value="">Seleccione una materia</option>
                      {courses.map((c) => (<option key={c}>{c}</option>))}
                    </select>

                    <select className="select" value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)}>
                      <option value="">Seleccione un profesor</option>
                      {teachers.map((t) => (<option key={t}>{t}</option>))}
                    </select>

                    <select className="select" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>
                      <option value="">Seleccione un aula</option>
                      {rooms.map((r) => (<option key={r}>{r}</option>))}
                    </select>

                    <select className="select" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                      <option value="">Seleccione un horario</option>
                      {times.map((t) => (<option key={t}>{t}</option>))}
                    </select>

                    <div className="days-container" style={{ display: "flex", gap: "6px" }}>
                      {days.map((d) => (
                        <label key={d} className="day-option">
                          <input type="checkbox" checked={selectedDays.includes(d)} onChange={() => handleDayToggle(d)} />
                          {d}
                        </label>
                      ))}
                    </div>

                    <button className="add-button" onClick={handleAssign}>
                      {editAssignmentIndex !== null ? "Guardar cambios" : "Asignar"}
                    </button>
                  </div>
                </div>

                {/* TABLA ASIGNACIONES */}
                <div className="card">
                  <table className="timetable">
                    <thead>
                      <tr>
                        <th>Materia</th>
                        <th>Profesor</th>
                        <th>Aula</th>
                        <th>Días</th>
                        <th>Horario</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignments.map((a, i) => (
                        <tr key={i}>
                          <td>{a.Materia}</td>
                          <td>{a.Profesor}</td>
                          <td>{a.Aula}</td>
                          <td>{a.Días}</td>
                          <td>{a.Horario}</td>
                          <td>
                            <button className="add-button" onClick={() => handleEditAssignment(i)}>Editar</button>
                            <button className="add-button" style={{ background: "#dc3545" }} onClick={() => handleDeleteAssignment(i)}>Eliminar</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* EXPORTAR */}
                <div className="export-section">
                  <h3>Exportar informe</h3>
                  <div className="export-buttons">
                    <button onClick={() => handleExport("pdf")}>Exportar PDF</button>
                    <button onClick={() => handleExport("xlsx")}>Exportar Excel</button>
                    <button onClick={() => handleExport("csv")}>Exportar CSV</button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "estudiantes" && (
              <>
                <div className="calendar-admin-form">
                  <h2>{editEnrollmentIndex !== null ? "Editar inscripción" : "Asignar estudiante a materia"}</h2>
                  <div className="calendar-admin-inputs">
                    <select className="select" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                      <option value="">Seleccione un estudiante</option>
                      {students.map((s) => (<option key={s}>{s}</option>))}
                    </select>

                    <select className="select" value={selectedStudentCourse} onChange={(e) => setSelectedStudentCourse(e.target.value)}>
                      <option value="">Seleccione una materia</option>
                      {assignments.map((a, i) => (<option key={i}>{a.Materia}</option>))}
                    </select>

                    <button className="add-button" onClick={handleEnroll}>
                      {editEnrollmentIndex !== null ? "Guardar cambios" : "Asignar estudiante"}
                    </button>
                  </div>
                </div>

                <div className="card">
                  <table className="timetable">
                    <thead>
                      <tr>
                        <th>Estudiante</th>
                        <th>Materia</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollments.map((e, i) => (
                        <tr key={i}>
                          <td>{e.Estudiante}</td>
                          <td>{e.Materia}</td>
                          <td>
                            <button className="add-button" onClick={() => handleEditEnrollment(i)}>Editar</button>
                            <button className="add-button" style={{ background: "#dc3545" }} onClick={() => handleDeleteEnrollment(i)}>Eliminar</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}