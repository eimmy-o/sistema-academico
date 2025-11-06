
import React from "react";
import "./AdministradorProfile.css";
import StatusBadge from "../../components_general/StatusBadge";
import InfoRow from "../../components_general/InfoRow";
import  AdministradorHeader  from "./AdministradorHeader";


export default function AdministradorProfile({ administrador, onEdit, onToggleStatus, onSave, userCanToggle=false }) {
  const [editMode, setEditMode] = React.useState(false);

  // Qué campos se pueden editar
  const editable = new Set(["firstName", "lastName", "phone", "address", "city", "province", "birthDate", "gender", "maritalStatus"]);

  // Estado del formulario
  const [formData, setFormData] = React.useState(() => pickEditable(administrador));
  React.useEffect(() => { setFormData(pickEditable(administrador)); }, [administrador]);

  function pickEditable(a) {
    return {
      firstName: a.firstName ?? "",
      lastName: a.lastName ?? "",
      phone: a.phone ?? "",
      address: a.address ?? "",
      birthDate: a.birthDate ?? "",
      gender: a.gender ?? "",
      maritalStatus: a.maritalStatus ?? "",
      enrollment: a.enrollment ?? "",
      city: a.city ?? "",
      province: a.province ?? ""
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
    setFormData(pickEditable(administrador));
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
      <AdministradorHeader
        photoUrl={administrador.photoUrl}
        firstName={administrador.firstName}
        lastName={administrador.lastName}
        code={administrador.code}
        status={administrador.status}
        scholarshipText={administrador.scholarshipText}
        lastAccess={administrador.lastAccess}
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
                     value={show("firstName") ? formData.firstName : administrador.firstName}
                     editable={show("firstName")}
                     onChange={handleChange} />

            <InfoRow label="Apellido"
                     name="lastName"
                     value={show("lastName") ? formData.lastName : administrador.lastName}
                     editable={show("lastName")}
                     onChange={handleChange} />

            <InfoRow label="Correo" value={administrador.email} isLink /> {/* no editable */}

            <InfoRow label="Teléfono"
                     name="phone"
                     type="tel"
                     value={show("phone") ? formData.phone : administrador.phone}
                     editable={show("phone")}
                     onChange={handleChange} />
            <InfoRow label="Provincia"
                                name="province"
                                value={show("province") ? formData.province : administrador.province}
                                editable={show("province")}
                                onChange={handleChange} />

            <InfoRow label="Ciudad"
                      name="city"
                      value={show("city") ? formData.city : administrador.city}
                      editable={show("city")}
                      onChange={handleChange} />
            <InfoRow label="Dirección"
                     name="address"
                     value={show("address") ? formData.address : administrador.address}
                     editable={show("address")}
                     onChange={handleChange}
                     full />

            <InfoRow label="Nacimiento"
                     name="birthDate"
                     type="date"
                     value={show("birthDate") ? formData.birthDate : administrador.birthDate}
                     editable={show("birthDate")}
                     onChange={handleChange} />

            <InfoRow label="Género"
                     name="gender"
                     value={show("gender") ? formData.gender : administrador.gender}
                     editable={show("gender")}
                     onChange={handleChange} />

          <InfoRow label="Tipo de Documento"
                              name="documentType"
                              value={show("documentType") ? formData.documentType : administrador.documentType}
                              editable={show("documentType")}
                              onChange={handleChange} />
            <InfoRow label="Número de Documento"
                     name="idNumber"
                     value={show("idNumber") ? formData.idNumber : administrador.idNumber}
                     editable={show("idNumber")}
                     onChange={handleChange} />

            <InfoRow label="Estado Civil"
                     name="maritalStatus"
                     value={show("maritalStatus") ? formData.maritalStatus : administrador.maritalStatus}
                     editable={show("maritalStatus")}
                     onChange={handleChange} />

            <InfoRow label="Credencial"
                     name="enrollment"
                     value={show("enrollment") ? formData.enrollment : administrador.enrollment}
                     editable={show("enrollment")}
                     onChange={handleChange} />
            <InfoRow label="Fecha de Ingreso"
                    name="enrollmentDate"
                    value={show("enrollmentDate") ? formData.enrollmentDate : administrador.enrollmentDate}
                    editable={show("enrollmentDate")}
                    onChange={handleChange} />
          </div>
        </section>
      </div>
    </section>
  );
}

