import React, { useState } from "react";
import "./styleCalendar.css";
import { exportCalendarData } from "./CalendarUtils";
import CalendarPageTeacher from "./CalendarPageTeacher";
import CalendarPageAdmin from "./CalendarPageAdmin";
import { useNavigate } from "react-router-dom";

// ===== Días y horarios ====
const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const HOURS = ["09:00-11:00", "11:00-13:00", "13:00-15:00", "15:00-17:00"];

// ===== Datos de materias, exámenes y tareas (simulados por ahora) ====
const COURSES = [
  { id: 1, name: "Cálculo", code: "CAL101", aula: "9M-A104", color: "#e89d41ff", slots: [{ day: 0, start: "09:00", end: "11:00" }, { day: 3, start: "11:00", end: "13:00" }] },
  { id: 2, name: "Fundamentos de Programación", code: "FP120", aula: "11D-A003", color: "#4e86d9ff", slots: [{ day: 1, start: "11:00", end: "13:00" }] },
  { id: 3, name: "Química", code: "QUI200", aula: "9M-A005", color: "#5ca141ff", slots: [{ day: 2, start: "09:00", end: "11:00" }] },
];

const EXAMS = [
  { id: 1, name: "Cálculo Vectorial", date: "2025-11-15", hour: "09:00", aula: "9M-A104", color: "#e89d41ff" },
  { id: 2, name: "Fundamentos de Programación", date: "2025-11-17", hour: "13:00", aula: "11D-A003", color: "#4e86d9ff" },
  { id: 3, name: "Química", date: "2025-11-19", hour: "11:00", aula: "9M-A005", color: "#5ca141ff" },
  { id: 4, name: "Desarrollo de aplicaciones webs y móviles", date: "2025-11-20", hour: "09:00", aula: "9M-A005", color: "#8f41a1ff" },
];

const TASKS = [
  { id: 1, title: "Evaluación de Cálculo", due: "2025-11-05", courseId: 1 },
  { id: 2, title: "Tarea 1 - FP", due: "2025-11-07", courseId: 2 },
  { id: 3, title: "Informe de Química", due: "2025-11-11", courseId: 3 },
];

export default function CalendarPage() {
  // ==== Estados principales ====
  const [search, setSearch] = useState("");
  const [showExams, setShowExams] = useState(false);
  const [taskFilter, setTaskFilter] = useState("all");
  const [enrolledCourses, setEnrolledCourses] = useState([1, 2]);
  const [view, setView] = useState("student"); // Estado para cambiar de pantalla
  
  const navigate = useNavigate();

  // ==== Render de otras pantallas según view ====
  if (view === "teacher") return <CalendarPageTeacher />;
  if (view === "admin") return <CalendarPageAdmin />;

  // ==== Fecha de hoy==== 
  const today = new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });

  // ==== Filtrado de cursos por búsqueda ====
  const filteredCourses = COURSES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  // ==== Filtrado de tareas según curso inscrito y filtro de tiempo==== 
  const filteredTasks = TASKS.filter(t => {
    if (!enrolledCourses.includes(t.courseId)) return false;
    if (taskFilter === "all") return true;
    const taskDate = new Date(t.due);
    const now = new Date();
    const diffDays = (taskDate - now) / (1000 * 60 * 60 * 24);
    if (taskFilter === "week") return diffDays <= 7 && diffDays >= 0;
    if (taskFilter === "month") return diffDays <= 30 && diffDays >= 0;
    return true;
  });

  // ==== Función para obtener cursos en un día y hora específicos ====
  function getCoursesAt(dayIndex, hourRange) {
    const [startHour, endHour] = hourRange.split("-");
    return filteredCourses.filter(c =>
      enrolledCourses.includes(c.id) &&
      c.slots.some(s => s.day === dayIndex && s.start === startHour && s.end === endHour)
    );
  }

  // ==== Función para inscribirse en un curso==== 
  function handleEnroll(courseId) {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      alert(`Te has inscrito en ${COURSES.find(c => c.id === courseId).name}`);
    }
  }

  const filteredExams = EXAMS.filter(e => enrolledCourses.includes(e.id));

  return (
    <div className="schedule-wrap">
      <div className="container">

        {/* ===== Botones de cambio de vista ===== */}
        <div className="view-switcher">
          <button onClick={() => setView("student")}>Estudiante</button>
          <button onClick={() => setView("teacher")}>Profesor</button>
          <button onClick={() => setView("admin")}>Admin</button>
        </div>

        {/* ===== Encabezado ===== */}
        <div className="header">
          <div>
            <div className="title">📅 Calendario</div>
            <div className="subtitle">Hoy es {today}</div>
          </div>
          <div className="controls">
            <input
              className="input"
              placeholder="Buscar materia o código"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="toggle">
              <span>Horario</span>
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

        {/* ===== Tabla de horarios y exámenes ===== */}
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
                            <div key={course.id} className="pill" style={{ background: course.color, cursor: "pointer" }} onClick={() => navigate("/courses/pages/Course_1")}>
                              <div className="pill-title">{course.name} </div>
                              <div className="pill-info">{course.code} • {course.aula} </div>
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
                  {filteredExams.map(exam => (
                    <th key={exam.id}>
                      {new Date(exam.date).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" })}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HOURS.map(hour => (
                  <tr key={hour}>
                    <td className="time">{hour}</td>
                    {filteredExams.map(exam => (
                      <td key={exam.id} className="course-cell">
                        {exam.hour === hour.split("-")[0] ? (
                          <div className="pill" style={{ background: exam.color, cursor: "pointer" }} onClick={() => navigate("/courses/pages/Course_1")}>
                            <div className="pill-title">{exam.name}</div>
                            <div className="pill-info">{exam.aula}</div>
                          </div>
                        ) : null}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ===== Tareas ===== */}
        <div className="tasks-section">
          <div className="tasks-header">
            <h3>Próximas tareas y evaluaciones</h3>
            <select className="select" value={taskFilter} onChange={(e) => setTaskFilter(e.target.value)}>
              <option value="all">Todas</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
            </select>
          </div>
          <div className="tasks-grid">
            {filteredTasks.map(t => {
              const course = COURSES.find(c => c.id === t.courseId);
              return (
                <div key={t.id} className="task-card" style={{ borderTop: `5px solid ${course.color}`, cursor: "pointer" }} onClick={() => navigate("/courses/pages/Course_1")}>
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

          {/* ===== Exportar ===== */}
          <div className="export-section">
            <h4>Exportar</h4>
            <div className="export-buttons">
              <button onClick={() => exportCalendarData("pdf", COURSES)}>PDF</button>
              <button onClick={() => exportCalendarData("excel", COURSES)}>EXCEL</button>
              <button onClick={() => exportCalendarData("csv", COURSES)}>CSV</button>
              <button onClick={() => exportCalendarData("json", COURSES)}>JSON</button>
              <button onClick={() => exportCalendarData("txt", COURSES)}>TXT</button>
            </div>
          </div>
        </div>

        {/* ===== Inscripción a cursos ====== */}
        <div className="enroll-section">
          <h4>Inscribirse en materias disponibles</h4>
          <div className="tasks-grid">
            {COURSES.filter(c => !enrolledCourses.includes(c.id)).map(c => (
              <div key={c.id} className="task-card" style={{ borderTop: `5px solid ${c.color}`, cursor: "pointer" }} onClick={() => handleEnroll(c.id)}>
                <div className="task-main">
                  <h4>{c.name}</h4>
                  <p className="task-course" style={{ color: c.color }}>{c.code}</p>
                </div>
                <button className="task-check">➕</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}