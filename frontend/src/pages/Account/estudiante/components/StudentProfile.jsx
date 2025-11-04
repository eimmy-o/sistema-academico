// StudentProfile.jsx
import React from "react";
import "./StudentProfile.css";
import StatusBadge from "./StatusBadge";
import InfoRow from "./InfoRow";

export default function StudentProfile({ student, onEdit, onToggleStatus, onSave, userCanToggle=false }) {
  const [editMode, setEditMode] = React.useState(false);

  // Qué campos se pueden editar
  const editable = new Set(["firstName", "lastName", "phone", "address", "city", "province", "birthDate", "gender", "maritalStatus", "enrollment"]);

  // Estado del formulario
  const [formData, setFormData] = React.useState(() => pickEditable(student));
  React.useEffect(() => { setFormData(pickEditable(student)); }, [student]);

  function pickEditable(s) {
    return {
      firstName: s.firstName ?? "",
      lastName: s.lastName ?? "",
      phone: s.phone ?? "",
      address: s.address ?? "",
      birthDate: s.birthDate ?? "",
      gender: s.gender ?? "",
      // idNumber: s.idNumber ?? "",
      maritalStatus: s.maritalStatus ?? "",
      enrollment: s.enrollment ?? "",
      city: s.city ?? "",
      province: s.province ?? ""
      // email, code, status, fecha de ingreso, tipo de documento y numero de doucmento etc. quedan NO editables
    };
  }

  function handleChange(name, value) {
    setFormData((d) => ({ ...d, [name]: value }));
  }

  async function handleSave() {
    // valida/normaliza si hace falta
    await (onSave?.(formData));   // envía a API/parent
    setEditMode(false);
  }

  function handleCancel() {
    setFormData(pickEditable(student));
    setEditMode(false);
  }

  const show = (field) => (editMode && editable.has(field));
  const items = [
    { key: "informacion-basica",   label: "Datos personales" },
    { key: "historial-academico",  label: "Datos académicos" },
    { key: "calificaciones",       label: "Cursos inscritos", disabled: true }, // quita disabled si ya tienes contenido
    { key: "actividad",            label: "Actividad",        disabled: true },
  ];
  
  return (
    <section className="profile">
      {/* <header className="profile__header">
        <div className="profile__identity">
          <img className="profile__avatar" src={student.photoUrl} alt={`Foto de ${student.firstName} ${student.lastName}`} loading="lazy" />
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
          {!editMode ? (
            <>
              <button className="btn btn--primary" onClick={() => setEditMode(true)}>Editar perfil</button>
              {userCanToggle && (
              <button className="btn btn--ghost" onClick={onToggleStatus}>Cambiar estado</button>)}
            </>
          ) : (
            <>
              <button className="btn btn--primary" onClick={handleSave}>Guardar</button>
              <button className="btn" onClick={handleCancel}>Cancelar</button>
            </>
          )}
          <div className="profile__last-access">Último acceso: {student.lastAccess}</div>
        </div>
      </header> */}

      

      {/* <nav className="tabs" aria-label="Secciones de perfil">
        <button className="tabs__item tabs__item--active">Datos personales</button>
        <button className="tabs__item" disabled>Datos académicos</button>
        <button className="tabs__item" disabled>Cursos inscritos</button>
        <button className="tabs__item" disabled>Actividad</button>
      </nav> */}

      <div className="profile__content--single">
        <section className="card">
          <h2 className="card__title">Datos Personales</h2>

          <div className="grid grid--one">
            <InfoRow label="Nombre"
                     name="firstName"
                     value={show("firstName") ? formData.firstName : student.firstName}
                     editable={show("firstName")}
                     onChange={handleChange} />

            <InfoRow label="Apellido"
                     name="lastName"
                     value={show("lastName") ? formData.lastName : student.lastName}
                     editable={show("lastName")}
                     onChange={handleChange} />

            <InfoRow label="Correo" value={student.email} isLink /> {/* no editable */}

            <InfoRow label="Teléfono"
                     name="phone"
                     type="tel"
                     value={show("phone") ? formData.phone : student.phone}
                     editable={show("phone")}
                     onChange={handleChange} />
            <InfoRow label="Provincia"
                                name="province"
                                value={show("province") ? formData.province : student.province}
                                editable={show("province")}
                                onChange={handleChange} />

            <InfoRow label="Ciudad"
                      name="city"
                      value={show("city") ? formData.city : student.city}
                      editable={show("city")}
                      onChange={handleChange} />
            <InfoRow label="Dirección"
                     name="address"
                     value={show("address") ? formData.address : student.address}
                     editable={show("address")}
                     onChange={handleChange}
                     full />

            <InfoRow label="Nacimiento"
                     name="birthDate"
                     type="date"
                     value={show("birthDate") ? formData.birthDate : student.birthDate}
                     editable={show("birthDate")}
                     onChange={handleChange} />

            <InfoRow label="Género"
                     name="gender"
                     value={show("gender") ? formData.gender : student.gender}
                     editable={show("gender")}
                     onChange={handleChange} />

          <InfoRow label="Tipo de Documento"
                              name="documentType"
                              value={show("documentType") ? formData.documentType : student.documentType}
                              editable={show("documentType")}
                              onChange={handleChange} />
            <InfoRow label="Número de Documento"
                     name="idNumber"
                     value={show("idNumber") ? formData.idNumber : student.idNumber}
                     editable={show("idNumber")}
                     onChange={handleChange} />

            <InfoRow label="Estado Civil"
                     name="maritalStatus"
                     value={show("maritalStatus") ? formData.maritalStatus : student.maritalStatus}
                     editable={show("maritalStatus")}
                     onChange={handleChange} />

            <InfoRow label="Matrícula"
                     name="enrollment"
                     value={show("enrollment") ? formData.enrollment : student.enrollment}
                     editable={show("enrollment")}
                     onChange={handleChange} />
            <InfoRow label="Fecha de Ingreso"
                    name="enrollmentDate"
                    value={show("enrollmentDate") ? formData.enrollmentDate : student.enrollmentDate}
                    editable={show("enrollmentDate")}
                    onChange={handleChange} />
          </div>
        </section>
      </div>
    </section>
  );
}
