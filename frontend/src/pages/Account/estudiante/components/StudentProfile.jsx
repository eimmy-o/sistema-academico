// StudentProfile.jsx
import React from "react";
import "./StudentProfile.css";
import StatusBadge from "./StatusBadge";
import InfoRow from "./InfoRow";
import StudentHeader from "./StudentHeader";

export default function StudentProfile({ student, onEdit, onToggleStatus, onSave, userCanToggle=false }) {
  const [editMode, setEditMode] = React.useState(false);

  // Qué campos se pueden editar
  const editable = new Set(["firstName", "lastName", "phone", "address", "city", "province", "birthDate", "gender", "maritalStatus"]);

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
    { key: "calificaciones",       label: "Cursos inscritos"}, 
    { key: "actividad",            label: "Actividad" },
  ];

  // decide qué hace cada botón según el modo
  const primaryLabel   = editMode ? "Guardar" : "Editar perfil";
  const onPrimary      = editMode ? handleSave : () => setEditMode(true);
  const showSecondary  = editMode ? true : userCanToggle;          // en edición mostramos "Cancelar"
  const secondaryLabel = editMode ? "Cancelar" : "Cambiar estado";
  const onSecondary    = editMode ? handleCancel : onToggleStatus;
  
  return (
    <section className="profile">
      <StudentHeader
        photoUrl={student.photoUrl}
        firstName={student.firstName}
        lastName={student.lastName}
        code={student.code}
        status={student.status}
        scholarshipText={student.scholarshipText}
        lastAccess={student.lastAccess}
        onPrimary={onPrimary}
        primaryLabel={primaryLabel}
        onSecondary={onSecondary}
        secondaryLabel={secondaryLabel}
        showSecondary={showSecondary}
      />


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
