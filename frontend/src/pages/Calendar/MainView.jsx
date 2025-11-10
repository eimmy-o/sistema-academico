import React, { useState } from "react";
import CalendarPageStudent from "./CalendarPage";
import CalendarPageTeacher from "./CalendarPageTeacher";
import CalendarPageAdmin from "./CalendarPageAdmin";

export default function MainView() {
  const [view, setView] = useState("student"); //valor inicial

  return (
    <div>
      {/* Botones para cambiar de vista */}
      <div style={{ position: "absolute", top: 10, right: 10, fontSize: "0.8rem" }}>
        <button onClick={() => setView("student")} style={{ marginRight: 5, padding: "2px 6px" }}>Estudiante</button>
        <button onClick={() => setView("teacher")} style={{ marginRight: 5, padding: "2px 6px" }}>Profesor</button>
        <button onClick={() => setView("admin")} style={{ padding: "2px 6px" }}>Admin</button>
      </div>

      {/* Aquí se renderiza la vista según el estado */}
      {view === "student" && <CalendarPageStudent />}
      {view === "teacher" && <CalendarPageTeacher />}
      {view === "admin" && <CalendarPageAdmin />}
    </div>
  );
}