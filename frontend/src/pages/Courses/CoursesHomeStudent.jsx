import React from 'react';
import './Styles/coursesStyles.css';

// Componente para la vista del estudiante
export const CoursesHomeStudent = ({ onBackToProfessorView }) => {
  // Datos de ejemplo para la vista del estudiante
  const studentData = {
    attendance: 90,
    averageGrade: 80,
    tasksMissing: 5,
    tasksSubmitted: 15
  };

  return (
    <div className="att-main">
      {/* Botón para regresar a la vista del profesor */}
      <button onClick={onBackToProfessorView} className="btn ghost">
        Volver a la vista de profesor
      </button>
      <h2 className="att-title">Mi Resumen de Curso</h2>
      <div className="cards">
        <div className="att-card">
          <h3 className="ctitle">Porcentaje de Asistencia</h3>
          <p className="cnum">{studentData.attendance}%</p>
        </div>

        <div className="att-card">
          <h3 className="ctitle">Promedio</h3>
          <p className="cnum">{studentData.averageGrade}%</p>
        </div>

        <div className="att-card">
          <h3 className="ctitle">Porcentaje de Tareas Faltantes</h3>
          <p className="cnum">{(studentData.tasksMissing / (studentData.tasksMissing + studentData.tasksSubmitted)) * 100}%</p>
        </div>

        <div className="att-card">
          <h3 className="ctitle">Tareas Entregadas</h3>
          <p className="cnum">{studentData.tasksSubmitted}</p>
        </div>
      </div>

      
    </div>
  );
};
