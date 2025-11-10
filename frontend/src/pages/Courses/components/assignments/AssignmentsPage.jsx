import React, { useState } from "react";
import "./AssignmentsStyle.css";

export const AssignmentsPage = () => {
  const [rol, setRol] = useState("profesor");
  const [parcial, setParcial] = useState("primer");
  const [showModal, setShowModal] = useState(false);

  const [evaluaciones, setEvaluaciones] = useState({
    primer: { lecciones: [], examenes: [], tareas: [] },
    segundo: { lecciones: [], examenes: [], tareas: [] },
    recuperacion: { lecciones: [], examenes: [], tareas: [] },
  });

  const [nuevo, setNuevo] = useState({
    nombre: "",
    fecha: "",
    seccion: "lecciones",
    parcial: "primer",
    descripcion: "",
    puntos: "",
  });

  const agregarEvaluacion = (e) => {
    e.preventDefault();
    const nueva = {
      nombre: nuevo.nombre,
      fecha: nuevo.fecha,
      estado: "Por calificar",
      calificacion: "--/" + (nuevo.puntos || "100"),
      descripcion: nuevo.descripcion,
    };

    setEvaluaciones({
      ...evaluaciones,
      [nuevo.parcial]: {
        ...evaluaciones[nuevo.parcial],
        [nuevo.seccion]: [...evaluaciones[nuevo.parcial][nuevo.seccion], nueva],
      },
    });

    setNuevo({
      nombre: "",
      fecha: "",
      seccion: "lecciones",
      parcial: "primer",
      descripcion: "",
      puntos: "",
    });
    setShowModal(false);
  };

  const cambiarEstado = (parcialKey, seccion, index) => {
    const actual = evaluaciones[parcialKey][seccion][index];
    const nuevoEstado = actual.estado === "Calificado" ? "Por calificar" : "Calificado";

    const actualizado = { ...actual, estado: nuevoEstado };
    const nuevoArray = [...evaluaciones[parcialKey][seccion]];
    nuevoArray[index] = actualizado;

    setEvaluaciones({
      ...evaluaciones,
      [parcialKey]: { ...evaluaciones[parcialKey], [seccion]: nuevoArray },
    });
  };

  const cambiarNota = (parcialKey, seccion, index, valor) => {
    const actual = evaluaciones[parcialKey][seccion][index];
    const actualizado = { ...actual, calificacion: valor };
    const nuevoArray = [...evaluaciones[parcialKey][seccion]];
    nuevoArray[index] = actualizado;

    setEvaluaciones({
      ...evaluaciones,
      [parcialKey]: { ...evaluaciones[parcialKey], [seccion]: nuevoArray },
    });
  };

  const data = evaluaciones[parcial];

  return (
    <div className="assessments-page">
      <div className="header-eval">
        <h1 className="titulo">Evaluaciones</h1>
        {rol === "profesor" && (
          <button className="btn-nueva" onClick={() => setShowModal(true)}>
            + Nueva Evaluación
          </button>
        )}
      </div>

      <div className="tabs">
        <button className={`tab-btn ${rol === "profesor" ? "active" : ""}`} onClick={() => setRol("profesor")}>
          Profesor
        </button>
        <button className={`tab-btn ${rol === "estudiante" ? "active" : ""}`} onClick={() => setRol("estudiante")}>
          Estudiante
        </button>
      </div>
      

      <div className="tabs-secundarios">
        {["primer", "segundo", "recuperacion"].map((p) => (
          <button
            key={p}
            className={`tab-btn ${parcial === p ? "active" : ""}`}
            onClick={() => setParcial(p)}
          >
            {p === "primer"
              ? "Primer Parcial"
              : p === "segundo"
              ? "Segundo Parcial"
              : "Recuperación"}
          </button>
        ))}
      </div>

      {Object.entries(data).map(([seccion, items]) => (
        <div key={seccion} className="seccion">
          <h2 className="seccion-titulo">{seccion.toUpperCase()}</h2>
          {items.length === 0 ? (
            <p className="vacio">No hay evaluaciones registradas.</p>
          ) : (
            <div className="cards">
              {items.map((ev, i) => (
               
                  <div key={i} className="card-evaluacion">
                    <div className="card-header">
                      <h3>{ev.nombre}</h3>
                      <span className="tipo-etiqueta">
                        {seccion === "tareas" ? "Tarea" : seccion === "lecciones" ? "Lección" : "Examen"}
                      </span>
                    </div>

                    <p className="fecha">📅 {ev.fecha}</p>

                    {ev.descripcion && <p className="descripcion">{ev.descripcion}</p>}

                    <div className="divisor" />

                    <div className="calificacion">
                      <span>Calificación:</span>
                      {rol === "profesor" ? (
                        <input
                          type="text"
                          className="nota-input"
                          value={ev.calificacion}
                          onChange={(e) => cambiarNota(parcial, seccion, i, e.target.value)}
                        />
                      ) : (
                        <strong>{ev.calificacion}</strong>
                      )}
                      {rol === "profesor" && <span className="icono-editable">✏️</span>}
                    </div>

                    <div
                      className={`estado ${ev.estado === "Calificado" ? "ok" : "pendiente"}`}
                      onClick={() => rol === "profesor" && cambiarEstado(parcial, seccion, i)}
                      style={{ cursor: rol === "profesor" ? "pointer" : "default" }}
                    >
                      {ev.estado}
                    </div>
                  </div>
                
              ))}
            </div>
          )}
        </div>
      ))}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Nueva Evaluación</h2>
            <p className="sub">Crea una nueva evaluación para tus estudiantes</p>
            <form onSubmit={agregarEvaluacion}>
              <label>Título</label>
              <input
                type="text"
                placeholder="Ej: Tarea #1, Examen #2"
                value={nuevo.nombre}
                onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
                required
              />

              <div className="form-row">
                <div>
                  <label>Tipo</label>
                  <select
                    value={nuevo.seccion}
                    onChange={(e) => setNuevo({ ...nuevo, seccion: e.target.value })}
                  >
                    <option value="tareas">Tarea</option>
                    <option value="lecciones">Lección</option>
                    <option value="examenes">Examen</option>
                  </select>
                </div>

                <div>
                  <label>Parcial</label>
                  <select
                    value={nuevo.parcial}
                    onChange={(e) => setNuevo({ ...nuevo, parcial: e.target.value })}
                  >
                    <option value="primer">Primer Parcial</option>
                    <option value="segundo">Segundo Parcial</option>
                    <option value="recuperacion">Recuperación</option>
                  </select>
                </div>
              </div>

              <label>Fecha</label>
              <input
                type="date"
                value={nuevo.fecha}
                onChange={(e) => setNuevo({ ...nuevo, fecha: e.target.value })}
                required
              />

              <label>Descripción</label>
              <textarea
                placeholder="Ej: HTML y CSS básico, APIs y servicios"
                value={nuevo.descripcion}
                onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
              />

              <label>Puntos</label>
              <input
                type="number"
                placeholder="Ej: 10"
                value={nuevo.puntos}
                onChange={(e) => setNuevo({ ...nuevo, puntos: e.target.value })}
              />

              <div className="modal-buttons">
                <button type="button" className="cancel" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="create">
                  Crear Evaluación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
