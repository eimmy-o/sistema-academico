import React, { useState } from "react";
import "./gradesStyle.css";

const Grades = () => {
  const [filters, setFilters] = useState({
      periodo: "primera",
      ordenarPor: "fecha",
    });
  
    const mockGrades = {
      primera: [
        { id: "1", nombre: "Google Site", tipo: "Trabajo en Clase", fechaEntrega: "1 de oct a las 10:35", estado: "entregado", puntaje: 100, de: 100 },
        { id: "2", nombre: "Proyecto 01: Repositorio del desarrollador", tipo: "Proyecto", fechaEntrega: "5 de oct a las 9:00", estado: "entregado", puntaje: 100, de: 100 },
        { id: "3", nombre: "Page_IA", tipo: "Trabajo en Clase", fechaEntrega: "6 de oct a las 10:59", estado: "entregado", puntaje: 100, de: 100 },
        { id: "4", nombre: "Control de Lectura #2 - Internet y Web", tipo: "Examen", fechaEntrega: "8 de oct a las 9:40", estado: "entregado", puntaje: 90, de: 100 },
        { id: "5", nombre: "Control Lectura #1", tipo: "Examen", fechaEntrega: "8 de oct a las 9:45", estado: "entregado", puntaje: 100, de: 100 },
        { id: "6", nombre: "Estructura HTML - Practicas", tipo: "Práctica", fechaEntrega: "8 de oct a las 10:58", estado: "entregado", puntaje: 100, de: 100 },
      ],
    };
  
    const grades = mockGrades[filters.periodo] || [];
    const sortedGrades = [...grades].sort((a, b) => {
      switch (filters.ordenarPor) {
        case "alfabeticamente":
          return a.nombre.localeCompare(b.nombre);
        case "estado":
          return a.estado.localeCompare(b.estado);
        default:
          return 0;
      }
    });
  
    const stats = [
      { label: "Promedio General", value: "97.5", icon: "🏆", color: "azul" },
      { label: "Tareas Entregadas", value: "6/6", icon: "✅", color: "verde" },
      { label: "Pendientes", value: "0", icon: "⏰", color: "amarillo" },
    ];
  
    return (
      <div className="grades-container">
        <h2 className="grades-title">Sistema de Calificaciones</h2>
        <p className="grades-subtitle">
          Gestiona y visualiza las calificaciones de tus cursos
        </p>
  
        {/* FILTROS */}
        <div className="filters-card">
          <div className="filters-grid">
            <div>
              <label>Período de Calificación</label>
              <select
                value={filters.periodo}
                onChange={(e) => setFilters({ ...filters, periodo: e.target.value })}
              >
                <option value="primera">Primera Evaluación</option>
                <option value="segunda">Segunda Evaluación</option>
                <option value="tercera">Tercera Evaluación</option>
                <option value="final">Evaluación Final</option>
              </select>
            </div>
            <div>
              <label>Organizar por</label>
              <select
                value={filters.ordenarPor}
                onChange={(e) =>
                  setFilters({ ...filters, ordenarPor: e.target.value })
                }
              >
                <option value="fecha">Fecha</option>
                <option value="alfabeticamente">Alfabéticamente</option>
                <option value="estado">Estado</option>
              </select>
            </div>
            <div className="apply-btn-container">
              <button onClick={() => setFilters({ ...filters })}>Aplicar</button>
            </div>
          </div>
        </div>
  
        {/* ESTADÍSTICAS */}
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className={`stat-card ${s.color}`}>
              <div className="stat-info">
                <p className="stat-label">{s.label}</p>
                <p className="stat-value">{s.value}</p>
              </div>
              <div className="stat-icon">{s.icon}</div>
            </div>
          ))}
        </div>
  
        {/* TABLA */}
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha de entrega</th>
                <th>Estado</th>
                <th>Puntaje</th>
                <th>De</th>
              </tr>
            </thead>
            <tbody>
              {sortedGrades.map((grade, index) => (
                <tr key={grade.id} className={index % 2 === 0 ? "even" : "odd"}>
                  <td>
                    <span className="nombre">{grade.nombre}</span>
                    <p className="tipo">{grade.tipo}</p>
                  </td>
                  <td>{grade.fechaEntrega}</td>
                  <td>
                    {grade.estado === "entregado" ? (
                      <span className="estado-entregado">✔</span>
                    ) : (
                      <span
                        className={`estado ${grade.estado === "pendiente" ? "pendiente" : "atrasado"}`}
                      >
                        {grade.estado}
                      </span>
                    )}
                  </td>
                  <td className="puntaje">
                    {grade.puntaje !== null ? (
                      <span
                        className={
                          grade.puntaje >= 90
                            ? "verde"
                            : grade.puntaje >= 70
                            ? "amarillo"
                            : "rojo"
                        }
                      >
                        {grade.puntaje}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{grade.de}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Grades;
