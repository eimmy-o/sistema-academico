import React from "react";
import "./StudentProfile.css";
import StatusBadge from "./StatusBadge";
import InfoRow from "./InfoRow";


export default function StudentProfile({ student, onEdit, onToggleStatus }) {
  return (
    <section className="profile">
      {/* Header */}
      <header className="profile__header">
        <div className="profile__identity">
          <img
            className="profile__avatar"
            src={student.photoUrl}
            alt={`Foto de ${student.firstName} ${student.lastName}`}
            loading="lazy"
          />
          <div className="profile__title">
            <h1 className="profile__name">
              {student.firstName} {student.lastName}
            </h1>
            <div className="profile__meta">
              <span className="profile__code">{student.code}</span>
              <StatusBadge label={student.status.label} tone={student.status.tone} />
            </div>
            <div className="profile__submeta">{student.scholarshipText}</div>
          </div>
        </div>

        <div className="profile__actions">
          <button className="btn btn--primary" onClick={onEdit}>Editar perfil</button>
          <button className="btn btn--ghost" onClick={onToggleStatus}>Cambiar estado</button>
          <div className="profile__last-access">Último acceso: {student.lastAccess}</div>
        </div>
      </header>

      {/* Tabs de muestra (opcional) */}
      <nav className="tabs" aria-label="Secciones de perfil">
        <button className="tabs__item tabs__item--active">Datos personales</button>
        <button className="tabs__item" disabled>Datos académicos</button>
        <button className="tabs__item" disabled>Cursos inscritos</button>
        <button className="tabs__item" disabled>Actividad</button>
      </nav>

      {/* UNA SOLA TARJETA */}
      <div className="profile__content--single">
        <section className="card">
          <h2 className="card__title">Datos Personales</h2>

          <div className="grid grid--one">
            {/* bloque 1 */}
            <InfoRow label="Nombre" value={student.firstName} />
            <InfoRow label="Apellido" value={student.lastName} />
            <InfoRow label="Correo" value={student.email} isLink />
            <InfoRow label="Teléfono" value={student.phone} />
            <InfoRow label="Dirección" value={student.address} full />

            {/* bloque 2 */}
            <InfoRow label="Nacimiento" value={student.birthDate} />
            <InfoRow label="Género" value={student.gender} />
            <InfoRow label="Cédula" value={student.idNumber} />
            <InfoRow label="Estado Civil" value={student.maritalStatus} />
            <InfoRow label="Matrícula" value={student.enrollment} />
          </div>
        </section>
      </div>
    </section>
  );
}
