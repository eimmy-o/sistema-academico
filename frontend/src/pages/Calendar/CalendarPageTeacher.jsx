import React, { useState } from "react";
import "./styleCalendar.css";
import { exportCalendarData } from "./CalendarUtils";
import CalendarPage from "./CalendarPage"; // página de estudiante
import CalendarPageAdmin from "./CalendarPageAdmin"; // página de admin

// Días y horas base
const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const HOURS = ["09:00-11:00", "11:00-13:00", "13:00-15:00", "15:00-17:00"];

// Materias que dicta
const TEACHING_COURSES = [
  {
    id: 1,
    name: "Álgebra Lineal",
    code: "MAT210",
    aula: "9M-A203",
    color: "#f59e0b",
    slots: [
      { day: 1, start: "09:00", end: "11:00" },
      { day: 3, start: "11:00", end: "13:00" },
    ],
  },
  {
    id: 2,
    name: "Estructuras de Datos",
    code: "INF330",
    aula: "11D-A102",
    color: "#3b82f6",
    slots: [{ day: 2, start: "13:00", end: "15:00" }],
  },
  {
    id: 3,
    name: "Programación de Sistemas",
    code: "INF400",
    aula: "9M-B204",
    color: "#10b981",
    slots: [{ day: 4, start: "09:00", end: "11:00" }],
  },
];

// Evaluaciones
const EXAMS = [
  { id: 1, name: "Álgebra Lineal", date: "2025-11-15", hour: "09:00", aula: "9M-A203", color: "#f59e0b" },
  { id: 2, name: "Estructuras de datos", date: "2025-11-18", hour: "13:00", aula: "11D-A102", color: "#3b82f6" },
  { id: 3, name: "Programación de sistemas", date: "2025-11-22", hour: "09:00", aula: "9M-B204", color: "#10b981" },
];

// Actividades pendientes
const GRADING_TASKS = [
  { id: 1, title: "Lección de Álgebra", due: "2025-11-06", courseId: 1 },
  { id: 2, title: "Tarea de Estructuras", due: "2025-11-10", courseId: 2 },
  { id: 3, title: "Taller de Programación", due: "2025-11-13", courseId: 3 },
];

