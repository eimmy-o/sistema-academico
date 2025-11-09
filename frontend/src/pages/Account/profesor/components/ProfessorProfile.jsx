// ProfessorProfile.jsx
import React from "react";
import "../../styles/ProfileStyle.css";
import StatusBadge from "../../components_general/StatusBadge";
import InfoRow from "../../components_general/InfoRow";
import ProfessorHeader from "./ProfessorHeader";

export default function ProfessorProfile({ professor, onEdit, onToggleStatus, onSave, userCanToggle=false }) {
  const [editMode, setEditMode] = React.useState(false);

  // Qué campos se pueden editar
  const editable = new Set(["firstName", "lastName", "phone", "address", "city", "province", "birthDate", "gender", "maritalStatus"]);

  // Estado del formulario
  const [formData, setFormData] = React.useState(() => pickEditable(professor));
  React.useEffect(() => { setFormData(pickEditable(professor)); }, [professor]);

  function pickEditable(p) {
    return {
      firstName: p.firstName ?? "",
      lastName: p.lastName ?? "",
      phone: p.phone ?? "",
      address: p.address ?? "",
      birthDate: p.birthDate ?? "",
      gender: p.gender ?? "",
      maritalStatus: p.maritalStatus ?? "",
      enrollment: p.enrollment ?? "",
      city: p.city ?? "",
      province: p.province ?? ""
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
    setFormData(pickEditable(professor));
    setEditMode(false);
  }

  const show = (field) => (editMode && editable.has(field));
  const items = [
    { key: "informacion-basica",   label: "Datos personales" },
    { key: "historial-academico",  label: "Datos académicos" },
  ];

  // decide qué hace cada botón según el modo
  const primaryLabel   = editMode ? "Guardar" : "Editar perfil";
  const onPrimary      = editMode ? handleSave : () => setEditMode(true);
  const showSecondary  = editMode ? true : userCanToggle;          // en edición mostramos "Cancelar"
  const secondaryLabel = editMode ? "Cancelar" : "Cambiar estado";
  const onSecondary    = editMode ? handleCancel : onToggleStatus;
  
  return (
    <section className="profile">
      <ProfessorHeader
        photoUrl={professor.photoUrl}
        firstName={professor.firstName}
        lastName={professor.lastName}
        code={professor.code}
        status={professor.status}
        scholarshipText={professor.scholarshipText}
        lastAccess={professor.lastAccess}
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
                     value={show("firstName") ? formData.firstName : professor.firstName}
                     editable={show("firstName")}
                     onChange={handleChange} />

            <InfoRow label="Apellido"
                     name="lastName"
                     value={show("lastName") ? formData.lastName : professor.lastName}
                     editable={show("lastName")}
                     onChange={handleChange} />

            <InfoRow label="Correo" value={professor.email} isLink /> {/* no editable */}

            <InfoRow label="Teléfono"
                     name="phone"
                     type="tel"
                     value={show("phone") ? formData.phone : professor.phone}
                     editable={show("phone")}
                     onChange={handleChange} />
            <InfoRow label="Provincia"
                                name="province"
                                value={show("province") ? formData.province : professor.province}
                                editable={show("province")}
                                onChange={handleChange} />

            <InfoRow label="Ciudad"
                      name="city"
                      value={show("city") ? formData.city : professor.city}
                      editable={show("city")}
                      onChange={handleChange} />
            <InfoRow label="Dirección"
                     name="address"
                     value={show("address") ? formData.address : professor.address}
                     editable={show("address")}
                     onChange={handleChange}
                     full />

            <InfoRow label="Nacimiento"
                     name="birthDate"
                     type="date"
                     value={show("birthDate") ? formData.birthDate : professor.birthDate}
                     editable={show("birthDate")}
                     onChange={handleChange} />

            <InfoRow label="Género"
                     name="gender"
                     value={show("gender") ? formData.gender : professor.gender}
                     editable={show("gender")}
                     onChange={handleChange} />

          <InfoRow label="Tipo de Documento"
                              name="documentType"
                              value={show("documentType") ? formData.documentType : professor.documentType}
                              editable={show("documentType")}
                              onChange={handleChange} />
            <InfoRow label="Número de Documento"
                     name="idNumber"
                     value={show("idNumber") ? formData.idNumber : professor.idNumber}
                     editable={show("idNumber")}
                     onChange={handleChange} />

            <InfoRow label="Estado Civil"
                     name="maritalStatus"
                     value={show("maritalStatus") ? formData.maritalStatus : professor.maritalStatus}
                     editable={show("maritalStatus")}
                     onChange={handleChange} />

            <InfoRow label="Credencial"
                     name="enrollment"
                     value={show("enrollment") ? formData.enrollment : professor.enrollment}
                     editable={show("enrollment")}
                     onChange={handleChange} />
            <InfoRow label="Fecha de Ingreso"
                    name="enrollmentDate"
                    value={show("enrollmentDate") ? formData.enrollmentDate : professor.enrollmentDate}
                    editable={show("enrollmentDate")}
                    onChange={handleChange} />
          </div>
        </section>
      </div>
    </section>
  );
}
