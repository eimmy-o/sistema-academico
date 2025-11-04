import React, { useState } from "react";
import "./styles/EstudianteProfile.css"; // Importamos el CSS que te doy más abajo

export default function EstudianteProfile() {
  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState("personales");

  // Datos de ejemplo (en la vida real vendrían de tu backend)
  const studentData = {
    nombreCompleto: "Juan Pérez",
    matricula: "STU-0001",
    estado: "Activo",
    tipoEstudiante: "Becado",
    ultimoAcceso: "12 Oct 2025 • 10:42",
    avatarUrl:
      "https://via.placeholder.com/64x64.png?text=JP", // aquí pondrías la URL real de la foto del usuario

    datosPersonalesLeft: [
      { label: "Nombre", value: "Juan" },
      { label: "Apellido", value: "Perez" },
      { label: "Correo", value: "juan.perez@adem" },
      { label: "Telefono", value: "+593 994940102" },
      { label: "Direccion", value: "Mikasa 1320" },
    ],
    datosPersonalesRight: [
      { label: "Nacimiento", value: "20/10/2010" },
      { label: "Genero", value: "M" },
      { label: "Cedula", value: "0857123456" },
      { label: "Estado Civil", value: "Divorciado" },
      { label: "Matricula", value: "ABC123456" },
    ],
  };

  return (
    <div className="profile-layout">
      {/* HEADER PRINCIPAL (Tarjeta con foto, nombre, estado, botones) */}
      <section className="profile-header-card">
        <div className="profile-header-left">
          <img
            src={studentData.avatarUrl}
            alt="avatar estudiante"
            className="profile-avatar"
          />

          <div className="profile-main-info">
            <h2 className="profile-name">{studentData.nombreCompleto}</h2>

            <div className="profile-row">
              <span className="profile-matricula">{studentData.matricula}</span>
              <span className="profile-status-chip">{studentData.estado}</span>
            </div>

            <div className="profile-type">{studentData.tipoEstudiante}</div>
          </div>
        </div>

        <div className="profile-header-right">
          <button className="btn-primary">Editar perfil</button>
          <button className="btn-outline">Cambiar estado</button>

          <div className="profile-last-access">
            Último acceso: {studentData.ultimoAcceso}
          </div>
        </div>
      </section>

      {/* NAV DE PESTAÑAS */}
      <nav className="profile-tabs">
        <button
          className={
            activeTab === "personales"
              ? "tab-btn tab-btn-active"
              : "tab-btn"
          }
          onClick={() => setActiveTab("personales")}
        >
          Datos personales
        </button>

        <button
          className={
            activeTab === "academicos"
              ? "tab-btn tab-btn-active"
              : "tab-btn"
          }
          onClick={() => setActiveTab("academicos")}
        >
          Datos académicos
        </button>

        <button
          className={
            activeTab === "cursos"
              ? "tab-btn tab-btn-active"
              : "tab-btn"
          }
          onClick={() => setActiveTab("cursos")}
        >
          Cursos inscritos
        </button>

        <button
          className={
            activeTab === "asistencia"
              ? "tab-btn tab-btn-active"
              : "tab-btn"
          }
          onClick={() => setActiveTab("asistencia")}
        >
          Asistencia
        </button>

        <button
          className={
            activeTab === "actividad"
              ? "tab-btn tab-btn-active"
              : "tab-btn"
          }
          onClick={() => setActiveTab("actividad")}
        >
          Actividad
        </button>
      </nav>

      {/* CONTENIDO SEGÚN PESTAÑA */}
      {activeTab === "personales" && (
        <section className="profile-cards-grid">
          {/* Card izquierda */}
          <article className="info-card">
            <div className="info-card-header">Datos Personales</div>

            <ul className="info-list">
              {studentData.datosPersonalesLeft.map((item, idx) => (
                <li key={idx} className="info-row">
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Card derecha */}
          <article className="info-card">
            <div className="info-card-header">Datos Personales</div>

            <ul className="info-list">
              {studentData.datosPersonalesRight.map((item, idx) => (
                <li key={idx} className="info-row">
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}

      {activeTab === "academicos" && (
        <section className="placeholder-tab">
          <h3>Datos académicos</h3>
          <p>Aquí irían matrícula, tipo de estudiante, % asistencia, riesgo, etc.</p>
        </section>
      )}

      {activeTab === "cursos" && (
        <section className="placeholder-tab">
          <h3>Cursos inscritos</h3>
          <p>Aquí muestras la lista de cursos, paralelo, periodo, etc.</p>
        </section>
      )}

      {activeTab === "asistencia" && (
        <section className="placeholder-tab">
          <h3>Asistencia</h3>
          <p>Aquí va la tabla de asistencias por fecha/curso/estado.</p>
        </section>
      )}

      {activeTab === "actividad" && (
        <section className="placeholder-tab">
          <h3>Actividad</h3>
          <p>Logins recientes, intentos fallidos, auditoría de acceso.</p>
        </section>
      )}
    </div>
  );
}
