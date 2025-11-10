import React, { useState } from 'react';
import './Styles/coursesStyles.css';
import { CoursesHomeStudent } from './CoursesHomeStudent';

// Componente para la vista del profesor
export const CoursesHome = () => {
  const [isStudentView, setIsStudentView] = useState(false); // Estado para cambiar entre vistas

  // Datos de ejemplo
  const courseSummary = {
    numStudents: 150,
    attendance: 85,
    averageGrade: 75,
    progress: 65,
    tasksCreated: 20,
    classesPerWeek: 3
  };

  // Función para cambiar a la vista de estudiante
  const changeToStudentView = () => {
    setIsStudentView(true);
  };

  // Función para regresar a la vista de profesor
  const backToProfessorView = () => {
    setIsStudentView(false);
  };

  return (
    <div className="att-main">
      {/* Mostrar vista de profesor o estudiante */}
      {!isStudentView ? (
        <>
          {/* Vista del profesor */}
          <button onClick={changeToStudentView} className="btn primary">
            Cambiar a vista de estudiante
          </button>

          <h2 className="att-title">Descripcion</h2>
          <p className="att-subtitle">
            Este curso proporciona una introducción profunda a los conceptos clave
            de desarrollo web, con énfasis en las mejores prácticas y herramientas
            modernas.
          </p>
          <hr></hr>
          <h2 className="att-title">Resumen</h2>
          {/* Tarjetas con información */}
          <div className="cards">
            <div className="att-card">
              <h3 className="ctitle">Número de Estudiantes</h3>
              <p className="cnum">{courseSummary.numStudents}</p>
            </div>

            <div className="att-card">
              <h3 className="ctitle">Porcentaje de Asistencia</h3>
              <p className="cnum">{courseSummary.attendance}%</p>
            </div>

            <div className="att-card">
              <h3 className="ctitle">Promedio Total</h3>
              <p className="cnum">{courseSummary.averageGrade}%</p>
            </div>

            <div className="att-card">
              <h3 className="ctitle">Progreso del Pendium</h3>
              <div className="progress">
                <div className="bar" style={{ width: `${courseSummary.progress}%` }}></div>
              </div>
            </div>

            <div className="att-card">
              <h3 className="ctitle">Tareas Creadas</h3>
              <p className="cnum">{courseSummary.tasksCreated}</p>
            </div>

            <div className="att-card">
              <h3 className="ctitle">Clases por Semana</h3>
              <p className="cnum">{courseSummary.classesPerWeek}</p>
            </div>
          </div>
        </>
      ) : (
        // Vista de estudiante
        <CoursesHomeStudent onBackToProfessorView={backToProfessorView} />
      )}
    </div>
  );
};
