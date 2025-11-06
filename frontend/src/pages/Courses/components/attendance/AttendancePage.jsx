// src/pages/Courses/components/attendance/AttendancePage.jsx
import { Routes, Route, Navigate, useLocation, NavLink } from "react-router-dom"
import AttendanceTake from "./AttendanceTake"
import AttendanceHistory from "./AttendanceHistory"
import AttendanceReports from "./AttendanceReports"
import "./attendance.css"

const Tab = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `att-tab ${isActive ? "active" : ""}`
    }
  >
    {children}
  </NavLink>
)

export const AttendancePage = () => {
  const base = "/courses/attendance"
  const { pathname } = useLocation()

  return (
    <div className="att-shell">
      {/* Header */}
      <header className="att-header">
       
      </header>

      {/* Tabs */}
      <nav className="att-tabs">
        <Tab to={`${base}/take`}>Tomar asistencia</Tab>
        <Tab to={`${base}/history`}>Historial</Tab>
       
      </nav>

      {/* Contenido */}
      <section className="att-card">
        <Routes>
          <Route path="/" element={<Navigate to="take" replace />} />
          <Route path="take" element={<AttendanceTake />} />
          <Route path="history" element={<AttendanceHistory />} />
          
          {/* 404 local de attendance */}
          <Route path="*" element={<Navigate to="take" replace />} />
        </Routes>
      </section>
    </div>
  )
}

export default AttendancePage
