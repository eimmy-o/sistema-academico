// ProfessorHeader.jsx
import React from 'react'
import StatusBadge from "../../estudiante/components/StatusBadge";

export default function AdministradorHeader({
  photoUrl,
  firstName,
  lastName,
  code,
  status,             // { label, tone }
  scholarshipText,    // ej. "Becado"
  lastAccess,         // ej. "12 Oct 2025 · 10:42"
  onPrimary,          // callback del botón principal
  primaryLabel = "Editar perfil",
  onSecondary,        // callback opcional (cambiar estado) tecnicamente solo disponible para admins
  secondaryLabel = "Cambiar estado",
  showSecondary = false,
}) {
  return (
    <header className="profile__header">
      <div className="profile__identity">
        <img
          className="profile__avatar"
          src={photoUrl}
          alt={`Foto de ${firstName} ${lastName}`}
          loading="lazy"
        />
        <div className="profile__title">
          <h1 className="profile__name">{firstName} {lastName}</h1>
          <div className="profile__meta">
            <span className="profile__code">{code}</span>
            {status && <StatusBadge label={status.label} tone={status.tone} />}
          </div>
          {scholarshipText && <div className="profile__submeta">{scholarshipText}</div>}
        </div>
      </div>

      <div className="profile__actions">
        <button className="btn btn--primary" onClick={onPrimary}>
          {primaryLabel}
        </button>

        {showSecondary && (
          <button className="btn btn--ghost" onClick={onSecondary}>
            {secondaryLabel}
          </button>
        )}

        {lastAccess && (
          <div className="profile__last-access">Último acceso: {lastAccess}</div>
        )}
      </div>
    </header>
  );
}
