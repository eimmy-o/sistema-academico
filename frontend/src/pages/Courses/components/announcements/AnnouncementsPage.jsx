import React, { useState } from "react";
import "./AnnouncementStyle.css";
export default function AnnouncementsPage() {
  const [isTeacherView, setIsTeacherView] = useState(true);
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Próximo examen",
      date: "2024-01-15",
      content:
        "El examen parcial será el próximo viernes. Estudien los capítulos 1-5.",
      important: true,
    },
    {
      id: 2,
      title: "Material de apoyo",
      date: "2024-01-10",
      content:
        "He subido material adicional al aula virtual para la práctica.",
      important: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImportant, setNewImportant] = useState(false);

  // Eliminar anuncio individual
  const handleDelete = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  // Crear nuevo anuncio
  const handlePublish = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newAnnouncement = {
      id: Date.now(),
      title: newTitle,
      date: new Date().toISOString().split("T")[0],
      content: newContent,
      important: newImportant,
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setShowModal(false);
    setNewTitle("");
    setNewContent("");
    setNewImportant(false);
  };

  return (
    <div className="page">
      <div className="header">
        <h2>Anuncios</h2>
        <p>
          {isTeacherView
            ? "Publicar anuncios para los estudiantes"
            : "Ver anuncios publicados por el profesor"}
        </p>
      </div>

      <div className="buttons-bar">
        <button
          className="switch-btn"
          onClick={() => setIsTeacherView(!isTeacherView)}
        >
          {isTeacherView ? "Ver como estudiante" : "Ver como profesor"}
        </button>

        {isTeacherView && (
          <button className="new-btn" onClick={() => setShowModal(true)}>
            + Nuevo Anuncio
          </button>
        )}
      </div>

      <div className="announcements-container">
        {announcements.map((a) => (
          <div key={a.id} className="announcement-card">
            {isTeacherView && (
              <button
                className="delete-btn"
                onClick={() => handleDelete(a.id)}
              >
                ✖
              </button>
            )}
            <div className="announcement-header">
              <span className="icon">🔔</span>
              <h3>{a.title}</h3>
              {a.important && <span className="important-tag">Importante</span>}
            </div>
            <p className="date">{a.date}</p>
            <p>{a.content}</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Nuevo Anuncio</h3>
            <p>Publicar un anuncio para Matemáticas I</p>

            <label>Título *</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Título del anuncio"
            />

            <label>Contenido *</label>
            <textarea
              rows="4"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Contenido del anuncio"
            />

            <label className="checkbox">
              <input
                type="checkbox"
                checked={newImportant}
                onChange={(e) => setNewImportant(e.target.checked)}
              />
              Marcar como importante
            </label>

            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="publish-btn" onClick={handlePublish}>
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}