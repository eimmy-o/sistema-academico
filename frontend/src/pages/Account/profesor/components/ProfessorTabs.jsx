export function ProfessorTabs({ active, onChange }) {
    const items = [
      { key: "informacion-basica",  label: "Datos personales" },
      { key: "historial-academico", label: "Historial Pedagogico"},
    ];
  
    return (
      <nav className="tabs" aria-label="Secciones de perfil">
        {items.map(i => (
          <button
            key={i.key}
            className={`tabs__item ${active === i.key ? "tabs__item--active" : ""}`}
            disabled={i.disabled}
            onClick={() => !i.disabled && onChange(i.key)}
          >
            {i.label}
          </button>
        ))}
      </nav>
    );
  }