import React, { useState } from "react";
import "./TareasStyle.css";

export const TareasPage = () => {
  const [isTeacherView, setIsTeacherView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [assignments, setAssignments] = useState([
    {
      title: "Ecuaciones Lineales",
      type: "Tarea",
      date: "2024-01-17",
      maxPoints: 20,
      percentage: 15,
      status: "2 entregadas",
    },
    {
      title: "Lección 1 - Álgebra",
      type: "Lección",
      date: "2024-01-19",
      maxPoints: 10,
      percentage: 10,
      status: "1 entregada",
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    type: "Tarea",
    description: "",
    date: "",
    maxPoints: "",
    percentage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleCreate = () => {
    if (!newTask.title || !newTask.date) return;
    setAssignments([...assignments, { ...newTask, status: "0 entregadas" }]);
    setShowModal(false);
    setNewTask({
      title: "",
      type: "Tarea",
      description: "",
      date: "",
      maxPoints: "",
      percentage: "",
    });
  };

  const handleDelete = (index) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  return (
    <div className="assignments-container">
      <div className="assignments-header">
        <div>
          <h2>Tareas, Lecciones y Exámenes</h2>
          <p>Gestionar evaluaciones del curso</p>
        </div>
        <div className="header-buttons">
          <button
            className="switch-view-btn"
            onClick={() => setIsTeacherView(!isTeacherView)}
          >
            Cambiar vista
          </button>
          {isTeacherView && (
            <button className="new-task-btn" onClick={() => setShowModal(true)}>
              + Nueva Tarea
            </button>
          )}
        </div>
      </div>

      <table className="assignments-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Tipo</th>
            <th>Fecha Entrega</th>
            <th>Puntaje Máx.</th>
            {isTeacherView && <th>Porcentaje</th>}
            <th>Estado</th>
            {isTeacherView && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {assignments.map((a, i) => (
            <tr key={i}>
              <td>
                <div className="title-cell">
                  <span className="title">{a.title}</span>
                  <p className="description">{a.description}</p>
                </div>
              </td>
              <td>
                <span className={`tag ${a.type.toLowerCase()}`}>{a.type}</span>
              </td>
              <td>{a.date}</td>
              <td>{a.maxPoints}</td>
              {isTeacherView && <td>{a.percentage}%</td>}
              <td>
                {isTeacherView ? (
                  <span className="status-green">{a.status}</span>
                ) : (
                  <span
                    className={
                      a.status.includes("entregada")
                        ? "student-status delivered"
                        : "student-status missing"
                    }
                  >
                    {a.status.includes("entregada") ? "Entregado" : "Faltante"}
                  </span>
                )}
              </td>
              {isTeacherView && (
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(i)}
                  >
                    🗑
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Nueva Tarea / Lección / Examen</h3>
            <p>Crear una nueva evaluación</p>

            <label>Título *</label>
            <input
              name="title"
              value={newTask.title}
              onChange={handleChange}
              placeholder="Título"
            />

            <label>Tipo *</label>
            <select name="type" value={newTask.type} onChange={handleChange}>
              <option value="Tarea">Tarea</option>
              <option value="Lección">Lección</option>
              <option value="Examen">Examen</option>
            </select>

            <label>Descripción</label>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleChange}
              placeholder="Descripción de la evaluación"
            />

            <div className="form-row">
              <div>
                <label>Fecha de Entrega *</label>
                <input
                  name="date"
                  type="date"
                  value={newTask.date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Puntaje Máximo *</label>
                <input
                  name="maxPoints"
                  type="number"
                  value={newTask.maxPoints}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Porcentaje *</label>
                <input
                  name="percentage"
                  type="number"
                  value={newTask.percentage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="create-btn" onClick={handleCreate}>
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