export default function CalendarPageTeacher() {
  const [search, setSearch] = useState("");
  const [showExams, setShowExams] = useState(false);
  const [taskFilter, setTaskFilter] = useState("all");
  const [view, setView] = useState("teacher"); // "student", "teacher", "admin"

  // Cambiar a otra vista según rol
  if (view === "student") return <CalendarPage />;
  if (view === "admin") return <CalendarPageAdmin />;

  const today = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });

  const filteredCourses = TEACHING_COURSES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredTasks = GRADING_TASKS.filter(t => {
    if (taskFilter === "all") return true;
    const taskDate = new Date(t.due);
    const now = new Date();
    const diffDays = (taskDate - now) / (1000 * 60 * 60 * 24);
    if (taskFilter === "week") return diffDays <= 7 && diffDays >= 0;
    if (taskFilter === "month") return diffDays <= 30 && diffDays >= 0;
    return true;
  });

  function getCoursesAt(dayIndex, hourRange) {
    const [startHour, endHour] = hourRange.split("-");
    return filteredCourses.filter(c =>
      c.slots.some(s => s.day === dayIndex && s.start === startHour && s.end === endHour)
    );
  }

  return (
    <div className="schedule-wrap">
      <div className="container">
        {/* BOTONES DE CAMBIO DE VISTA */}
        <div style={{ position: "absolute", top: 10, right: 10, fontSize: "0.8rem" }}>
          <button onClick={() => setView("student")} style={{ marginRight: "5px", padding: "2px 6px" }}>Estudiante</button>
          <button onClick={() => setView("teacher")} style={{ marginRight: "5px", padding: "2px 6px" }}>Profesor</button>
          <button onClick={() => setView("admin")} style={{ padding: "2px 6px" }}>Admin</button>
        </div>

        {/* ENCABEZADO */}
        <div className="header">
          <div>
            <div className="title">📅 Calendario</div>
            <div className="subtitle">Hoy es {today}</div>
          </div>

          <div className="controls">
            <input
              className="input"
              placeholder="Buscar asignatura"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="toggle">
              <span>Clases</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={showExams}
                  onChange={() => setShowExams(!showExams)}
                />
                <span className="slider"></span>
              </label>
              <span>Exámenes</span>
            </div>
          </div>
        </div>

        <div className="readonly-notice">
          🛈 Este calendario es de solo lectura. No puedes modificar tus horarios, solo revisar tus clases y tareas pendientes.
        </div>

        {/* TABLA PRINCIPAL */}
        <div className="card">
          {!showExams ? (
            <table className="timetable">
              <thead>
                <tr>
                  <th className="hour-col">Hora</th>
                  {DAYS.map(day => <th key={day}>{day}</th>)}
                </tr>
              </thead>
              <tbody>
                {HOURS.map(hour => (
                  <tr key={hour}>
                    <td className="time">{hour}</td>
                    {DAYS.map((_, dayIndex) => {
                      const currentCourses = getCoursesAt(dayIndex, hour);
                      return (
                        <td key={dayIndex} className="course-cell">
                          {currentCourses.map(course => (
                            <div
                              key={course.id}
                              className="pill"
                              style={{ background: course.color, cursor: "pointer" }}
                            >
                              <div className="pill-title">{course.name}</div>
                              <div className="pill-info">{course.code} • {course.aula}</div>
                            </div>
                          ))}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="timetable">
              <thead>
                <tr>
                  <th className="hour-col">Hora</th>
                  {EXAMS.map(exam => (
                    <th key={exam.id}>
                      {new Date(exam.date).toLocaleDateString("es-ES", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOURS.map(hour => (
                  <tr key={hour}>
                    <td className="time">{hour}</td>
                    {EXAMS.map(exam => (
                      <td key={exam.id} className="course-cell">
                        {exam.hour === hour.split("-")[0] && (
                          <div
                            className="pill"
                            style={{ background: exam.color, cursor: "pointer" }}
                          >
                            <div className="pill-title">{exam.name}</div>
                            <div className="pill-info">{exam.aula}</div>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* SECCIÓN DE ACTIVIDADES */}
        <div className="tasks-section">
          <div className="tasks-header">
            <h3>Actividades pendientes</h3>
            <select className="select" value={taskFilter} onChange={(e) => setTaskFilter(e.target.value)}>
              <option value="all">Todas</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
            </select>
          </div>

          <div className="tasks-grid">
            {filteredTasks.map(t => {
              const course = TEACHING_COURSES.find(c => c.id === t.courseId);
              return (
                <div
                  key={t.id}
                  className="task-card"
                  style={{ borderTop: `5px solid ${course.color}`, cursor: "pointer" }}
                >
                  <div className="task-main">
                    <h4>{t.title}</h4>
                    <p className="task-date">📅 {t.due}</p>
                    <p className="task-course" style={{ color: course.color }}>{course.name}</p>
                  </div>
                  <button className="task-check">✔</button>
                </div>
              );
            })}
          </div>

          {/* BOTONES DE EXPORTACIÓN */}
          <div className="export-section">
            <h4>Exportar</h4>
            <div className="export-buttons">
              <button onClick={() => exportCalendarData("pdf", TEACHING_COURSES)}>PDF</button>
              <button onClick={() => exportCalendarData("excel", TEACHING_COURSES)}>EXCEL</button>
              <button onClick={() => exportCalendarData("csv", TEACHING_COURSES)}>CSV</button>
              <button onClick={() => exportCalendarData("json", TEACHING_COURSES)}>JSON</button>
              <button onClick={() => exportCalendarData("txt", TEACHING_COURSES)}>TXT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}