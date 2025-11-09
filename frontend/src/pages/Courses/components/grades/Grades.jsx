import React, { useState } from "react";
import "./gradesStyle.css";

const Grades = () => {
  const [isEditable, setIsEditable] = useState(true);
  const [grades, setGrades] = useState([
    { id: 1, name: "Laboratorio", maxScore: 30, score: 27, date: "30 de sep a las 23:59" },
    { id: 2, name: "Quizz", maxScore: 5, score: 5, date: "30 de sep a las 23:59" },
    { id: 3, name: "Tarea 12", maxScore: 30, score: 30, date: "14 de oct a las 23:59" },
    { id: 4, name: "Proyecto 1", maxScore: 5, score: 5, date: "14 de oct a las 23:59" }
  ]);

  const handleScoreChange = (id, newScore) => {
    if (isEditable) {
      setGrades(grades.map(grade => 
        grade.id === id ? { ...grade, score: newScore } : grade
      ));
    }
  };

  const handleToggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const totalScore = grades.reduce((total, grade) => total + grade.score, 0);
  const totalMaxScore = grades.reduce((total, grade) => total + grade.maxScore, 0);
  const average = (totalScore / totalMaxScore) * 100;

  return (
    <div className="grades-container">
      <div className="header">
        <h1>Calificaciones</h1>
        <button className="toggle-button" onClick={handleToggleEdit}>
          {isEditable ? "Cambiar vista" : "Volver a editar"}
        </button>
      </div>

      <div className="grades-list">
        {grades.map(grade => (
          <div key={grade.id} className="grade-item">
            <div className="grade-info">
              <h3>{grade.name}</h3>
              <p>Fecha de entrega: {grade.date}</p>
            </div>
            <div className="score">
              {isEditable ? (
                <input 
                  type="number" 
                  value={grade.score} 
                  onChange={(e) => handleScoreChange(grade.id, parseInt(e.target.value))}
                  min="0" 
                  max={grade.maxScore} 
                />
              ) : (
                <span>{grade.score}</span>
              )}
              <span> / {grade.maxScore}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="summary">
        <p>Total: {totalScore} / {totalMaxScore}</p>
        <p>Promedio: {average.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default Grades;
